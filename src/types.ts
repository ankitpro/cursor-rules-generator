export interface DependencyAnalysis {
  languages: string[];
  frameworks: Record<string, string>;
  uiLibraries: string[];
  stateManagement: string[];
  testing: string[];
  database: string[];
  buildTools: string[];
  packageManager: string;
  dependencyFile: string;
  allDependencies: Record<string, string>;
}

export interface StructureAnalysis {
  projectType: string;
  architecture: string;
  directories: {
    path: string;
    purpose: string;
  }[];
  isMonorepo: boolean;
  hasBackend: boolean;
  hasFrontend: boolean;
  testLocation: "colocated" | "separate" | "mixed" | "none";
}

export interface CodePatternsAnalysis {
  naming: {
    functions: string;
    variables: string;
    constants: string;
    files: string;
    consistency: number;
  };
  errorHandling: {
    pattern: string;
    coverage: number;
    hasCustomErrors: boolean;
    loggingApproach: string;
  };
  functionPatterns: {
    asyncAwaitUsage: number;
    arrowFunctionUsage: number;
    pureFunction: number;
  };
  imports: {
    style: string;
    hasAliases: boolean;
    aliases: string[];
  };
  documentation: {
    hasJSDoc: boolean;
    hasDocstrings: boolean;
    coverage: number;
  };
  sampledFiles: number;
}

export interface GitWorkflowAnalysis {
  branches: string[];
  primaryBranch: string;
  hasDevelopBranch: boolean;
  branchStrategy: string;
  commitMessageFormat: string;
  conventionalCommits: boolean;
  hasVersionTags: boolean;
  versioningApproach: string;
  recentCommits: string[];
}

export interface EnvironmentAnalysis {
  hasEnvFile: boolean;
  envFiles: string[];
  variables: string[];
  hasSecrets: boolean;
  configFiles: string[];
}

export interface TestingAnalysis {
  framework: string;
  testFiles: number;
  coverage: string;
  patterns: string[];
  hasE2E: boolean;
  hasIntegration: boolean;
  hasUnit: boolean;
}

export interface AnalysisResult {
  dependencies: DependencyAnalysis;
  structure: StructureAnalysis;
  codePatterns: CodePatternsAnalysis;
  gitWorkflow: GitWorkflowAnalysis;
  environment: EnvironmentAnalysis;
  testing: TestingAnalysis;
}

export interface GenerationOptions {
  approach: "current_patterns" | "best_practices" | "hybrid";
  projectPath: string;
  hybridChoices?: Record<string, "current" | "best_practice">;
}

export interface GenerationResult {
  filesGenerated: string[];
  structure: {
    main: string;
    rulesDir: string;
    promptsDir: string;
    files: {
      path: string;
      lines: number;
    }[];
  };
}

