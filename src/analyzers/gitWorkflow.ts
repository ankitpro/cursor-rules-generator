import { exec } from "child_process";
import { promisify } from "util";
import { GitWorkflowAnalysis } from "../types.js";

const execAsync = promisify(exec);

export async function analyzeGitWorkflow(
  projectPath: string
): Promise<GitWorkflowAnalysis> {
  const result: GitWorkflowAnalysis = {
    branches: [],
    primaryBranch: "main",
    hasDevelopBranch: false,
    branchStrategy: "unknown",
    commitMessageFormat: "free-form",
    conventionalCommits: false,
    hasVersionTags: false,
    versioningApproach: "unknown",
    recentCommits: [],
  };

  try {
    // Get all branches
    const { stdout: branchesOutput } = await execAsync("git branch -a", {
      cwd: projectPath,
    });
    result.branches = branchesOutput
      .split("\n")
      .map((b) => b.trim().replace(/^\*\s*/, "").replace(/^remotes\/origin\//, ""))
      .filter((b) => b && !b.includes("->"));

    // Detect primary branch
    if (result.branches.some((b) => b === "main")) {
      result.primaryBranch = "main";
    } else if (result.branches.some((b) => b === "master")) {
      result.primaryBranch = "master";
    }

    // Detect develop branch
    result.hasDevelopBranch = result.branches.some(
      (b) => b === "dev" || b === "develop" || b === "development"
    );

    // Detect branch strategy
    const hasFeatureBranches = result.branches.some((b) =>
      b.startsWith("feature/")
    );
    const hasBugfixBranches = result.branches.some((b) =>
      b.startsWith("bugfix/")
    );
    const hasHotfixBranches = result.branches.some((b) =>
      b.startsWith("hotfix/")
    );

    if (result.hasDevelopBranch && hasFeatureBranches) {
      result.branchStrategy = "Gitflow";
    } else if (hasFeatureBranches || hasBugfixBranches) {
      result.branchStrategy = "Feature Branch Workflow";
    } else if (result.branches.length <= 2) {
      result.branchStrategy = "Trunk-based Development";
    } else {
      result.branchStrategy = "Custom";
    }

    // Get recent commits
    try {
      const { stdout: commitsOutput } = await execAsync(
        'git log --oneline -20 --pretty=format:"%s"',
        { cwd: projectPath }
      );
      result.recentCommits = commitsOutput.split("\n").filter((c) => c);

      // Analyze commit message format
      const conventionalPattern = /^(feat|fix|docs|style|refactor|perf|test|chore|build|ci)(\(.+?\))?:/;
      const conventionalCount = result.recentCommits.filter((msg) =>
        conventionalPattern.test(msg)
      ).length;

      if (conventionalCount > result.recentCommits.length * 0.7) {
        result.commitMessageFormat = "Conventional Commits";
        result.conventionalCommits = true;
      } else if (conventionalCount > 0) {
        result.commitMessageFormat = "Mixed (some conventional)";
      } else {
        result.commitMessageFormat = "Free-form";
      }
    } catch {
      // No commits or error reading commits
    }

    // Check for version tags
    try {
      const { stdout: tagsOutput } = await execAsync("git tag", {
        cwd: projectPath,
      });
      const tags = tagsOutput.split("\n").filter((t) => t);
      result.hasVersionTags = tags.length > 0;

      if (tags.length > 0) {
        // Detect versioning approach
        const semverPattern = /^v?\d+\.\d+\.\d+/;
        const semverTags = tags.filter((t) => semverPattern.test(t));

        if (semverTags.length > tags.length * 0.7) {
          result.versioningApproach = "Semantic Versioning";
        } else {
          result.versioningApproach = "Custom";
        }
      }
    } catch {
      // No tags or error reading tags
    }
  } catch (error) {
    // Not a git repository or error executing git commands
    console.error("Error analyzing git workflow:", error);
  }

  return result;
}

