import { Template, TemplateFilter } from "./types.js";

// Import all templates
import reactTypescriptTemplate from "./library/frameworks/react-typescript.js";
import nextjsAppRouterTemplate from "./library/frameworks/nextjs-app-router.js";
import fastapiAsyncTemplate from "./library/frameworks/fastapi-async.js";
import djangoRestTemplate from "./library/frameworks/django-rest.js";
import vueTypescriptTemplate from "./library/frameworks/vue-typescript.js";
import expressTypescriptTemplate from "./library/frameworks/express-typescript.js";
import fullStackTypescriptTemplate from "./library/stacks/full-stack-typescript.js";
import pythonBestPracticesTemplate from "./library/languages/python-best-practices.js";
import rustPatternsTemplate from "./library/languages/rust-patterns.js";
import microservicesTemplate from "./library/stacks/microservices.js";
import terraformAwsTemplate from "./library/specialized/terraform-aws.js";
import kubernetesHelmTemplate from "./library/specialized/kubernetes-helm.js";
import dockerComposeTemplate from "./library/specialized/docker-compose.js";
import githubActionsTemplate from "./library/specialized/github-actions.js";

/**
 * Registry of all available templates
 */
export const templateRegistry: Template[] = [
  // Frameworks
  reactTypescriptTemplate,
  nextjsAppRouterTemplate,
  fastapiAsyncTemplate,
  djangoRestTemplate,
  vueTypescriptTemplate,
  expressTypescriptTemplate,
  // Stacks
  fullStackTypescriptTemplate,
  microservicesTemplate,
  // Languages
  pythonBestPracticesTemplate,
  rustPatternsTemplate,
  // DevOps & Cloud
  terraformAwsTemplate,
  kubernetesHelmTemplate,
  dockerComposeTemplate,
  githubActionsTemplate,
];

/**
 * List templates with optional filtering
 */
export function listTemplates(filter?: TemplateFilter): Template[] {
  let filtered = [...templateRegistry];

  if (filter?.category) {
    filtered = filtered.filter(t => t.category === filter.category);
  }

  if (filter?.tags && filter.tags.length > 0) {
    filtered = filtered.filter(t => 
      filter.tags!.some(tag => t.tags.includes(tag))
    );
  }

  return filtered;
}

/**
 * Get a specific template by ID
 */
export function getTemplate(id: string): Template | null {
  return templateRegistry.find(t => t.id === id) || null;
}

/**
 * Get template suggestions based on project analysis
 */
export function suggestTemplates(analysis: {
  languages: string[];
  frameworks: Record<string, string>;
  projectType: string;
}): Template[] {
  const suggestions: Template[] = [];

  // Check for React
  if (analysis.frameworks.react) {
    suggestions.push(reactTypescriptTemplate);
  }

  // Check for Next.js
  if (analysis.frameworks.next || analysis.frameworks.nextjs) {
    suggestions.push(nextjsAppRouterTemplate);
  }

  // Check for FastAPI
  if (analysis.frameworks.fastapi) {
    suggestions.push(fastapiAsyncTemplate);
  }

  // Check for Django
  if (analysis.frameworks.django) {
    suggestions.push(djangoRestTemplate);
  }

  // Check for Vue
  if (analysis.frameworks.vue) {
    suggestions.push(vueTypescriptTemplate);
  }

  // Check for Express
  if (analysis.frameworks.express) {
    suggestions.push(expressTypescriptTemplate);
  }

  // Check for full-stack TypeScript
  if (analysis.languages.includes("typescript") && 
      (analysis.frameworks.react || analysis.frameworks.next) &&
      (analysis.frameworks.express || analysis.frameworks.fastify)) {
    suggestions.push(fullStackTypescriptTemplate);
  }

  // Check for Python without frameworks
  if (analysis.languages.includes("python") && !analysis.frameworks.django && !analysis.frameworks.fastapi) {
    suggestions.push(pythonBestPracticesTemplate);
  }

  // Check for Rust
  if (analysis.languages.includes("rust")) {
    suggestions.push(rustPatternsTemplate);
  }

  // Check for microservices
  if (analysis.projectType.toLowerCase().includes("monorepo") || 
      analysis.projectType.toLowerCase().includes("microservice")) {
    suggestions.push(microservicesTemplate);
  }

  return suggestions;
}

