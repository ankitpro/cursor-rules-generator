import { readdir, readFile } from "fs/promises";
import { join, extname } from "path";
import { TestingAnalysis } from "../types.js";

export async function analyzeTesting(
  projectPath: string
): Promise<TestingAnalysis> {
  const result: TestingAnalysis = {
    framework: "unknown",
    testFiles: 0,
    coverage: "unknown",
    patterns: [],
    hasE2E: false,
    hasIntegration: false,
    hasUnit: false,
  };

  // Check for test configuration files to detect framework
  const testConfigs: Record<string, string> = {
    "jest.config.js": "Jest",
    "jest.config.ts": "Jest",
    "vitest.config.js": "Vitest",
    "vitest.config.ts": "Vitest",
    "cypress.config.js": "Cypress",
    "cypress.config.ts": "Cypress",
    "playwright.config.js": "Playwright",
    "playwright.config.ts": "Playwright",
    "pytest.ini": "pytest",
    ".rspec": "RSpec",
    "karma.conf.js": "Karma",
  };

  for (const [file, framework] of Object.entries(testConfigs)) {
    try {
      await readFile(join(projectPath, file), "utf-8");
      result.framework = framework;
      break;
    } catch {
      continue;
    }
  }

  // Count test files
  const testFiles = await findTestFiles(projectPath);
  result.testFiles = testFiles.length;

  // Analyze test patterns
  for (const file of testFiles.slice(0, 10)) {
    // Sample first 10
    try {
      const content = await readFile(file, "utf-8");

      // Detect test types
      if (content.includes("e2e") || content.includes("E2E")) {
        result.hasE2E = true;
      }
      if (
        content.includes("integration") ||
        content.includes("Integration")
      ) {
        result.hasIntegration = true;
      }
      if (content.includes("unit") || content.includes("Unit")) {
        result.hasUnit = true;
      }

      // Detect patterns
      if (content.includes("describe(") || content.includes("it(")) {
        if (!result.patterns.includes("BDD-style (describe/it)")) {
          result.patterns.push("BDD-style (describe/it)");
        }
      }
      if (content.includes("test(")) {
        if (!result.patterns.includes("test() blocks")) {
          result.patterns.push("test() blocks");
        }
      }
      if (content.includes("@pytest.mark")) {
        if (!result.patterns.includes("pytest markers")) {
          result.patterns.push("pytest markers");
        }
      }
      if (content.includes("mock") || content.includes("Mock")) {
        if (!result.patterns.includes("Mocking/Stubbing")) {
          result.patterns.push("Mocking/Stubbing");
        }
      }
    } catch {
      continue;
    }
  }

  // Check for coverage configuration
  try {
    const packageJson = await readFile(
      join(projectPath, "package.json"),
      "utf-8"
    );
    const pkg = JSON.parse(packageJson);
    if (pkg.jest?.collectCoverage || pkg.scripts?.coverage) {
      result.coverage = "configured";
    }
  } catch {
    // No package.json
  }

  try {
    await readFile(join(projectPath, ".coveragerc"), "utf-8");
    result.coverage = "configured";
  } catch {
    // No coverage config
  }

  // Default test type if none detected
  if (!result.hasUnit && !result.hasIntegration && !result.hasE2E) {
    result.hasUnit = result.testFiles > 0; // Assume unit tests if we have test files
  }

  return result;
}

async function findTestFiles(dir: string): Promise<string[]> {
  const testFiles: string[] = [];
  const testExtensions = [".test.", ".spec.", "_test.", "_spec."];

  async function traverse(currentDir: string) {
    try {
      const entries = await readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(currentDir, entry.name);

        if (
          entry.isDirectory() &&
          !["node_modules", ".git", "dist", "build"].includes(entry.name)
        ) {
          // Check for test directories
          if (
            ["tests", "__tests__", "test", "spec", "e2e"].includes(
              entry.name.toLowerCase()
            )
          ) {
            await traverse(fullPath);
          } else {
            await traverse(fullPath);
          }
        } else if (entry.isFile()) {
          const name = entry.name;
          if (testExtensions.some((ext) => name.includes(ext))) {
            testFiles.push(fullPath);
          }
        }
      }
    } catch {
      // Skip directories we can't read
    }
  }

  await traverse(dir);
  return testFiles;
}

