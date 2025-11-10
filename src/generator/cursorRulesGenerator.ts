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
import { generateSystemPrompts } from "./templates/systemPromptsTemplate.js";
import { generateQuickReference } from "./templates/quickReferenceTemplate.js";

export async function generateCursorRules(
  analysis: AnalysisResult,
  options: GenerationOptions
): Promise<GenerationResult> {
  const { projectPath, approach } = options;

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

  // Generate all files
  const files = [
    {
      path: join(projectPath, ".cursorrules"),
      content: generateMainCursorRules(analysis, approach),
      name: ".cursorrules",
    },
    {
      path: join(rulesDir, "architecture.md"),
      content: generateArchitectureRules(analysis, approach),
      name: ".cursor/rules/architecture.md",
    },
    {
      path: join(rulesDir, "code-style.md"),
      content: generateCodeStyleRules(analysis, approach),
      name: ".cursor/rules/code-style.md",
    },
    {
      path: join(rulesDir, "git-workflow.md"),
      content: generateGitWorkflowRules(analysis, approach),
      name: ".cursor/rules/git-workflow.md",
    },
    {
      path: join(rulesDir, "testing.md"),
      content: generateTestingRules(analysis, approach),
      name: ".cursor/rules/testing.md",
    },
    {
      path: join(rulesDir, "security.md"),
      content: generateSecurityRules(analysis, approach),
      name: ".cursor/rules/security.md",
    },
    {
      path: join(promptsDir, "system-prompts.md"),
      content: generateSystemPrompts(analysis),
      name: ".cursor/prompts/system-prompts.md",
    },
    {
      path: join(cursorDir, "quick-reference.md"),
      content: generateQuickReference(analysis),
      name: ".cursor/quick-reference.md",
    },
  ];

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
  };
}

