import { readdir, readFile } from "fs/promises";
import { join, extname } from "path";
import { CodePatternsAnalysis } from "../types.js";

export async function analyzeCodePatterns(
  projectPath: string,
  sampleSize: number = 10
): Promise<CodePatternsAnalysis> {
  const result: CodePatternsAnalysis = {
    naming: {
      functions: "unknown",
      variables: "unknown",
      constants: "unknown",
      files: "unknown",
      consistency: 0,
    },
    errorHandling: {
      pattern: "unknown",
      coverage: 0,
      hasCustomErrors: false,
      loggingApproach: "none",
    },
    functionPatterns: {
      asyncAwaitUsage: 0,
      arrowFunctionUsage: 0,
      pureFunction: 0,
    },
    imports: {
      style: "unknown",
      hasAliases: false,
      aliases: [],
    },
    documentation: {
      hasJSDoc: false,
      hasDocstrings: false,
      coverage: 0,
    },
    sampledFiles: 0,
  };

  // Find source files to sample
  const srcDir = await findSourceDirectory(projectPath);
  if (!srcDir) {
    return result;
  }

  const files = await findCodeFiles(srcDir, sampleSize);
  result.sampledFiles = files.length;

  if (files.length === 0) {
    return result;
  }

  // Analyze each file
  let totalFunctions = 0;
  let camelCaseFunctions = 0;
  let snakeCaseFunctions = 0;
  let pascalCaseFunctions = 0;
  let asyncFunctions = 0;
  let arrowFunctions = 0;
  let tryCatchBlocks = 0;
  let hasLogger = false;
  let hasConsoleLog = false;
  let jsDocComments = 0;
  let docstrings = 0;

  for (const file of files) {
    try {
      const content = await readFile(file, "utf-8");
      const ext = extname(file);

      // Analyze based on file type
      if ([".js", ".jsx", ".ts", ".tsx"].includes(ext)) {
        analyzeJavaScriptFile(content, {
          totalFunctions: (v) => (totalFunctions += v),
          camelCaseFunctions: (v) => (camelCaseFunctions += v),
          snakeCaseFunctions: (v) => (snakeCaseFunctions += v),
          pascalCaseFunctions: (v) => (pascalCaseFunctions += v),
          asyncFunctions: (v) => (asyncFunctions += v),
          arrowFunctions: (v) => (arrowFunctions += v),
          tryCatchBlocks: (v) => (tryCatchBlocks += v),
          hasLogger: (v) => (hasLogger = hasLogger || v),
          hasConsoleLog: (v) => (hasConsoleLog = hasConsoleLog || v),
          jsDocComments: (v) => (jsDocComments += v),
        });
      } else if (ext === ".py") {
        analyzePythonFile(content, {
          totalFunctions: (v) => (totalFunctions += v),
          snakeCaseFunctions: (v) => (snakeCaseFunctions += v),
          asyncFunctions: (v) => (asyncFunctions += v),
          tryCatchBlocks: (v) => (tryCatchBlocks += v),
          hasLogger: (v) => (hasLogger = hasLogger || v),
          docstrings: (v) => (docstrings += v),
        });
      }
    } catch (error) {
      // Skip files that can't be read
      continue;
    }
  }

  // Calculate patterns
  if (totalFunctions > 0) {
    const camelPct = camelCaseFunctions / totalFunctions;
    const snakePct = snakeCaseFunctions / totalFunctions;
    const pascalPct = pascalCaseFunctions / totalFunctions;

    if (camelPct > 0.6) {
      result.naming.functions = "camelCase";
      result.naming.consistency = Math.round(camelPct * 100);
    } else if (snakePct > 0.6) {
      result.naming.functions = "snake_case";
      result.naming.consistency = Math.round(snakePct * 100);
    } else if (pascalPct > 0.6) {
      result.naming.functions = "PascalCase";
      result.naming.consistency = Math.round(pascalPct * 100);
    } else {
      result.naming.functions = "mixed";
      result.naming.consistency = Math.round(
        Math.max(camelPct, snakePct, pascalPct) * 100
      );
    }

    result.functionPatterns.asyncAwaitUsage = Math.round(
      (asyncFunctions / totalFunctions) * 100
    );
    result.functionPatterns.arrowFunctionUsage = Math.round(
      (arrowFunctions / totalFunctions) * 100
    );
    result.errorHandling.coverage = Math.round(
      (tryCatchBlocks / totalFunctions) * 100
    );
  }

  // Logging approach
  if (hasLogger) {
    result.errorHandling.loggingApproach = "logger library";
  } else if (hasConsoleLog) {
    result.errorHandling.loggingApproach = "console";
  } else {
    result.errorHandling.loggingApproach = "none";
  }

  // Documentation
  if (jsDocComments > 0) {
    result.documentation.hasJSDoc = true;
    result.documentation.coverage = Math.round(
      (jsDocComments / totalFunctions) * 100
    );
  }
  if (docstrings > 0) {
    result.documentation.hasDocstrings = true;
    result.documentation.coverage = Math.round(
      (docstrings / totalFunctions) * 100
    );
  }

  return result;
}

async function findSourceDirectory(projectPath: string): Promise<string | null> {
  const possibleDirs = ["src", "lib", "app", "backend", "frontend"];
  
  for (const dir of possibleDirs) {
    const path = join(projectPath, dir);
    try {
      await readdir(path);
      return path;
    } catch {
      continue;
    }
  }
  
  return projectPath; // Use project root as fallback
}

async function findCodeFiles(
  dir: string,
  maxFiles: number
): Promise<string[]> {
  const files: string[] = [];
  const codeExtensions = [".js", ".jsx", ".ts", ".tsx", ".py", ".go", ".rs", ".rb", ".java"];

  async function traverse(currentDir: string) {
    if (files.length >= maxFiles) return;

    try {
      const entries = await readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        if (files.length >= maxFiles) break;

        const fullPath = join(currentDir, entry.name);

        // Skip common directories to ignore
        if (
          entry.isDirectory() &&
          !["node_modules", ".git", "dist", "build", "coverage"].includes(
            entry.name
          )
        ) {
          await traverse(fullPath);
        } else if (entry.isFile()) {
          const ext = extname(entry.name);
          if (codeExtensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch {
      // Skip directories we can't read
    }
  }

  await traverse(dir);
  return files;
}

interface JSCounters {
  totalFunctions: (v: number) => void;
  camelCaseFunctions: (v: number) => void;
  snakeCaseFunctions: (v: number) => void;
  pascalCaseFunctions: (v: number) => void;
  asyncFunctions: (v: number) => void;
  arrowFunctions: (v: number) => void;
  tryCatchBlocks: (v: number) => void;
  hasLogger: (v: boolean) => void;
  hasConsoleLog: (v: boolean) => void;
  jsDocComments: (v: number) => void;
}

function analyzeJavaScriptFile(content: string, counters: JSCounters): void {
  // Count function declarations
  const functionRegex =
    /(?:function\s+|const\s+|let\s+|var\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[=\(]/g;
  const arrowFunctionRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;
  const asyncRegex = /async\s+(?:function|[a-zA-Z_$])/g;

  let match;
  while ((match = functionRegex.exec(content)) !== null) {
    const name = match[1];
    counters.totalFunctions(1);

    if (/^[a-z][a-zA-Z0-9]*$/.test(name)) {
      counters.camelCaseFunctions(1);
    } else if (/^[a-z][a-z0-9_]*$/.test(name)) {
      counters.snakeCaseFunctions(1);
    } else if (/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      counters.pascalCaseFunctions(1);
    }
  }

  // Count arrow functions
  const arrowMatches = content.match(arrowFunctionRegex);
  if (arrowMatches) {
    counters.arrowFunctions(arrowMatches.length);
  }

  // Count async functions
  const asyncMatches = content.match(asyncRegex);
  if (asyncMatches) {
    counters.asyncFunctions(asyncMatches.length);
  }

  // Count try-catch blocks
  const tryCatchMatches = content.match(/try\s*{/g);
  if (tryCatchMatches) {
    counters.tryCatchBlocks(tryCatchMatches.length);
  }

  // Check logging
  if (content.includes("logger.") || content.includes("log.")) {
    counters.hasLogger(true);
  }
  if (content.includes("console.log")) {
    counters.hasConsoleLog(true);
  }

  // Count JSDoc comments
  const jsDocMatches = content.match(/\/\*\*[\s\S]*?\*\//g);
  if (jsDocMatches) {
    counters.jsDocComments(jsDocMatches.length);
  }
}

interface PyCounters {
  totalFunctions: (v: number) => void;
  snakeCaseFunctions: (v: number) => void;
  asyncFunctions: (v: number) => void;
  tryCatchBlocks: (v: number) => void;
  hasLogger: (v: boolean) => void;
  docstrings: (v: number) => void;
}

function analyzePythonFile(content: string, counters: PyCounters): void {
  // Count function definitions
  const functionRegex = /def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
  const asyncRegex = /async\s+def\s+/g;

  let match;
  while ((match = functionRegex.exec(content)) !== null) {
    const name = match[1];
    counters.totalFunctions(1);

    if (/^[a-z][a-z0-9_]*$/.test(name)) {
      counters.snakeCaseFunctions(1);
    }
  }

  // Count async functions
  const asyncMatches = content.match(asyncRegex);
  if (asyncMatches) {
    counters.asyncFunctions(asyncMatches.length);
  }

  // Count try-except blocks
  const tryMatches = content.match(/try:/g);
  if (tryMatches) {
    counters.tryCatchBlocks(tryMatches.length);
  }

  // Check logging
  if (content.includes("logger.") || content.includes("logging.")) {
    counters.hasLogger(true);
  }

  // Count docstrings
  const docstringMatches = content.match(/"""[\s\S]*?"""|'''[\s\S]*?'''/g);
  if (docstringMatches) {
    counters.docstrings(docstringMatches.length);
  }
}

