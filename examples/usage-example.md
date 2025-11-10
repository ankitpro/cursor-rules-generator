# Usage Examples

This document provides practical examples of using the Cursor Rules Generator MCP Server.

## Example 1: Basic Analysis

**User:** "Analyze my React project"

**Cursor (using MCP):**
```json
{
  "tool": "analyze_project",
  "arguments": {
    "projectPath": "/Users/me/projects/my-react-app"
  }
}
```

**Result:**
- Detected: React 18.2.0, TypeScript 5.0, Vite
- Code Patterns: 85% camelCase consistency, 60% JSDoc coverage
- Git Workflow: Gitflow with conventional commits
- Testing: Jest + React Testing Library

## Example 2: Generate Best Practices Rules

**User:** "Generate cursor rules with best practices for my project"

**Cursor:**
```json
{
  "tool": "generate_cursor_rules",
  "arguments": {
    "projectPath": "/Users/me/projects/my-react-app",
    "approach": "best_practices"
  }
}
```

**Generated Files:**
```
my-react-app/
├── .cursorrules
└── .cursor/
    ├── rules/
    │   ├── architecture.md
    │   ├── code-style.md
    │   ├── git-workflow.md
    │   ├── testing.md
    │   └── security.md
    ├── prompts/              # Modular role system
    │   ├── README.md
    │   ├── documentation-writer.md
    │   ├── frontend-developer.md
    │   ├── backend-developer.md
    │   ├── software-architect.md
    │   ├── code-reviewer.md
    │   ├── qa-engineer.md
    │   ├── security-analyst.md
    │   ├── performance-engineer.md
    │   └── database-administrator.md
    └── quick-reference.md
```

## Example 3: Using Prompts

**User:** "Let's set up cursor rules for my new project"

**Cursor:** "I'll use the generate-cursor-rules prompt. What's your project path?"

**User:** "/Users/me/projects/new-api"

**Cursor (uses prompt):**
1. Analyzes project at /Users/me/projects/new-api
2. Presents analysis report
3. Asks: "Choose approach: A) Current patterns, B) Best practices, C) Hybrid"

**User:** "B"

**Cursor:**
- Generates 8 cursor rules files
- Reports success
- Suggests: "Review and commit the files"

## Example 4: Python FastAPI Project

**User:** "Analyze my FastAPI backend"

**Analysis Result:**
```json
{
  "languages": ["Python"],
  "frameworks": {
    "fastapi": "0.104.1"
  },
  "database": ["PostgreSQL"],
  "testing": ["pytest"],
  "codePatterns": {
    "naming": {
      "functions": "snake_case",
      "consistency": 92
    },
    "documentation": {
      "hasDocstrings": true,
      "coverage": 75
    }
  }
}
```

**Generated Rules Include:**
- Python-specific naming conventions (snake_case)
- FastAPI async patterns
- Pydantic model validation
- pytest testing patterns
- Type hints requirements

## Example 5: Monorepo Project

**User:** "Generate rules for my monorepo"

**Analysis Detects:**
- Monorepo structure with `packages/` directory
- Multiple projects: frontend (React), backend (Express), shared libs
- Lerna configuration
- Shared ESLint and TypeScript configs

**Generated Rules:**
- Monorepo-specific organization patterns
- Shared vs. package-specific rules
- Cross-package dependencies
- Testing strategies for monorepos

## Example 6: Using Resources

**User:** "Show me the generator template"

**Cursor:**
```
Load resource: template://generator-template
```

**Result:**
- Full GENERATOR_TEMPLATE.md loaded
- User can review how cursor rules are generated
- Understand the analysis process

## Example 7: Custom Template Repository

**MCP Config:**
```json
{
  "mcpServers": {
    "cursor-rules-generator": {
      "command": "node",
      "args": ["/path/to/dist/index.js"],
      "env": {
        "TEMPLATE_REPO_URL": "https://github.com/myorg/my-custom-templates.git"
      }
    }
  }
}
```

**Result:**
- Uses your custom template repository
- Can have organization-specific standards
- Auto-updates from your repo

## Example 8: Multiple Projects Workflow

**Session 1 - Project A:**
```
User: "Generate rules for /Users/me/projects/project-a"
Cursor: [Generates rules for Project A]
```

**Session 2 - Project B (Same Day):**
```
User: "Generate rules for /Users/me/projects/project-b"
Cursor: [Generates rules for Project B]
```

**Benefits:**
- No need to copy generator folder
- Same configuration works for all projects
- Consistent rules across organization
- Templates auto-update from GitHub

## Example 9: Continuous Improvement

**Initial Setup:**
```
User: "Generate rules with current patterns"
Cursor: [Documents current state]
```

**6 Months Later:**
```
User: "Regenerate with best practices"
Cursor: [Analyzes improvements, applies best practices]
```

**Comparison:**
- See how code quality improved
- Identify remaining gaps
- Track consistency metrics

## Example 10: Team Onboarding

**New Team Member:**
```
User: "What are the coding standards for this project?"
Cursor: "Let me check the cursor rules..."

[Cursor reads .cursorrules and .cursor/rules/]

Cursor: "Here are the key standards:
- Functions: camelCase (85% consistency)
- Testing: Jest with React Testing Library
- Git: Conventional Commits
- See .cursor/quick-reference.md for commands"
```

**Generates Code Following Standards:**
```javascript
// Cursor automatically follows the detected patterns
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    logger.error('Failed to fetch user profile:', error);
    throw new AppError('Unable to fetch user profile');
  }
};
```

## Common Workflows

### Workflow 1: New Project Setup
1. Create project structure
2. Initialize git
3. Run: "Generate cursor rules with best practices"
4. Commit cursor rules
5. Start coding with standards in place

### Workflow 2: Existing Project Documentation
1. Run: "Analyze my project"
2. Review analysis report
3. Choose: Document current patterns
4. Review and refine generated rules
5. Commit and share with team

### Workflow 3: Standards Migration
1. Generate rules with current patterns (baseline)
2. Identify areas to improve
3. Gradually refactor code
4. Regenerate with best practices
5. Compare before/after

## Tips for Best Results

1. **Always use absolute paths**: `/Users/me/projects/app` not `~/projects/app`
2. **Review analysis first**: Check if detection is accurate
3. **Choose approach carefully**: 
   - Current patterns = documentation
   - Best practices = improvement roadmap
4. **Customize after generation**: Edit files to match team preferences
5. **Keep templates updated**: MCP server auto-updates from GitHub

## Troubleshooting Examples

### Issue: Wrong language detected
```
User: "It detected JavaScript but we use TypeScript"
Solution: Check if tsconfig.json exists, or specify in package.json
```

### Issue: Missing framework
```
User: "Didn't detect Next.js"
Solution: Ensure "next" is in package.json dependencies
```

### Issue: Test files not found
```
User: "Shows 0 test files but we have tests"
Solution: Check test file naming (.test.js, .spec.js, etc.)
```

---

**More Examples?** Check the [MCP_SETUP.md](../MCP_SETUP.md) for detailed configuration examples.

