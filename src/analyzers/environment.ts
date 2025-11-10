import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { EnvironmentAnalysis } from "../types.js";

export async function analyzeEnvironment(
  projectPath: string
): Promise<EnvironmentAnalysis> {
  const result: EnvironmentAnalysis = {
    hasEnvFile: false,
    envFiles: [],
    variables: [],
    hasSecrets: false,
    configFiles: [],
  };

  // Check for environment files
  const envFilePatterns = [
    ".env.example",
    ".env.sample",
    ".env.template",
    ".env.local",
    ".env",
  ];

  for (const file of envFilePatterns) {
    try {
      const content = await readFile(join(projectPath, file), "utf-8");
      result.hasEnvFile = true;
      result.envFiles.push(file);

      // Parse environment variables
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const match = trimmed.match(/^([A-Z_][A-Z0-9_]*)=/);
          if (match) {
            result.variables.push(match[1]);

            // Check for secrets
            const varName = match[1].toLowerCase();
            if (
              varName.includes("secret") ||
              varName.includes("key") ||
              varName.includes("password") ||
              varName.includes("token") ||
              varName.includes("api_key")
            ) {
              result.hasSecrets = true;
            }
          }
        }
      }
    } catch {
      // File doesn't exist
      continue;
    }
  }

  // Check for config files
  const configPatterns = [
    "config.js",
    "config.json",
    "config.yaml",
    "config.yml",
    "config.toml",
    "settings.py",
    "settings.json",
  ];

  const configDirs = ["config", "src/config", "app/config"];

  for (const file of configPatterns) {
    try {
      await readFile(join(projectPath, file), "utf-8");
      result.configFiles.push(file);
    } catch {
      // Try in config directories
      for (const dir of configDirs) {
        try {
          await readFile(join(projectPath, dir, file), "utf-8");
          result.configFiles.push(`${dir}/${file}`);
          break;
        } catch {
          continue;
        }
      }
    }
  }

  // Check for docker-compose which might have env vars
  try {
    const dockerCompose = await readFile(
      join(projectPath, "docker-compose.yml"),
      "utf-8"
    );
    if (dockerCompose.includes("environment:")) {
      result.configFiles.push("docker-compose.yml");
    }
  } catch {
    // No docker-compose file
  }

  return result;
}

