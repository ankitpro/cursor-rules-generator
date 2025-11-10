import { AnalysisResult } from "../../types.js";

export function generateQuickReference(analysis: AnalysisResult): string {
  return `# Quick Reference

## Common Commands

${generateCommonCommands(analysis)}

## File Locations

${generateFileLocations(analysis)}

## Key Patterns

${generateKeyPatterns(analysis)}

## Environment Variables

${generateEnvironmentVariables(analysis)}

## Tech Stack Summary

${generateTechStackSummary(analysis)}

---
**Generated:** ${new Date().toLocaleDateString()}
`;
}

function generateCommonCommands(analysis: AnalysisResult): string {
  const lines: string[] = [];
  const packageManager = analysis.dependencies.packageManager;

  if (packageManager === "npm" || packageManager === "yarn" || packageManager === "pnpm") {
    lines.push("```bash");
    lines.push("# Development");
    lines.push(`${packageManager} run dev       # Start development server`);
    lines.push(`${packageManager} run build     # Build for production`);
    lines.push(`${packageManager} test          # Run tests`);
    lines.push(`${packageManager} run lint      # Lint code`);
    lines.push("```");
  } else if (packageManager.includes("python")) {
    lines.push("```bash");
    lines.push("# Development");
    lines.push("python main.py       # Run application");
    lines.push("pytest               # Run tests");
    lines.push("```");
  }

  if (lines.length === 0) {
    lines.push("No standard commands detected. Check package.json or Makefile.");
  }

  return lines.join("\n");
}

function generateFileLocations(analysis: AnalysisResult): string {
  const lines: string[] = [];

  analysis.structure.directories.forEach((dir) => {
    lines.push(`- **${dir.purpose}:** \`${dir.path}/\``);
  });

  if (analysis.structure.testLocation !== "none") {
    lines.push(`- **Tests:** ${analysis.structure.testLocation}`);
  }

  if (analysis.environment.configFiles.length > 0) {
    lines.push(`- **Configuration:** ${analysis.environment.configFiles.join(", ")}`);
  }

  return lines.length > 0 ? lines.join("\n") : "Standard project structure.";
}

function generateKeyPatterns(analysis: AnalysisResult): string {
  const patterns: string[] = [];

  if (analysis.codePatterns.naming.functions !== "unknown") {
    patterns.push(`1. **Naming:** Functions use ${analysis.codePatterns.naming.functions}`);
  }

  if (analysis.codePatterns.errorHandling.loggingApproach !== "none") {
    patterns.push(`2. **Logging:** Using ${analysis.codePatterns.errorHandling.loggingApproach}`);
  }

  if (analysis.codePatterns.functionPatterns.asyncAwaitUsage > 50) {
    patterns.push(`3. **Async:** Heavy use of async/await (${analysis.codePatterns.functionPatterns.asyncAwaitUsage}%)`);
  }

  if (analysis.gitWorkflow.conventionalCommits) {
    patterns.push("4. **Commits:** Follow Conventional Commits format");
  }

  if (analysis.testing.framework !== "unknown") {
    patterns.push(`5. **Testing:** Using ${analysis.testing.framework} framework`);
  }

  return patterns.length > 0 ? patterns.join("\n") : "No specific patterns to highlight.";
}

function generateEnvironmentVariables(analysis: AnalysisResult): string {
  if (!analysis.environment.hasEnvFile) {
    return "No environment file template found.";
  }

  const lines: string[] = [];
  lines.push(`**Files:** ${analysis.environment.envFiles.join(", ")}`);
  lines.push(`**Variables:** ${analysis.environment.variables.length} defined`);

  if (analysis.environment.variables.length > 0 && analysis.environment.variables.length <= 10) {
    lines.push("\n**Required Variables:**");
    analysis.environment.variables.forEach((variable) => {
      lines.push(`- ${variable}`);
    });
  }

  if (analysis.environment.hasSecrets) {
    lines.push("\n⚠️ Contains secrets - never commit actual values");
  }

  return lines.join("\n");
}

function generateTechStackSummary(analysis: AnalysisResult): string {
  const lines: string[] = [];

  lines.push(`**Languages:** ${analysis.dependencies.languages.join(", ") || "Unknown"}`);

  if (Object.keys(analysis.dependencies.frameworks).length > 0) {
    lines.push(`**Frameworks:** ${Object.keys(analysis.dependencies.frameworks).join(", ")}`);
  }

  if (analysis.dependencies.database.length > 0) {
    lines.push(`**Database:** ${analysis.dependencies.database.join(", ")}`);
  }

  if (analysis.dependencies.testing.length > 0) {
    lines.push(`**Testing:** ${analysis.dependencies.testing.join(", ")}`);
  }

  if (analysis.dependencies.buildTools.length > 0) {
    lines.push(`**Build:** ${analysis.dependencies.buildTools.join(", ")}`);
  }

  return lines.join("\n");
}

