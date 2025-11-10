import { AnalysisResult } from "../../types.js";

export function generateTestingRules(
  analysis: AnalysisResult,
  approach: string
): string {
  return `# Testing Guidelines

## Test Framework

**Framework:** ${analysis.testing.framework}
**Test Files:** ${analysis.testing.testFiles} detected
**Coverage:** ${analysis.testing.coverage}

## Test Organization

${generateTestOrganization(analysis)}

## Test Patterns

${generateTestPatterns(analysis)}

## Requirements

${generateTestRequirements(approach)}

---
**Generated based on:** ${approach === "current_patterns" ? "Current project patterns" : "Industry best practices"}
`;
}

function generateTestOrganization(analysis: AnalysisResult): string {
  const lines: string[] = [];

  lines.push(`**Location:** ${analysis.structure.testLocation}`);
  
  if (analysis.testing.hasUnit) {
    lines.push("- ✅ Unit tests detected");
  }
  if (analysis.testing.hasIntegration) {
    lines.push("- ✅ Integration tests detected");
  }
  if (analysis.testing.hasE2E) {
    lines.push("- ✅ E2E tests detected");
  }

  return lines.join("\n");
}

function generateTestPatterns(analysis: AnalysisResult): string {
  if (analysis.testing.patterns.length === 0) {
    return "No specific patterns detected.";
  }

  const lines = ["**Detected Patterns:**"];
  analysis.testing.patterns.forEach((pattern) => {
    lines.push(`- ${pattern}`);
  });

  return lines.join("\n");
}

function generateTestRequirements(approach: string): string {
  if (approach === "current_patterns") {
    return "Follow existing test patterns in the codebase.";
  }

  return `**Best Practices:**
- Maintain minimum 80% code coverage for critical paths
- Write tests for all new features
- Test edge cases and error conditions
- Use descriptive test names
- Keep tests independent and isolated
- Mock external dependencies`;
}

