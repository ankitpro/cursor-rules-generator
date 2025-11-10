import { readFile } from "fs/promises";
import { join } from "path";
import { DependencyAnalysis } from "../types.js";

export async function analyzeDependencies(
  projectPath: string
): Promise<DependencyAnalysis> {
  const result: DependencyAnalysis = {
    languages: [],
    frameworks: {},
    uiLibraries: [],
    stateManagement: [],
    testing: [],
    database: [],
    buildTools: [],
    packageManager: "unknown",
    dependencyFile: "",
    allDependencies: {},
  };

  // Try to read various dependency files
  const dependencyFiles = [
    { file: "package.json", type: "node" },
    { file: "requirements.txt", type: "python-pip" },
    { file: "Pipfile", type: "python-pipenv" },
    { file: "pyproject.toml", type: "python-poetry" },
    { file: "go.mod", type: "go" },
    { file: "Cargo.toml", type: "rust" },
    { file: "Gemfile", type: "ruby" },
    { file: "pom.xml", type: "java-maven" },
    { file: "build.gradle", type: "java-gradle" },
    { file: "composer.json", type: "php" },
    { file: "pubspec.yaml", type: "dart" },
    { file: "mix.exs", type: "elixir" },
    { file: "Package.swift", type: "swift" },
  ];

  for (const { file, type } of dependencyFiles) {
    try {
      const content = await readFile(join(projectPath, file), "utf-8");
      result.dependencyFile = file;

      switch (type) {
        case "node":
          await analyzeNodeDependencies(content, result);
          break;
        case "python-pip":
        case "python-pipenv":
        case "python-poetry":
          analyzePythonDependencies(content, result, type);
          break;
        case "go":
          analyzeGoDependencies(content, result);
          break;
        case "rust":
          analyzeRustDependencies(content, result);
          break;
        // Add more cases as needed
        default:
          result.languages.push(type.split("-")[0]);
      }
      break; // Use first found dependency file
    } catch (error) {
      // File doesn't exist, continue
      continue;
    }
  }

  return result;
}

async function analyzeNodeDependencies(
  content: string,
  result: DependencyAnalysis
): Promise<void> {
  const pkg = JSON.parse(content);
  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  result.allDependencies = allDeps;
  result.packageManager = "npm"; // Could detect yarn/pnpm too

  // Detect language
  if (pkg.devDependencies?.typescript || pkg.dependencies?.typescript) {
    result.languages.push("TypeScript");
  } else {
    result.languages.push("JavaScript");
  }

  // Detect frameworks
  if (allDeps.react) {
    result.frameworks.react = allDeps.react;
    result.languages.push("React");
  }
  if (allDeps.vue) {
    result.frameworks.vue = allDeps.vue;
  }
  if (allDeps["@angular/core"]) {
    result.frameworks.angular = allDeps["@angular/core"];
  }
  if (allDeps.next) {
    result.frameworks.next = allDeps.next;
  }
  if (allDeps.express) {
    result.frameworks.express = allDeps.express;
  }
  if (allDeps.fastify) {
    result.frameworks.fastify = allDeps.fastify;
  }
  if (allDeps.nestjs || allDeps["@nestjs/core"]) {
    result.frameworks.nestjs = allDeps["@nestjs/core"] || allDeps.nestjs;
  }

  // Detect UI libraries
  if (allDeps["@mui/material"] || allDeps["@material-ui/core"]) {
    result.uiLibraries.push("Material-UI");
  }
  if (allDeps.antd) {
    result.uiLibraries.push("Ant Design");
  }
  if (allDeps["tailwindcss"]) {
    result.uiLibraries.push("Tailwind CSS");
  }
  if (allDeps["bootstrap"]) {
    result.uiLibraries.push("Bootstrap");
  }
  if (allDeps["@chakra-ui/react"]) {
    result.uiLibraries.push("Chakra UI");
  }

  // Detect state management
  if (allDeps.redux || allDeps["@reduxjs/toolkit"]) {
    result.stateManagement.push("Redux");
  }
  if (allDeps.zustand) {
    result.stateManagement.push("Zustand");
  }
  if (allDeps.mobx) {
    result.stateManagement.push("MobX");
  }
  if (allDeps.pinia) {
    result.stateManagement.push("Pinia");
  }
  if (allDeps.recoil) {
    result.stateManagement.push("Recoil");
  }

  // Detect testing
  if (allDeps.jest) {
    result.testing.push("Jest");
  }
  if (allDeps.vitest) {
    result.testing.push("Vitest");
  }
  if (allDeps.mocha) {
    result.testing.push("Mocha");
  }
  if (allDeps["@testing-library/react"]) {
    result.testing.push("React Testing Library");
  }
  if (allDeps.cypress) {
    result.testing.push("Cypress");
  }
  if (allDeps.playwright) {
    result.testing.push("Playwright");
  }

  // Detect database
  if (allDeps.pg) {
    result.database.push("PostgreSQL");
  }
  if (allDeps.mysql || allDeps.mysql2) {
    result.database.push("MySQL");
  }
  if (allDeps.mongodb || allDeps.mongoose) {
    result.database.push("MongoDB");
  }
  if (allDeps.sqlite3) {
    result.database.push("SQLite");
  }
  if (allDeps.prisma) {
    result.database.push("Prisma");
  }
  if (allDeps.typeorm) {
    result.database.push("TypeORM");
  }

  // Detect build tools
  if (allDeps.vite) {
    result.buildTools.push("Vite");
  }
  if (allDeps.webpack) {
    result.buildTools.push("Webpack");
  }
  if (allDeps.rollup) {
    result.buildTools.push("Rollup");
  }
  if (allDeps.esbuild) {
    result.buildTools.push("esbuild");
  }
  if (allDeps.parcel) {
    result.buildTools.push("Parcel");
  }
}

function analyzePythonDependencies(
  content: string,
  result: DependencyAnalysis,
  type: string
): void {
  result.languages.push("Python");
  result.packageManager = type.replace("python-", "");

  // Simple pattern matching for common frameworks
  const frameworks: Record<string, string> = {
    fastapi: "FastAPI",
    django: "Django",
    flask: "Flask",
    "pyramid": "Pyramid",
  };

  const testing: Record<string, string> = {
    pytest: "pytest",
    unittest: "unittest",
    nose: "nose",
  };

  const databases: Record<string, string> = {
    sqlalchemy: "SQLAlchemy",
    psycopg2: "PostgreSQL",
    pymongo: "MongoDB",
    redis: "Redis",
  };

  for (const [pkg, name] of Object.entries(frameworks)) {
    if (content.toLowerCase().includes(pkg)) {
      result.frameworks[pkg] = name;
    }
  }

  for (const [pkg, name] of Object.entries(testing)) {
    if (content.toLowerCase().includes(pkg)) {
      result.testing.push(name);
    }
  }

  for (const [pkg, name] of Object.entries(databases)) {
    if (content.toLowerCase().includes(pkg)) {
      result.database.push(name);
    }
  }
}

function analyzeGoDependencies(
  content: string,
  result: DependencyAnalysis
): void {
  result.languages.push("Go");
  result.packageManager = "go modules";

  // Detect common Go frameworks
  if (content.includes("gin-gonic/gin")) {
    result.frameworks.gin = "Gin";
  }
  if (content.includes("gorilla/mux")) {
    result.frameworks.gorilla = "Gorilla Mux";
  }
  if (content.includes("echo")) {
    result.frameworks.echo = "Echo";
  }
  if (content.includes("fiber")) {
    result.frameworks.fiber = "Fiber";
  }

  // Detect testing
  if (content.includes("stretchr/testify")) {
    result.testing.push("Testify");
  }

  // Detect databases
  if (content.includes("lib/pq")) {
    result.database.push("PostgreSQL");
  }
  if (content.includes("go-sql-driver/mysql")) {
    result.database.push("MySQL");
  }
  if (content.includes("mongo-driver")) {
    result.database.push("MongoDB");
  }
  if (content.includes("gorm")) {
    result.database.push("GORM");
  }
}

function analyzeRustDependencies(
  content: string,
  result: DependencyAnalysis
): void {
  result.languages.push("Rust");
  result.packageManager = "cargo";

  // Detect common Rust frameworks
  if (content.includes("actix-web")) {
    result.frameworks.actix = "Actix Web";
  }
  if (content.includes("rocket")) {
    result.frameworks.rocket = "Rocket";
  }
  if (content.includes("warp")) {
    result.frameworks.warp = "Warp";
  }
  if (content.includes("axum")) {
    result.frameworks.axum = "Axum";
  }

  // Detect database
  if (content.includes("diesel")) {
    result.database.push("Diesel");
  }
  if (content.includes("sqlx")) {
    result.database.push("SQLx");
  }
}

