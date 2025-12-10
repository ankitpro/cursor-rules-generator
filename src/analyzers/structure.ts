import { readdir, stat } from "fs/promises";
import { join } from "path";
import { StructureAnalysis } from "../types.js";

export async function analyzeStructure(
  projectPath: string
): Promise<StructureAnalysis> {
  const result: StructureAnalysis = {
    projectType: "unknown",
    architecture: "unknown",
    directories: [],
    isMonorepo: false,
    hasBackend: false,
    hasFrontend: false,
    testLocation: "none",
    nestedRulesCandidates: [],
  };

  try {
    const entries = await readdir(projectPath, { withFileTypes: true });
    const directories = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    // Check for monorepo indicators
    result.isMonorepo =
      directories.includes("packages") ||
      directories.includes("apps") ||
      (await fileExists(join(projectPath, "lerna.json"))) ||
      (await fileExists(join(projectPath, "pnpm-workspace.yaml")));

    // Detect frontend
    const frontendIndicators = [
      "frontend",
      "client",
      "web",
      "app",
      "src/components",
      "src/pages",
    ];
    for (const indicator of frontendIndicators) {
      if (directories.includes(indicator) || (await dirExists(join(projectPath, indicator)))) {
        result.hasFrontend = true;
        break;
      }
    }

    // Detect backend
    const backendIndicators = [
      "backend",
      "server",
      "api",
      "services",
      "src/services",
      "src/api",
    ];
    for (const indicator of backendIndicators) {
      if (directories.includes(indicator) || (await dirExists(join(projectPath, indicator)))) {
        result.hasBackend = true;
        break;
      }
    }

    // Determine project type
    if (result.hasFrontend && result.hasBackend) {
      result.projectType = "Full-Stack Web Application";
      result.architecture = "Frontend/Backend Split";
    } else if (result.hasFrontend) {
      result.projectType = "Frontend Application";
      result.architecture = "Single Page Application";
    } else if (result.hasBackend) {
      result.projectType = "Backend API";
      result.architecture = "REST/GraphQL API";
    } else if (result.isMonorepo) {
      result.projectType = "Monorepo";
      result.architecture = "Monorepo Architecture";
    }

    // Detect common directory purposes
    const commonDirs: Record<string, string> = {
      src: "Source code",
      lib: "Library/utility code",
      components: "React/Vue components",
      pages: "Page components/routes",
      services: "Service layer",
      utils: "Utility functions",
      helpers: "Helper functions",
      api: "API endpoints",
      routes: "API routes",
      controllers: "API controllers",
      models: "Data models",
      views: "View templates",
      middleware: "Express middleware",
      config: "Configuration files",
      public: "Static assets",
      static: "Static assets",
      assets: "Static assets",
      styles: "CSS/styling files",
      tests: "Test files",
      __tests__: "Jest test files",
      spec: "RSpec test files",
      test: "Test files",
      docs: "Documentation",
      scripts: "Utility scripts",
      bin: "Binary/executable files",
      dist: "Build output",
      build: "Build output",
      out: "Build output",
    };

    for (const dir of directories) {
      if (commonDirs[dir]) {
        result.directories.push({
          path: dir,
          purpose: commonDirs[dir],
        });
      }
    }

    // Detect test location
    const hasTestsDir = directories.some((d) =>
      ["tests", "__tests__", "spec", "test"].includes(d)
    );
    const hasSrcDir = directories.includes("src");

    if (hasTestsDir) {
      result.testLocation = "separate";
    } else if (hasSrcDir) {
      // Check for colocated tests
      const srcPath = join(projectPath, "src");
      const hasColocatedTests = await hasTestFiles(srcPath);
      result.testLocation = hasColocatedTests ? "colocated" : "none";
    }

    // Detect nested rules candidates
    // These are major subdirectories that should have their own .cursor/rules/
    const nestedRulesConfig: Array<{
      patterns: string[];
      type: "frontend" | "backend" | "api" | "services" | "packages" | "apps" | 
            "terraform" | "packer" | "kubernetes" | "ansible" | "docker" | "helm";
      description: string;
    }> = [
      {
        patterns: ["frontend", "client", "web"],
        type: "frontend",
        description: "Frontend-specific rules for UI components and client-side code",
      },
      {
        patterns: ["backend", "server"],
        type: "backend",
        description: "Backend-specific rules for server-side logic and APIs",
      },
      {
        patterns: ["api"],
        type: "api",
        description: "API-specific rules for endpoint development and data handling",
      },
      {
        patterns: ["services"],
        type: "services",
        description: "Service layer rules for business logic and data processing",
      },
      {
        patterns: ["packages"],
        type: "packages",
        description: "Package-specific rules for monorepo packages",
      },
      {
        patterns: ["apps"],
        type: "apps",
        description: "Application-specific rules for monorepo apps",
      },
      {
        patterns: ["terraform"],
        type: "terraform",
        description: "Terraform-specific rules for infrastructure as code",
      },
      {
        patterns: ["packer"],
        type: "packer",
        description: "Packer-specific rules for image building automation",
      },
      {
        patterns: ["kubernetes", "k8s"],
        type: "kubernetes",
        description: "Kubernetes-specific rules for container orchestration configs",
      },
      {
        patterns: ["ansible"],
        type: "ansible",
        description: "Ansible-specific rules for configuration management and automation",
      },
      {
        patterns: ["docker"],
        type: "docker",
        description: "Docker-specific rules for containerization",
      },
      {
        patterns: ["helm"],
        type: "helm",
        description: "Helm-specific rules for Kubernetes package management",
      },
    ];

    for (const config of nestedRulesConfig) {
      for (const pattern of config.patterns) {
        if (directories.includes(pattern)) {
          const candidatePath = join(projectPath, pattern);
          // Check if it's actually a significant directory (has subdirectories)
          try {
            const subEntries = await readdir(candidatePath, { withFileTypes: true });
            const hasSubdirs = subEntries.some(entry => entry.isDirectory() && !entry.name.startsWith('.'));
            
            if (hasSubdirs) {
              result.nestedRulesCandidates.push({
                path: pattern,
                type: config.type,
                description: config.description,
              });
            }
          } catch {
            // Skip if can't read directory
          }
          break; // Only add once per type
        }
      }
    }
  } catch (error) {
    console.error("Error analyzing structure:", error);
  }

  return result;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function dirExists(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function hasTestFiles(dir: string): Promise<boolean> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const name = entry.name;
      if (
        name.endsWith(".test.js") ||
        name.endsWith(".test.ts") ||
        name.endsWith(".spec.js") ||
        name.endsWith(".spec.ts") ||
        name.endsWith("_test.py") ||
        name.endsWith("_spec.rb")
      ) {
        return true;
      }
      
      if (entry.isDirectory() && !name.startsWith(".") && name !== "node_modules") {
        if (await hasTestFiles(join(dir, name))) {
          return true;
        }
      }
    }
  } catch {
    // Ignore errors
  }
  
  return false;
}

