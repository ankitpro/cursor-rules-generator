#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { readFile } from "fs/promises";
import { join } from "path";
import { analyzeDependencies } from "./analyzers/dependencies.js";
import { analyzeStructure } from "./analyzers/structure.js";
import { analyzeCodePatterns } from "./analyzers/codePatterns.js";
import { analyzeGitWorkflow } from "./analyzers/gitWorkflow.js";
import { analyzeEnvironment } from "./analyzers/environment.js";
import { analyzeTesting } from "./analyzers/testing.js";
import { generateFullAnalysisReport } from "./analyzers/reportGenerator.js";
import { generateCursorRules } from "./generator/cursorRulesGenerator.js";
import { cloneOrUpdateRepo, getRepoPath } from "./utils/gitUtils.js";
import { AnalysisResult, GenerationOptions } from "./types.js";
import { listTemplates, getTemplate, suggestTemplates } from "./templates/index.js";

// Get configuration from environment or args
const TEMPLATE_REPO_URL = process.env.TEMPLATE_REPO_URL || 
  "https://github.com/ankitpro/cursor-rules-generator.git";

const server = new Server(
  {
    name: "cursor-rules-generator",
    version: "3.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// Initialize repository on startup
let repoPath: string | null = null;
let templateContent: string | null = null;

async function initializeRepo() {
  try {
    console.error(`Cloning/updating repository: ${TEMPLATE_REPO_URL}`);
    repoPath = await cloneOrUpdateRepo(TEMPLATE_REPO_URL);
    console.error(`Repository ready at: ${repoPath}`);
    
    // Load the generator template
    try {
      templateContent = await readFile(
        join(repoPath, "docs/GENERATOR_TEMPLATE.md"),
        "utf-8"
      );
      console.error("Generator template loaded successfully");
    } catch (error) {
      console.error("Warning: Could not load GENERATOR_TEMPLATE.md");
    }
  } catch (error) {
    console.error("Failed to initialize repository:", error);
    throw error;
  }
}

// Define available tools
const tools: Tool[] = [
  {
    name: "analyze_project",
    description:
      "Perform a comprehensive analysis of a project to detect technologies, patterns, and structure. This is the first step before generating cursor rules.",
    inputSchema: {
      type: "object",
      properties: {
        projectPath: {
          type: "string",
          description: "Absolute path to the project root directory to analyze",
        },
      },
      required: ["projectPath"],
    },
  },
  {
    name: "list_templates",
    description:
      "List available pre-built templates for common tech stacks and frameworks. Use this to discover templates before generation.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["framework", "language", "stack", "specialized"],
          description: "Optional: Filter templates by category",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Optional: Filter templates by tags (e.g., 'react', 'typescript', 'python')",
        },
      },
    },
  },
  {
    name: "suggest_templates",
    description:
      "Get template suggestions based on project analysis. Run analyze_project first, then use this to get recommended templates.",
    inputSchema: {
      type: "object",
      properties: {
        analysisResult: {
          type: "object",
          description: "The analysis result from analyze_project",
        },
      },
      required: ["analysisResult"],
    },
  },
  {
    name: "generate_cursor_rules",
    description:
      "Generate modular .cursorrules files based on project analysis. Optionally start with a pre-built template. Run analyze_project first to get analysis data, or this will run it automatically.",
    inputSchema: {
      type: "object",
      properties: {
        projectPath: {
          type: "string",
          description: "Absolute path to the project root directory where cursor rules will be generated",
        },
        analysisResult: {
          type: "object",
          description:
            "Optional: The analysis result from analyze_project (will run automatically if not provided)",
        },
        approach: {
          type: "string",
          enum: ["current_patterns", "best_practices", "hybrid"],
          description:
            "Which approach to use: 'current_patterns' (document as-is), 'best_practices' (apply industry standards), or 'hybrid' (mix of both)",
          default: "best_practices",
        },
        template: {
          type: "object",
          description: "Optional: Start with a pre-built template",
          properties: {
            templateId: {
              type: "string",
              description: "Template ID from list_templates (e.g., 'react-typescript-tailwind')",
            },
            mergeStrategy: {
              type: "string",
              enum: ["template-first", "analysis-first", "balanced"],
              description: "How to merge template with analysis: 'template-first' (template as base), 'analysis-first' (analysis as base), or 'balanced' (merge both equally)",
              default: "balanced",
            },
          },
        },
      },
      required: ["projectPath"],
    },
  },
];

// Define available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  if (!repoPath) {
    return { resources: [] };
  }

  return {
    resources: [
      {
        uri: "template://generator-template",
        name: "Cursor Rules Generator Template",
        description:
          "The master template for generating cursor rules. Contains all instructions for analyzing projects and generating modular cursor rules.",
        mimeType: "text/markdown",
      },
      {
        uri: "template://quick-start",
        name: "Quick Start Guide",
        description: "Quick start guide for using the cursor rules generator",
        mimeType: "text/markdown",
      },
      {
        uri: "template://user-guide",
        name: "User Guide",
        description: "Complete user guide for the cursor rules generator",
        mimeType: "text/markdown",
      },
    ],
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (!repoPath) {
    throw new Error("Repository not initialized");
  }

  try {
    let content: string;
    let mimeType = "text/markdown";

    switch (uri) {
      case "template://generator-template":
        content = await readFile(
          join(repoPath, "docs/GENERATOR_TEMPLATE.md"),
          "utf-8"
        );
        break;
      case "template://quick-start":
        content = await readFile(join(repoPath, "QUICK_START.md"), "utf-8");
        break;
      case "template://user-guide":
        content = await readFile(join(repoPath, "docs/USER_GUIDE.md"), "utf-8");
        break;
      default:
        throw new Error(`Unknown resource: ${uri}`);
    }

    return {
      contents: [
        {
          uri,
          mimeType,
          text: content,
        },
      ],
    };
  } catch (error) {
    throw new Error(
      `Failed to read resource ${uri}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});

// Define available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "generate-cursor-rules",
        description:
          "Generate comprehensive .cursorrules for a project based on automated analysis",
        arguments: [
          {
            name: "projectPath",
            description: "Absolute path to the project root directory",
            required: true,
          },
        ],
      },
      {
        name: "analyze-project",
        description: "Analyze a project to detect technologies, patterns, and structure",
        arguments: [
          {
            name: "projectPath",
            description: "Absolute path to the project root directory",
            required: true,
          },
        ],
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!templateContent) {
    throw new Error("Template not loaded");
  }

  const projectPath = args?.projectPath as string;

  switch (name) {
    case "generate-cursor-rules":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `I want to generate comprehensive cursor rules for my project at: ${projectPath}

Please follow these steps:

1. Use the analyze_project tool to scan the repository at "${projectPath}"
2. Review the analysis report and present it to me
3. Ask me to choose between:
   - Option A: Document current patterns (as-is)
   - Option B: Apply best practices
   - Option C: Hybrid approach
4. Once I choose, use the generate_cursor_rules tool with the appropriate approach
5. Generate the modular .cursorrules structure as described in the template

Follow all instructions in the Generator Template resource that has been loaded.`,
            },
          },
        ],
      };

    case "analyze-project":
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please analyze my project at: ${projectPath}

Use the analyze_project tool to perform a comprehensive analysis including:
- Dependencies and frameworks
- Project structure and architecture
- Code patterns and naming conventions
- Git workflow
- Environment configuration
- Testing setup

Present the analysis in a clear, organized report.`,
            },
          },
        ],
      };

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "analyze_project": {
        if (!args || !args.projectPath) {
          throw new Error("projectPath is required");
        }
        const projectPath = args.projectPath as string;

        // Run all analyses
        const dependencies = await analyzeDependencies(projectPath);
        const structure = await analyzeStructure(projectPath);
        const codePatterns = await analyzeCodePatterns(projectPath, 10);
        const gitWorkflow = await analyzeGitWorkflow(projectPath);
        const environment = await analyzeEnvironment(projectPath);
        const testing = await analyzeTesting(projectPath);

        const analysisResult: AnalysisResult = {
          dependencies,
          structure,
          codePatterns,
          gitWorkflow,
          environment,
          testing,
        };

        // Generate comprehensive report
        const report = generateFullAnalysisReport(analysisResult);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  analysis: analysisResult,
                  report,
                  message:
                    "Project analysis complete. Use generate_cursor_rules with this result to create cursor rules files.",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "generate_cursor_rules": {
        if (!args || !args.projectPath) {
          throw new Error("projectPath is required");
        }
        const projectPath = args.projectPath as string;
        const approach =
          (args.approach as GenerationOptions["approach"]) || "best_practices";

        let analysisResult = args.analysisResult as AnalysisResult | undefined;

        // If no analysis provided, run it
        if (!analysisResult) {
          const dependencies = await analyzeDependencies(projectPath);
          const structure = await analyzeStructure(projectPath);
          const codePatterns = await analyzeCodePatterns(projectPath, 10);
          const gitWorkflow = await analyzeGitWorkflow(projectPath);
          const environment = await analyzeEnvironment(projectPath);
          const testing = await analyzeTesting(projectPath);

          analysisResult = {
            dependencies,
            structure,
            codePatterns,
            gitWorkflow,
            environment,
            testing,
          };
        }

        const options: GenerationOptions = {
          approach,
          projectPath,
          template: args.template as GenerationOptions["template"],
        };

        const result = await generateCursorRules(analysisResult, options);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  filesGenerated: result.filesGenerated,
                  structure: result.structure,
                  message: `Successfully generated ${result.filesGenerated.length} cursor rules files in modular structure.`,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "list_templates": {
        const category = args?.category as "framework" | "language" | "stack" | "specialized" | undefined;
        const tags = args?.tags as string[] | undefined;

        const templates = listTemplates({ category, tags });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  templates: templates.map(t => ({
                    id: t.id,
                    name: t.name,
                    description: t.description,
                    category: t.category,
                    tags: t.tags,
                  })),
                  count: templates.length,
                  message: `Found ${templates.length} template(s)`,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "suggest_templates": {
        if (!args || !args.analysisResult) {
          throw new Error("analysisResult is required");
        }

        const analysisResult = args.analysisResult as AnalysisResult;
        
        const suggestions = suggestTemplates({
          languages: analysisResult.dependencies.languages,
          frameworks: analysisResult.dependencies.frameworks,
          projectType: analysisResult.structure.projectType,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  suggestions: suggestions.map(t => ({
                    id: t.id,
                    name: t.name,
                    description: t.description,
                    category: t.category,
                    tags: t.tags,
                  })),
                  count: suggestions.length,
                  message: suggestions.length > 0
                    ? `Found ${suggestions.length} recommended template(s) for your project`
                    : "No specific templates recommended. You can browse all templates with list_templates.",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: `Unknown tool: ${name}`,
              }),
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
          }),
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  // Initialize repository first
  await initializeRepo();

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Cursor Rules Generator MCP Server running on stdio");
  console.error(`Template repository: ${TEMPLATE_REPO_URL}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
