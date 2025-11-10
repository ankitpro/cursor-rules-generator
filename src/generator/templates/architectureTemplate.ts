import { AnalysisResult } from "../../types.js";

export function generateArchitectureRules(
  analysis: AnalysisResult,
  approach: string
): string {
  return `# Architecture Patterns

## Project Structure

**Type:** ${analysis.structure.projectType}
**Architecture:** ${analysis.structure.architecture}

${generateDirectoryStructure(analysis)}

## Framework Patterns

${generateFrameworkPatterns(analysis)}

## File Organization

${generateFileOrganization(analysis)}

---
**Generated based on:** ${approach === "current_patterns" ? "Current project patterns" : "Industry best practices"}
`;
}

function generateDirectoryStructure(analysis: AnalysisResult): string {
  if (analysis.structure.directories.length === 0) {
    return "No specific directory structure detected.";
  }

  const lines = analysis.structure.directories.map(
    (dir) => `- \`${dir.path}/\` - ${dir.purpose}`
  );

  return `**Detected Directories:**\n${lines.join("\n")}`;
}

function generateFrameworkPatterns(analysis: AnalysisResult): string {
  const frameworks = Object.keys(analysis.dependencies.frameworks);
  
  if (frameworks.length === 0) {
    return "No specific framework patterns detected.";
  }

  const lines: string[] = [];
  
  if (frameworks.includes("react")) {
    lines.push("### React Patterns\n");
    lines.push("- Use functional components with hooks");
    lines.push("- Implement proper component composition");
    lines.push("- Follow React best practices for state management");
  }

  if (frameworks.includes("express")) {
    lines.push("### Express Patterns\n");
    lines.push("- Use middleware for cross-cutting concerns");
    lines.push("- Implement proper error handling");
    lines.push("- Follow RESTful API design principles");
  }

  return lines.join("\n");
}

function generateFileOrganization(analysis: AnalysisResult): string {
  const lines: string[] = [];

  if (analysis.structure.hasFrontend) {
    lines.push("**Frontend:**");
    lines.push("- Components should be self-contained");
    lines.push("- Separate business logic from presentation");
  }

  if (analysis.structure.hasBackend) {
    lines.push("\n**Backend:**");
    lines.push("- Controllers handle HTTP requests");
    lines.push("- Services contain business logic");
    lines.push("- Models define data structures");
  }

  lines.push(`\n**Tests:** ${analysis.structure.testLocation}`);

  return lines.join("\n");
}

