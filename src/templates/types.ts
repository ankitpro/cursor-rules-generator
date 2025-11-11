export interface Template {
  id: string;
  name: string;
  description: string;
  category: "framework" | "language" | "stack" | "specialized";
  tags: string[];
  author?: string;
  sourceUrl?: string;
  content: {
    mainRules?: string;
    architectureRules?: string;
    codeStyleRules?: string;
    testingRules?: string;
    securityRules?: string;
    gitWorkflowRules?: string;
    promptRoles?: Record<string, string>;
  };
}

export interface TemplateSelectionOptions {
  templateId?: string;
  mergeStrategy: "template-first" | "analysis-first" | "balanced";
}

export interface TemplateFilter {
  category?: "framework" | "language" | "stack" | "specialized";
  tags?: string[];
}

