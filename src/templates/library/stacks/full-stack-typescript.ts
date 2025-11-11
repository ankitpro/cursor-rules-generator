import { Template } from "../../types.js";

export const fullStackTypescriptTemplate: Template = {
  id: "full-stack-typescript",
  name: "Full-Stack TypeScript",
  description: "End-to-end TypeScript with shared types between frontend and backend",
  category: "stack",
  tags: ["typescript", "fullstack", "react", "nodejs", "monorepo"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Full-Stack TypeScript Project

## Tech Stack
- Frontend: React + TypeScript
- Backend: Node.js + Express + TypeScript
- Shared: Common types and utilities
- Monorepo structure

## Code Philosophy
- Shared types across frontend/backend
- Type-safe API contracts
- DRY principles for common logic
- End-to-end type safety
`,
    
    codeStyleRules: `# Full-Stack TypeScript Code Style

## Project Structure
\`\`\`
packages/
├── frontend/          # React app
│   └── src/
├── backend/           # Express API
│   └── src/
└── shared/            # Shared types
    └── src/
        └── types/
            ├── user.ts
            └── api.ts
\`\`\`

## Shared Types
\`\`\`typescript
// packages/shared/src/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
}
\`\`\`

## Backend Usage
\`\`\`typescript
import { User, CreateUserDto } from '@shared/types';

app.post('/api/users', async (req: Request<{}, {}, CreateUserDto>, res) => {
  const user: User = await createUser(req.body);
  res.json(user);
});
\`\`\`

## Frontend Usage
\`\`\`typescript
import { User } from '@shared/types';

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}
\`\`\`

## API Type Safety
\`\`\`typescript
// shared/types/api.ts
export interface ApiEndpoints {
  '/api/users': {
    GET: { response: User[] };
    POST: { body: CreateUserDto; response: User };
  };
  '/api/users/:id': {
    GET: { params: { id: string }; response: User };
  };
}
\`\`\`
`,
    
    architectureRules: `# Full-Stack Architecture

## Monorepo Structure
- Use workspaces (npm/yarn/pnpm)
- Share dependencies where possible
- Independent build/deploy pipelines
- Shared ESLint/Prettier config

## API Contracts
- Define all API shapes in shared package
- Use TypeScript's satisfies operator
- Validate at runtime with Zod/io-ts

## Error Handling
- Shared error types
- Consistent error response format
- Type-safe error handling on frontend
`,
  },
};

export default fullStackTypescriptTemplate;

