import { Template, TemplateSelectionOptions } from "./types.js";
import { AnalysisResult } from "../types.js";

export interface MergedContent {
  mainRules: string;
  architectureRules: string;
  codeStyleRules: string;
  testingRules: string;
  securityRules: string;
  gitWorkflowRules: string;
  promptRoles: Record<string, string>;
}

/**
 * Merge template content with analysis-based generation
 * 
 * Strategies:
 * - template-first: Use template as base, add analysis insights as comments/additions
 * - analysis-first: Use analysis as base, add template best practices as enhancements
 * - balanced: Merge both with equal weight, preferring analysis for project-specific, template for standards
 */
export async function mergeTemplateWithAnalysis(
  template: Template,
  analysis: AnalysisResult,
  strategy: "template-first" | "analysis-first" | "balanced"
): Promise<Partial<MergedContent>> {
  const merged: Partial<MergedContent> = {};

  // Main rules merging
  if (template.content.mainRules) {
    merged.mainRules = mergeSection(
      template.content.mainRules,
      `# ${analysis.structure.projectType} Project\n\n**Detected Stack:** ${analysis.dependencies.languages.join(", ")}`,
      strategy
    );
  }

  // Architecture rules merging
  if (template.content.architectureRules) {
    merged.architectureRules = mergeSection(
      template.content.architectureRules,
      `\n\n## Detected Architecture\n\n**Type:** ${analysis.structure.architecture}\n**Structure:** ${analysis.structure.projectType}`,
      strategy
    );
  }

  // Code style rules merging
  if (template.content.codeStyleRules) {
    merged.codeStyleRules = mergeSection(
      template.content.codeStyleRules,
      `\n\n## Detected Patterns\n\n**Naming:** ${analysis.codePatterns.naming.functions}\n**Consistency:** ${Math.round(analysis.codePatterns.naming.consistency * 100)}%`,
      strategy
    );
  }

  // Testing rules merging
  if (template.content.testingRules) {
    merged.testingRules = mergeSection(
      template.content.testingRules,
      `\n\n## Detected Testing Setup\n\n**Framework:** ${analysis.testing.framework}\n**Test Files:** ${analysis.testing.testFiles}`,
      strategy
    );
  }

  // Security rules merging
  if (template.content.securityRules) {
    merged.securityRules = template.content.securityRules;
  }

  // Git workflow rules merging
  if (template.content.gitWorkflowRules) {
    merged.gitWorkflowRules = mergeSection(
      template.content.gitWorkflowRules,
      `\n\n## Detected Git Workflow\n\n**Branch Strategy:** ${analysis.gitWorkflow.branchStrategy}\n**Primary Branch:** ${analysis.gitWorkflow.primaryBranch}`,
      strategy
    );
  }

  // Prompt roles merging
  if (template.content.promptRoles) {
    merged.promptRoles = template.content.promptRoles;
  }

  return merged;
}

function mergeSection(
  templateContent: string,
  analysisInsight: string,
  strategy: "template-first" | "analysis-first" | "balanced"
): string {
  switch (strategy) {
    case "template-first":
      return `${templateContent}\n\n---\n\n## 🔍 Project-Specific Analysis\n${analysisInsight}`;
    
    case "analysis-first":
      return `${analysisInsight}\n\n---\n\n## 📚 Template Best Practices\n${templateContent}`;
    
    case "balanced":
      return `${templateContent}\n\n---\n\n## 🔍 Your Project Context\n${analysisInsight}\n\n> **Note:** This combines template best practices with your project's detected patterns.`;
    
    default:
      return templateContent;
  }
}

