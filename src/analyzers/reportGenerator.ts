import { AnalysisResult } from "../types.js";

export function generateFullAnalysisReport(analysis: AnalysisResult): string {
  const lines: string[] = [];

  lines.push("🔍 **Repository Analysis Complete**");
  lines.push("");
  lines.push("📦 **Detected Technologies:**");
  lines.push(
    `- Languages: ${analysis.dependencies.languages.join(", ") || "Unknown"}`
  );

  if (Object.keys(analysis.dependencies.frameworks).length > 0) {
    lines.push(
      `- Frameworks: ${Object.entries(analysis.dependencies.frameworks)
        .map(([name, version]) => `${name} ${version}`)
        .join(", ")}`
    );
  }

  if (analysis.dependencies.uiLibraries.length > 0) {
    lines.push(`- UI Libraries: ${analysis.dependencies.uiLibraries.join(", ")}`);
  }

  if (analysis.dependencies.database.length > 0) {
    lines.push(`- Database: ${analysis.dependencies.database.join(", ")}`);
  }

  if (analysis.dependencies.testing.length > 0) {
    lines.push(`- Testing: ${analysis.dependencies.testing.join(", ")}`);
  }

  if (analysis.dependencies.buildTools.length > 0) {
    lines.push(`- Build Tools: ${analysis.dependencies.buildTools.join(", ")}`);
  }

  lines.push("");
  lines.push("📁 **Project Structure:**");
  lines.push(`- Type: ${analysis.structure.projectType}`);
  lines.push(`- Architecture: ${analysis.structure.architecture}`);
  if (analysis.structure.isMonorepo) {
    lines.push("- ✅ Monorepo detected");
  }
  if (analysis.structure.hasFrontend) {
    lines.push("- ✅ Frontend code detected");
  }
  if (analysis.structure.hasBackend) {
    lines.push("- ✅ Backend code detected");
  }
  lines.push(`- Test Location: ${analysis.structure.testLocation}`);

  lines.push("");
  lines.push("📝 **Code Patterns Detected:**");
  lines.push("");
  lines.push("**Naming Conventions:**");
  lines.push(
    `- Functions: ${analysis.codePatterns.naming.functions} (consistency: ${analysis.codePatterns.naming.consistency}%)`
  );
  lines.push(`- Variables: ${analysis.codePatterns.naming.variables}`);
  lines.push(`- Constants: ${analysis.codePatterns.naming.constants}`);
  lines.push(`- Files: ${analysis.codePatterns.naming.files}`);

  lines.push("");
  lines.push("**Error Handling:**");
  lines.push(`- Pattern: ${analysis.codePatterns.errorHandling.pattern}`);
  lines.push(
    `- Coverage: ${analysis.codePatterns.errorHandling.coverage}% of functions`
  );
  lines.push(
    `- Logging: ${analysis.codePatterns.errorHandling.loggingApproach}`
  );

  lines.push("");
  lines.push("**Function Patterns:**");
  lines.push(
    `- Async/await usage: ${analysis.codePatterns.functionPatterns.asyncAwaitUsage}%`
  );
  lines.push(
    `- Arrow functions: ${analysis.codePatterns.functionPatterns.arrowFunctionUsage}%`
  );

  lines.push("");
  lines.push("**Documentation:**");
  if (analysis.codePatterns.documentation.hasJSDoc) {
    lines.push(
      `- JSDoc: ${analysis.codePatterns.documentation.coverage}% of functions`
    );
  } else if (analysis.codePatterns.documentation.hasDocstrings) {
    lines.push(
      `- Docstrings: ${analysis.codePatterns.documentation.coverage}% of functions`
    );
  } else {
    lines.push("- ⚠️ Minimal documentation found");
  }

  lines.push("");
  lines.push("🌳 **Git Workflow:**");
  lines.push(`- Primary Branch: ${analysis.gitWorkflow.primaryBranch}`);
  if (analysis.gitWorkflow.hasDevelopBranch) {
    lines.push("- ✅ Develop branch detected");
  }
  lines.push(`- Branch Strategy: ${analysis.gitWorkflow.branchStrategy}`);
  lines.push(
    `- Commit Format: ${analysis.gitWorkflow.commitMessageFormat}`
  );
  if (analysis.gitWorkflow.hasVersionTags) {
    lines.push(
      `- Versioning: ${analysis.gitWorkflow.versioningApproach}`
    );
  }

  lines.push("");
  lines.push("⚙️ **Environment Variables:**");
  if (analysis.environment.hasEnvFile) {
    lines.push(
      `- Found ${analysis.environment.variables.length} variables in ${analysis.environment.envFiles.join(", ")}`
    );
    if (analysis.environment.hasSecrets) {
      lines.push("- ⚠️ Contains secrets/API keys");
    }
  } else {
    lines.push("- ⚠️ No environment file templates found");
  }

  lines.push("");
  lines.push("🧪 **Testing Infrastructure:**");
  lines.push(`- Framework: ${analysis.testing.framework}`);
  lines.push(`- Test Files: ${analysis.testing.testFiles} found`);
  lines.push(`- Coverage: ${analysis.testing.coverage}`);
  if (analysis.testing.patterns.length > 0) {
    lines.push(`- Patterns: ${analysis.testing.patterns.join(", ")}`);
  }
  if (analysis.testing.hasUnit) lines.push("- ✅ Unit tests");
  if (analysis.testing.hasIntegration) lines.push("- ✅ Integration tests");
  if (analysis.testing.hasE2E) lines.push("- ✅ E2E tests");

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("💡 **Recommendations:**");
  lines.push("");

  // Generate recommendations based on analysis
  const recommendations: string[] = [];

  if (analysis.codePatterns.naming.consistency < 80) {
    recommendations.push(
      `**High Priority:** Standardize naming conventions (currently ${analysis.codePatterns.naming.consistency}% consistent)`
    );
  }

  if (analysis.codePatterns.documentation.coverage < 50) {
    recommendations.push(
      "**High Priority:** Improve code documentation coverage"
    );
  }

  if (analysis.codePatterns.errorHandling.coverage < 50) {
    recommendations.push(
      "**Medium Priority:** Increase error handling coverage in functions"
    );
  }

  if (!analysis.gitWorkflow.conventionalCommits) {
    recommendations.push(
      "**Medium Priority:** Consider adopting Conventional Commits for clearer history"
    );
  }

  if (!analysis.environment.hasEnvFile) {
    recommendations.push(
      "**High Priority:** Create .env.example file to document required environment variables"
    );
  }

  if (analysis.testing.testFiles === 0) {
    recommendations.push(
      "**High Priority:** Add test infrastructure and write tests"
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("✅ Project follows good practices!");
  }

  lines.push(...recommendations);

  return lines.join("\n");
}

