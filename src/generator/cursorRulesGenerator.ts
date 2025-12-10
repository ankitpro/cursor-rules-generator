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
import { generateAgentsMd } from "./templates/agentsMdTemplate.js";
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
import { generateNestedRule } from "./templates/nestedRulesTemplate.js";

export async function generateCursorRules(
  analysis: AnalysisResult,
  options: GenerationOptions
): Promise<GenerationResult> {
  const { projectPath, approach, template: templateOptions, generateAgentsMd: shouldGenerateAgentsMd, generateNestedRules: shouldGenerateNestedRules } = options;

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
      path: join(rulesDir, "main.mdc"),
      content: mergedContent?.mainRules || generateMainCursorRules(analysis, approach),
      name: ".cursor/rules/main.mdc",
    },
  ];

  // Optionally generate AGENTS.md as simpler alternative
  if (shouldGenerateAgentsMd) {
    files.push({
      path: join(projectPath, "AGENTS.md"),
      content: generateAgentsMd(analysis, approach),
      name: "AGENTS.md",
    });
  }

  // Add rule files
  files.push(
    {
      path: join(rulesDir, "architecture.mdc"),
      content: mergedContent?.architectureRules || generateArchitectureRules(analysis, approach),
      name: ".cursor/rules/architecture.mdc",
    },
    {
      path: join(rulesDir, "code-style.mdc"),
      content: mergedContent?.codeStyleRules || generateCodeStyleRules(analysis, approach),
      name: ".cursor/rules/code-style.mdc",
    },
    {
      path: join(rulesDir, "git-workflow.mdc"),
      content: mergedContent?.gitWorkflowRules || generateGitWorkflowRules(analysis, approach),
      name: ".cursor/rules/git-workflow.mdc",
    },
    {
      path: join(rulesDir, "testing.mdc"),
      content: mergedContent?.testingRules || generateTestingRules(analysis, approach),
      name: ".cursor/rules/testing.mdc",
    },
    {
      path: join(rulesDir, "security.mdc"),
      content: mergedContent?.securityRules || generateSecurityRules(analysis, approach),
      name: ".cursor/rules/security.mdc",
    },
    // Prompts directory - README and individual role files
    {
      path: join(promptsDir, "README.mdc"),
      content: generatePromptsReadme(analysis),
      name: ".cursor/prompts/README.mdc",
    },
    {
      path: join(promptsDir, "documentation-writer.mdc"),
      content: generateDocumentationWriterRole(),
      name: ".cursor/prompts/documentation-writer.mdc",
    },
    {
      path: join(promptsDir, "frontend-developer.mdc"),
      content: generateFrontendDeveloperRole(analysis),
      name: ".cursor/prompts/frontend-developer.mdc",
    },
    {
      path: join(promptsDir, "backend-developer.mdc"),
      content: generateBackendDeveloperRole(analysis),
      name: ".cursor/prompts/backend-developer.mdc",
    },
    {
      path: join(promptsDir, "software-architect.mdc"),
      content: generateSoftwareArchitectRole(),
      name: ".cursor/prompts/software-architect.mdc",
    },
    {
      path: join(promptsDir, "code-reviewer.mdc"),
      content: generateCodeReviewerRole(),
      name: ".cursor/prompts/code-reviewer.mdc",
    },
    {
      path: join(promptsDir, "qa-engineer.mdc"),
      content: generateQAEngineerRole(analysis),
      name: ".cursor/prompts/qa-engineer.mdc",
    },
    {
      path: join(promptsDir, "security-analyst.mdc"),
      content: generateSecurityAnalystRole(),
      name: ".cursor/prompts/security-analyst.mdc",
    },
    {
      path: join(promptsDir, "performance-engineer.mdc"),
      content: generatePerformanceEngineerRole(),
      name: ".cursor/prompts/performance-engineer.mdc",
    },
    {
      path: join(promptsDir, "database-administrator.mdc"),
      content: generateDatabaseAdministratorRole(analysis),
      name: ".cursor/prompts/database-administrator.mdc",
    },
    {
      path: join(cursorDir, "quick-reference.mdc"),
      content: generateQuickReference(analysis),
      name: ".cursor/quick-reference.mdc",
    }
  );

  // Add project-specific role files if needed
  if (analysis.structure.isMonorepo) {
    files.push({
      path: join(promptsDir, "monorepo-manager.mdc"),
      content: generateMonorepoManagerRole(),
      name: ".cursor/prompts/monorepo-manager.mdc",
    });
  }

  if (analysis.dependencies.buildTools.length > 0) {
    files.push({
      path: join(promptsDir, "build-engineer.mdc"),
      content: generateBuildEngineerRole(analysis),
      name: ".cursor/prompts/build-engineer.mdc",
    });
  }

  // Write all files
  for (const file of files) {
    await writeFile(file.path, file.content, "utf-8");
    filesGenerated.push(file.name);
  }

  // Generate nested rules if requested and candidates exist
  const nestedRulesInfo: Array<{ path: string; type: string; files: string[] }> = [];
  
  if (shouldGenerateNestedRules && analysis.structure.nestedRulesCandidates.length > 0) {
    for (const candidate of analysis.structure.nestedRulesCandidates) {
      const nestedRulesDir = join(projectPath, candidate.path, ".cursor", "rules");
      
      // Create nested .cursor/rules directory
      if (!existsSync(nestedRulesDir)) {
        await mkdir(nestedRulesDir, { recursive: true });
      }

      // Generate the nested rule file
      const nestedRuleContent = generateNestedRule(candidate.type, analysis, approach);
      const nestedRuleFile = join(nestedRulesDir, "main.mdc");
      await writeFile(nestedRuleFile, nestedRuleContent, "utf-8");

      const relativePath = `${candidate.path}/.cursor/rules/main.mdc`;
      filesGenerated.push(relativePath);
      
      nestedRulesInfo.push({
        path: candidate.path,
        type: candidate.type,
        files: ["main.mdc"],
      });
    }
  }

  const structure = {
    main: ".cursor/rules/main.mdc",
    ...(shouldGenerateAgentsMd && { agentsMd: "AGENTS.md" }),
    rulesDir: ".cursor/rules",
    promptsDir: ".cursor/prompts",
    ...(nestedRulesInfo.length > 0 && { nestedRules: nestedRulesInfo }),
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

