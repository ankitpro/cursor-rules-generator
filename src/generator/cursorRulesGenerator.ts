import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { AnalysisResult, GenerationOptions, GenerationResult } from "../types.js";
import { generateMainCursorRules } from "./templates/mainTemplate.js";
import { generateArchitectureRules } from "./templates/architectureTemplate.js";
import { generateCodeStyleRules } from "./templates/codeStyleTemplate.js";
import { generateGitWorkflowRules } from "./templates/gitWorkflowTemplate.js";
import { generateTestingRules } from "./templates/testingTemplate.js";
import { generateSecurityRules } from "./templates/securityTemplate.js";
import { getTemplate } from "../templates/index.js";
import { mergeTemplateWithAnalysis } from "../templates/loader.js";
import {
  generatePromptsReadme,
  generateDocumentationWriterRole,
  generateFrontendDeveloperRole,
  generateBackendDeveloperRole,
  generateSoftwareArchitectRole,
  generateCodeReviewerRole,
  generateQAEngineerRole,
  generateSecurityAnalystRole,
  generatePerformanceEngineerRole,
  generateDatabaseAdministratorRole,
  generateMonorepoManagerRole,
  generateBuildEngineerRole,
} from "./templates/systemPromptsTemplate.js";
import { generateQuickReference } from "./templates/quickReferenceTemplate.js";

export async function generateCursorRules(
  analysis: AnalysisResult,
  options: GenerationOptions
): Promise<GenerationResult> {
  const { projectPath, approach, template: templateOptions } = options;

  // Load template if specified
  let template = null;
  let mergedContent = null;
  if (templateOptions?.templateId) {
    template = getTemplate(templateOptions.templateId);
    if (template) {
      const mergeStrategy = templateOptions.mergeStrategy || "balanced";
      mergedContent = await mergeTemplateWithAnalysis(template, analysis, mergeStrategy);
    }
  }

  // Create directory structure
  const cursorDir = join(projectPath, ".cursor");
  const rulesDir = join(cursorDir, "rules");
  const promptsDir = join(cursorDir, "prompts");

  // Ensure directories exist
  if (!existsSync(cursorDir)) {
    await mkdir(cursorDir, { recursive: true });
  }
  if (!existsSync(rulesDir)) {
    await mkdir(rulesDir, { recursive: true });
  }
  if (!existsSync(promptsDir)) {
    await mkdir(promptsDir, { recursive: true });
  }

  const filesGenerated: string[] = [];

  // Generate all files (use merged content if available, otherwise generate from analysis)
  const files = [
    {
      path: join(projectPath, ".cursorrules"),
      content: mergedContent?.mainRules || generateMainCursorRules(analysis, approach),
      name: ".cursorrules",
    },
    {
      path: join(rulesDir, "architecture.md"),
      content: mergedContent?.architectureRules || generateArchitectureRules(analysis, approach),
      name: ".cursor/rules/architecture.md",
    },
    {
      path: join(rulesDir, "code-style.md"),
      content: mergedContent?.codeStyleRules || generateCodeStyleRules(analysis, approach),
      name: ".cursor/rules/code-style.md",
    },
    {
      path: join(rulesDir, "git-workflow.md"),
      content: mergedContent?.gitWorkflowRules || generateGitWorkflowRules(analysis, approach),
      name: ".cursor/rules/git-workflow.md",
    },
    {
      path: join(rulesDir, "testing.md"),
      content: mergedContent?.testingRules || generateTestingRules(analysis, approach),
      name: ".cursor/rules/testing.md",
    },
    {
      path: join(rulesDir, "security.md"),
      content: mergedContent?.securityRules || generateSecurityRules(analysis, approach),
      name: ".cursor/rules/security.md",
    },
    // Prompts directory - README and individual role files
    {
      path: join(promptsDir, "README.md"),
      content: generatePromptsReadme(analysis),
      name: ".cursor/prompts/README.md",
    },
    {
      path: join(promptsDir, "documentation-writer.md"),
      content: generateDocumentationWriterRole(),
      name: ".cursor/prompts/documentation-writer.md",
    },
    {
      path: join(promptsDir, "frontend-developer.md"),
      content: generateFrontendDeveloperRole(analysis),
      name: ".cursor/prompts/frontend-developer.md",
    },
    {
      path: join(promptsDir, "backend-developer.md"),
      content: generateBackendDeveloperRole(analysis),
      name: ".cursor/prompts/backend-developer.md",
    },
    {
      path: join(promptsDir, "software-architect.md"),
      content: generateSoftwareArchitectRole(),
      name: ".cursor/prompts/software-architect.md",
    },
    {
      path: join(promptsDir, "code-reviewer.md"),
      content: generateCodeReviewerRole(),
      name: ".cursor/prompts/code-reviewer.md",
    },
    {
      path: join(promptsDir, "qa-engineer.md"),
      content: generateQAEngineerRole(analysis),
      name: ".cursor/prompts/qa-engineer.md",
    },
    {
      path: join(promptsDir, "security-analyst.md"),
      content: generateSecurityAnalystRole(),
      name: ".cursor/prompts/security-analyst.md",
    },
    {
      path: join(promptsDir, "performance-engineer.md"),
      content: generatePerformanceEngineerRole(),
      name: ".cursor/prompts/performance-engineer.md",
    },
    {
      path: join(promptsDir, "database-administrator.md"),
      content: generateDatabaseAdministratorRole(analysis),
      name: ".cursor/prompts/database-administrator.md",
    },
    {
      path: join(cursorDir, "quick-reference.md"),
      content: generateQuickReference(analysis),
      name: ".cursor/quick-reference.md",
    },
  ];

  // Add project-specific role files if needed
  if (analysis.structure.isMonorepo) {
    files.push({
      path: join(promptsDir, "monorepo-manager.md"),
      content: generateMonorepoManagerRole(),
      name: ".cursor/prompts/monorepo-manager.md",
    });
  }

  if (analysis.dependencies.buildTools.length > 0) {
    files.push({
      path: join(promptsDir, "build-engineer.md"),
      content: generateBuildEngineerRole(analysis),
      name: ".cursor/prompts/build-engineer.md",
    });
  }

  // Write all files
  for (const file of files) {
    await writeFile(file.path, file.content, "utf-8");
    filesGenerated.push(file.name);
  }

  const structure = {
    main: ".cursorrules",
    rulesDir: ".cursor/rules",
    promptsDir: ".cursor/prompts",
    files: files.map((f) => ({
      path: f.name,
      lines: f.content.split("\n").length,
    })),
  };

  return {
    filesGenerated,
    structure,
    templateUsed: template?.name,
  };
}

