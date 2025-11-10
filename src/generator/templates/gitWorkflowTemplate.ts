import { AnalysisResult } from "../../types.js";

export function generateGitWorkflowRules(
  analysis: AnalysisResult,
  approach: string
): string {
  return `# Git Workflow

## Branch Strategy

${generateBranchStrategy(analysis, approach)}

## Commit Message Format

${generateCommitMessageFormat(analysis, approach)}

## Versioning

${generateVersioning(analysis)}

---
**Generated based on:** ${approach === "current_patterns" ? "Current project patterns" : "Industry best practices"}
`;
}

function generateBranchStrategy(
  analysis: AnalysisResult,
  approach: string
): string {
  const lines: string[] = [];

  if (approach === "current_patterns") {
    lines.push("**Detected Pattern:**");
    lines.push(`- Primary Branch: \`${analysis.gitWorkflow.primaryBranch}\``);
    lines.push(`- Strategy: ${analysis.gitWorkflow.branchStrategy}`);
    if (analysis.gitWorkflow.hasDevelopBranch) {
      lines.push("- Development Branch: `dev` or `develop`");
    }
  } else {
    lines.push("**Recommended: Feature Branch Workflow**");
    lines.push("```");
    lines.push(`${analysis.gitWorkflow.primaryBranch}    # Production-ready code`);
    if (analysis.gitWorkflow.hasDevelopBranch) {
      lines.push("  ↑");
      lines.push("dev      # Integration branch");
    }
    lines.push("  ↑");
    lines.push("feature/* # Feature development");
    lines.push("bugfix/*  # Bug fixes");
    lines.push("hotfix/*  # Emergency fixes");
    lines.push("```");
  }

  return lines.join("\n");
}

function generateCommitMessageFormat(
  analysis: AnalysisResult,
  approach: string
): string {
  const lines: string[] = [];

  if (approach === "current_patterns") {
    lines.push("**Current Format:**");
    lines.push(`- ${analysis.gitWorkflow.commitMessageFormat}`);
    if (analysis.gitWorkflow.recentCommits.length > 0) {
      lines.push("\n**Recent Examples:**");
      analysis.gitWorkflow.recentCommits.slice(0, 3).forEach((commit) => {
        lines.push(`- "${commit}"`);
      });
    }
  } else {
    lines.push("**Recommended: Conventional Commits**");
    lines.push("");
    lines.push("```");
    lines.push("feat:     # New feature");
    lines.push("fix:      # Bug fix");
    lines.push("docs:     # Documentation");
    lines.push("style:    # Code style");
    lines.push("refactor: # Code refactoring");
    lines.push("test:     # Tests");
    lines.push("chore:    # Maintenance");
    lines.push("```");
    lines.push("");
    lines.push("**Examples:**");
    lines.push("```");
    lines.push("feat(auth): add JWT token validation");
    lines.push("fix(api): resolve null pointer in user endpoint");
    lines.push("docs: update API documentation");
    lines.push("```");
  }

  return lines.join("\n");
}

function generateVersioning(analysis: AnalysisResult): string {
  const lines: string[] = [];

  if (analysis.gitWorkflow.hasVersionTags) {
    lines.push(`**Current Approach:** ${analysis.gitWorkflow.versioningApproach}`);
  } else {
    lines.push("**No version tags detected**");
    lines.push("\n**Recommendation:** Use Semantic Versioning (SemVer)");
    lines.push("- Format: `v{MAJOR}.{MINOR}.{PATCH}`");
    lines.push("- Example: `v1.2.3`");
  }

  return lines.join("\n");
}

