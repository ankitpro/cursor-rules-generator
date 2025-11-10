import { AnalysisResult } from "../../types.js";

export function generateCodeStyleRules(
  analysis: AnalysisResult,
  approach: string
): string {
  return `# Code Style Guidelines

## Naming Conventions

${generateNamingConventions(analysis, approach)}

## Function Documentation

${generateDocumentationGuidelines(analysis, approach)}

## Error Handling

${generateErrorHandlingPatterns(analysis, approach)}

## Code Patterns

${generateCodePatterns(analysis)}

---
**Generated based on:** ${approach === "current_patterns" ? "Current project patterns" : "Industry best practices"}
`;
}

function generateNamingConventions(
  analysis: AnalysisResult,
  approach: string
): string {
  const lines: string[] = [];

  if (approach === "current_patterns") {
    lines.push("**Current Project Patterns:**");
    lines.push(`- Functions: ${analysis.codePatterns.naming.functions} (${analysis.codePatterns.naming.consistency}% consistent)`);
    lines.push(`- Variables: ${analysis.codePatterns.naming.variables}`);
    lines.push(`- Constants: ${analysis.codePatterns.naming.constants}`);
    lines.push(`- Files: ${analysis.codePatterns.naming.files}`);
  } else {
    lines.push("**Best Practices:**");
    const primaryLang = analysis.dependencies.languages[0]?.toLowerCase();
    
    if (primaryLang?.includes("javascript") || primaryLang?.includes("typescript")) {
      lines.push("- Functions: camelCase (`getUserData`, `isValid`)");
      lines.push("- Variables: camelCase (`userName`, `isActive`)");
      lines.push("- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)");
      lines.push("- Classes: PascalCase (`UserProfile`, `DataTable`)");
      lines.push("- Files: kebab-case (`user-profile.ts`, `data-table.tsx`)");
    } else if (primaryLang?.includes("python")) {
      lines.push("- Functions: snake_case (`get_user_data`, `is_valid`)");
      lines.push("- Variables: snake_case (`user_name`, `is_active`)");
      lines.push("- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)");
      lines.push("- Classes: PascalCase (`UserProfile`, `DataTable`)");
      lines.push("- Files: snake_case (`user_profile.py`, `data_table.py`)");
    }
  }

  return lines.join("\n");
}

function generateDocumentationGuidelines(
  analysis: AnalysisResult,
  approach: string
): string {
  const lines: string[] = [];

  if (approach === "current_patterns") {
    if (analysis.codePatterns.documentation.hasJSDoc) {
      lines.push(`**Current Usage:** ${analysis.codePatterns.documentation.coverage}% of functions have JSDoc`);
    } else if (analysis.codePatterns.documentation.hasDocstrings) {
      lines.push(`**Current Usage:** ${analysis.codePatterns.documentation.coverage}% of functions have docstrings`);
    } else {
      lines.push("**Current Usage:** Minimal documentation detected");
    }
  } else {
    const primaryLang = analysis.dependencies.languages[0]?.toLowerCase();
    
    if (primaryLang?.includes("javascript") || primaryLang?.includes("typescript")) {
      lines.push("**Required for all public functions:**");
      lines.push("```javascript");
      lines.push("/**");
      lines.push(" * Brief description of function");
      lines.push(" * @param {string} param1 - Description");
      lines.push(" * @returns {Promise<Type>} Description");
      lines.push(" */");
      lines.push("```");
    } else if (primaryLang?.includes("python")) {
      lines.push("**Required for all public functions:**");
      lines.push("```python");
      lines.push('"""');
      lines.push("Brief description.");
      lines.push("");
      lines.push("Args:");
      lines.push("    param1: Description");
      lines.push("");
      lines.push("Returns:");
      lines.push("    Description");
      lines.push('"""');
      lines.push("```");
    }
  }

  return lines.join("\n");
}

function generateErrorHandlingPatterns(
  analysis: AnalysisResult,
  approach: string
): string {
  const lines: string[] = [];

  lines.push(`**Current Coverage:** ${analysis.codePatterns.errorHandling.coverage}% of functions`);
  lines.push(`**Logging Approach:** ${analysis.codePatterns.errorHandling.loggingApproach}`);

  if (approach === "best_practices") {
    lines.push("\n**Best Practices:**");
    lines.push("- Always wrap async operations in try-catch blocks");
    lines.push("- Log errors with context and stack traces");
    lines.push("- Provide user-friendly error messages");
    lines.push("- Use custom error classes for specific error types");
  }

  return lines.join("\n");
}

function generateCodePatterns(analysis: AnalysisResult): string {
  const lines: string[] = [];

  lines.push(`**Async/Await Usage:** ${analysis.codePatterns.functionPatterns.asyncAwaitUsage}%`);
  lines.push(`**Arrow Functions:** ${analysis.codePatterns.functionPatterns.arrowFunctionUsage}%`);

  return lines.join("\n");
}

