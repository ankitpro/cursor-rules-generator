import { AnalysisResult } from "../../types.js";

export function generateAgentsMd(
  analysis: AnalysisResult,
  approach: string
): string {
  const projectType = analysis.structure.projectType || "Project";
  const primaryLang = analysis.dependencies.languages[0] || "Unknown";
  const frameworks = Object.keys(analysis.dependencies.frameworks).join(", ") || "None";

  return `# Project Instructions

> **Simple Cursor Rules:** This AGENTS.md file provides project instructions in plain markdown format.
> For modular rules with metadata, see the \`.cursor/rules/\` directory.

## Project Context

**Type:** ${projectType}
**Language:** ${primaryLang}
**Frameworks:** ${frameworks}

${generateTechStackSection(analysis)}

## Code Style

${generateCodeStyleSection(analysis, approach)}

## Architecture

${generateArchitectureSection(analysis)}

## Git Workflow

${generateGitWorkflowSection(analysis, approach)}

## Testing

${generateTestingSection(analysis, approach)}

## Security

${generateSecuritySection()}

---

**Approach:** ${approach === "current_patterns" ? "Current Project Patterns" : approach === "best_practices" ? "Industry Best Practices" : "Hybrid"}
**Generated:** ${new Date().toLocaleDateString()}
**Format:** AGENTS.md (plain markdown)
**Learn more:** https://cursor.com/docs/context/rules
`;
}

function generateTechStackSection(analysis: AnalysisResult): string {
  const lines: string[] = ["### Tech Stack\n"];
  const primaryLang = analysis.dependencies.languages[0] || "Unknown";

  if (analysis.structure.hasFrontend) {
    const frontendFrameworks = Object.keys(analysis.dependencies.frameworks)
      .filter((f) => ["react", "vue", "angular", "next"].includes(f))
      .join(", ");
    lines.push(`- **Frontend:** ${frontendFrameworks || "JavaScript/HTML/CSS"}`);
  }

  if (analysis.structure.hasBackend) {
    const backendFrameworks = Object.keys(analysis.dependencies.frameworks)
      .filter((f) => ["express", "fastapi", "django", "flask", "gin", "actix"].includes(f))
      .join(", ");
    lines.push(`- **Backend:** ${backendFrameworks || primaryLang || "Unknown"}`);
  }

  if (analysis.dependencies.database.length > 0) {
    lines.push(`- **Database:** ${analysis.dependencies.database.join(", ")}`);
  }

  if (analysis.testing.framework && analysis.testing.framework !== "unknown") {
    lines.push(`- **Testing:** ${analysis.testing.framework}`);
  }

  return lines.join("\n");
}

function generateCodeStyleSection(analysis: AnalysisResult, approach: string): string {
  const lines: string[] = [];

  lines.push("### Naming Conventions\n");
  if (approach === "current_patterns") {
    lines.push(`- Functions: ${analysis.codePatterns.naming.functions}`);
    lines.push(`- Variables: ${analysis.codePatterns.naming.variables}`);
    lines.push(`- Constants: ${analysis.codePatterns.naming.constants}`);
  } else {
    const primaryLang = analysis.dependencies.languages[0]?.toLowerCase();
    if (primaryLang?.includes("javascript") || primaryLang?.includes("typescript")) {
      lines.push("- Functions: camelCase");
      lines.push("- Variables: camelCase");
      lines.push("- Constants: UPPER_SNAKE_CASE");
      lines.push("- Classes: PascalCase");
    } else if (primaryLang?.includes("python")) {
      lines.push("- Functions: snake_case");
      lines.push("- Variables: snake_case");
      lines.push("- Constants: UPPER_SNAKE_CASE");
      lines.push("- Classes: PascalCase");
    }
  }

  lines.push("\n### Documentation\n");
  if (approach === "best_practices") {
    lines.push("- Add JSDoc/docstrings for all public functions");
    lines.push("- Document complex logic with clear comments");
    lines.push("- Keep comments up-to-date with code changes");
  } else {
    lines.push(`- Current coverage: ${analysis.codePatterns.documentation.coverage}%`);
  }

  return lines.join("\n");
}

function generateArchitectureSection(analysis: AnalysisResult): string {
  const lines: string[] = [];

  lines.push(`**Architecture:** ${analysis.structure.architecture}`);
  
  if (analysis.structure.directories.length > 0) {
    lines.push("\n### Key Directories\n");
    analysis.structure.directories.slice(0, 5).forEach((dir) => {
      lines.push(`- \`${dir.path}/\` - ${dir.purpose}`);
    });
  }

  return lines.join("\n");
}

function generateGitWorkflowSection(analysis: AnalysisResult, approach: string): string {
  const lines: string[] = [];

  lines.push(`**Primary Branch:** ${analysis.gitWorkflow.primaryBranch}`);
  
  if (analysis.gitWorkflow.hasDevelopBranch) {
    lines.push(`**Development Branch:** develop`);
  }

  if (approach === "best_practices") {
    lines.push("\n### Commit Messages\n");
    lines.push("Use Conventional Commits format:");
    lines.push("- `feat:` for new features");
    lines.push("- `fix:` for bug fixes");
    lines.push("- `docs:` for documentation changes");
    lines.push("- `refactor:` for code refactoring");
  } else {
    lines.push(`\n**Commit Format:** ${analysis.gitWorkflow.commitMessageFormat}`);
  }

  return lines.join("\n");
}

function generateTestingSection(analysis: AnalysisResult, approach: string): string {
  const lines: string[] = [];

  if (analysis.testing.framework) {
    lines.push(`**Framework:** ${analysis.testing.framework}`);
    lines.push(`**Test Files:** ${analysis.testing.testFiles}`);
  }

  if (approach === "best_practices") {
    lines.push("\n### Requirements\n");
    lines.push("- Write tests for all new features");
    lines.push("- Maintain minimum 80% coverage for critical paths");
    lines.push("- Test edge cases and error conditions");
  }

  return lines.join("\n");
}

function generateSecuritySection(): string {
  return `### Key Practices

- Never commit secrets to version control
- Use environment variables for sensitive data
- Validate all user inputs
- Use parameterized queries to prevent SQL injection
- Keep dependencies updated`;
}

