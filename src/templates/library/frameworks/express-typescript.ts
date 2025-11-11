import { Template } from "../../types.js";

export const expressTypescriptTemplate: Template = {
  id: "express-typescript",
  name: "Express + TypeScript",
  description: "Type-safe Express.js API development with TypeScript",
  category: "framework",
  tags: ["nodejs", "express", "typescript", "api", "backend"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Express + TypeScript Project

## Tech Stack
- Node.js 18+
- Express 4+
- TypeScript
- Type-safe middleware

## Code Philosophy
- Type-safe request handlers
- Middleware composition
- Error handling middleware
- Dependency injection
`,
    codeStyleRules: `# Express TypeScript Code Style

## Router Pattern
\`\`\`typescript
import { Router, Request, Response, NextFunction } from 'express';

interface UserParams {
  id: string;
}

interface CreateUserBody {
  name: string;
  email: string;
}

const router = Router();

router.post(
  '/users',
  async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await createUser(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
\`\`\`

## Middleware Pattern
\`\`\`typescript
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    req.user = await verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
\`\`\`

## Error Handling
\`\`\`typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});
\`\`\`
`,
  },
};

export default expressTypescriptTemplate;

