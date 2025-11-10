import { AnalysisResult } from "../../types.js";

export function generateMainCursorRules(
  analysis: AnalysisResult,
  approach: string
): string {
  const projectType = analysis.structure.projectType || "Project";
  const primaryLang = analysis.dependencies.languages[0] || "Unknown";
  const frameworks = Object.keys(analysis.dependencies.frameworks).join(", ") || "None";

  return `# ${projectType} Cursor Rules

> **📁 Modular Structure:** This project uses organized cursor rules.
> Detailed guidelines are in \`.cursor/rules/\`. This file provides quick context.

## 🎯 Quick Context

**Project Type:** ${analysis.structure.projectType}
**Primary Language:** ${primaryLang}
**Frameworks:** ${frameworks}

**Tech Stack:**
${generateTechStackSection(analysis)}

**Architecture:** ${analysis.structure.architecture}
${analysis.structure.isMonorepo ? "- **Monorepo:** Yes" : ""}

## 🎭 Role-Based System

**CRITICAL:** At the start of EVERY response, announce your role:

\`\`\`
🎭 **Role Adopted:** [Role Name]
📋 **Why:** [Brief explanation]
\`\`\`

**Available Roles:**
- 📝 Documentation Writer - Technical docs
- ⚛️ Frontend Developer - UI/Components
- 🔧 Backend Developer - APIs/Services
- 🔍 Code Reviewer - Code quality
- 🏗️ Software Architect - System design
- 🧪 QA Engineer - Testing
- 🔒 Security Analyst - Security review

**📖 Full role documentation:** \`.cursor/prompts/README.md\` and individual role files

## 📚 Detailed Guidelines

For comprehensive rules, see:

- **Architecture Patterns:** \`.cursor/rules/architecture.md\`
- **Code Style:** \`.cursor/rules/code-style.md\`
- **Git Workflow:** \`.cursor/rules/git-workflow.md\`
- **Testing:** \`.cursor/rules/testing.md\`
- **Security:** \`.cursor/rules/security.md\`

## 🚀 Quick Reference

**Key Patterns:**
${generateKeyPatterns(analysis)}

**Full reference:** \`.cursor/quick-reference.md\`

---

**Approach:** ${approach === "current_patterns" ? "Current Project Patterns" : approach === "best_practices" ? "Industry Best Practices" : "Hybrid"}
**Generated:** ${new Date().toLocaleDateString()}
`;
}

function generateTechStackSection(analysis: AnalysisResult): string {
  const lines: string[] = [];

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
    lines.push(`- **Backend:** ${backendFrameworks || analysis.dependencies.languages[0] || "Unknown"}`);
  }

  if (analysis.dependencies.database.length > 0) {
    lines.push(`- **Database:** ${analysis.dependencies.database.join(", ")}`);
  }

  if (analysis.testing.framework && analysis.testing.framework !== "unknown") {
    lines.push(`- **Testing:** ${analysis.testing.framework}`);
  }

  return lines.length > 0 ? lines.join("\n") : "- See detailed analysis for tech stack";
}

function generateKeyPatterns(analysis: AnalysisResult): string {
  const patterns: string[] = [];

  if (analysis.codePatterns.naming.functions !== "unknown") {
    patterns.push(`- Functions use ${analysis.codePatterns.naming.functions}`);
  }

  if (analysis.codePatterns.errorHandling.loggingApproach !== "none") {
    patterns.push(`- Logging: ${analysis.codePatterns.errorHandling.loggingApproach}`);
  }

  if (analysis.structure.testLocation !== "none") {
    patterns.push(`- Tests: ${analysis.structure.testLocation}`);
  }

  return patterns.length > 0 ? patterns.join("\n") : "- See quick-reference.md for patterns";
}

