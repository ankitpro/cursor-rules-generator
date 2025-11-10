import { simpleGit, SimpleGit } from "simple-git";
import { mkdir } from "fs/promises";
import { join } from "path";
import { homedir } from "os";
import { existsSync } from "fs";

const CACHE_DIR = join(homedir(), ".cursor-rules-generator-cache");

/**
 * Clone or update a git repository
 * @param repoUrl - The GitHub repository URL
 * @returns Path to the cloned repository
 */
export async function cloneOrUpdateRepo(repoUrl: string): Promise<string> {
  // Ensure cache directory exists
  if (!existsSync(CACHE_DIR)) {
    await mkdir(CACHE_DIR, { recursive: true });
  }

  const repoName = getRepoName(repoUrl);
  const repoPath = join(CACHE_DIR, repoName);

  const git: SimpleGit = simpleGit();

  if (existsSync(repoPath)) {
    // Repository already exists, update it
    console.error(`Updating existing repository: ${repoName}`);
    const gitRepo = simpleGit(repoPath);
    
    try {
      await gitRepo.fetch();
      await gitRepo.pull();
      console.error(`Repository updated: ${repoName}`);
    } catch (error) {
      console.error(`Failed to update repository, using cached version: ${error}`);
    }
  } else {
    // Clone the repository
    console.error(`Cloning repository: ${repoUrl}`);
    await git.clone(repoUrl, repoPath);
    console.error(`Repository cloned: ${repoName}`);
  }

  return repoPath;
}

/**
 * Get the repository path without cloning
 * @param repoUrl - The GitHub repository URL
 * @returns Path where the repository would be cached
 */
export function getRepoPath(repoUrl: string): string {
  const repoName = getRepoName(repoUrl);
  return join(CACHE_DIR, repoName);
}

/**
 * Extract repository name from URL
 * @param repoUrl - The GitHub repository URL
 * @returns Repository name
 */
function getRepoName(repoUrl: string): string {
  // Handle various URL formats
  // https://github.com/user/repo.git
  // git@github.com:user/repo.git
  // https://github.com/user/repo
  
  const match = repoUrl.match(/\/([^\/]+?)(?:\.git)?$/);
  if (match) {
    return match[1];
  }
  
  // Fallback: use the entire URL as a hash
  return Buffer.from(repoUrl).toString("base64").replace(/[^a-zA-Z0-9]/g, "");
}

