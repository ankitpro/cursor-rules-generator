import { AnalysisResult } from "../../types.js";

/**
 * Generate nested rules for frontend directory
 */
export function generateFrontendNestedRules(
  analysis: AnalysisResult,
  approach: "current_patterns" | "best_practices" | "hybrid"
): string {
  const frameworks = Object.keys(analysis.dependencies.frameworks).join(", ");
  const uiLibs = analysis.dependencies.uiLibraries.join(", ");
  
  return `---
description: Frontend-specific development rules for ${frameworks || "UI"} components and client-side code
globs:
alwaysApply: false
---

# Frontend Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`frontend/\` directory.
> Learn more: https://cursor.com/docs/context/rules

## 🎯 Frontend Context

${frameworks ? `**Framework:** ${frameworks}` : "**Type:** Frontend Application"}
${uiLibs ? `**UI Library:** ${uiLibs}` : ""}

## 🎨 Component Structure

### Component Organization
- **Naming:** Use PascalCase for component files (\`Button.tsx\`, \`UserProfile.vue\`)
- **File Structure:** One component per file
- **Index Files:** Use index files for cleaner imports

\`\`\`
components/
  Button/
    Button.tsx
    Button.test.tsx
    Button.styles.ts
    index.ts
\`\`\`

### Component Patterns
${approach === "current_patterns" ? `
- Follow existing component patterns found in the codebase
- Maintain consistency with current component structure
` : `
- Use functional components with hooks
- Separate business logic into custom hooks
- Keep components focused on presentation
- Extract complex logic into utility functions
`}

## 🔧 State Management

${analysis.dependencies.stateManagement.length > 0 ? `
**Current:** ${analysis.dependencies.stateManagement.join(", ")}

- Follow established state management patterns
- Keep state close to where it's used
- Use context for app-wide state
` : `
- Use React Context for global state
- Keep local state in components
- Consider adding state management as app grows
`}

## 🎨 Styling

${uiLibs ? `
**UI Library:** ${uiLibs}

- Use component library consistently
- Follow library's theming system
- Custom styles only when necessary
` : `
- Follow CSS/styling conventions in the project
- Use CSS Modules or styled-components for scoped styles
- Maintain consistent spacing and colors
`}

## 🧪 Testing

${analysis.testing.framework ? `
**Framework:** ${analysis.testing.framework}

- Test user interactions, not implementation
- Use React Testing Library patterns
- Test accessibility with screen readers
` : `
- Add tests for critical user flows
- Consider adding React Testing Library
- Test component rendering and interactions
`}

## 🚀 Performance

- Lazy load routes and heavy components
- Memoize expensive calculations
- Optimize images and assets
- Use code splitting effectively

## ♿ Accessibility

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

## 📖 Best Practices

1. **Props:** Define clear prop interfaces
2. **Events:** Use descriptive event handler names (\`handleSubmit\`, \`onUserClick\`)
3. **Hooks:** Follow hooks rules and dependencies
4. **Error Boundaries:** Wrap components to catch errors
5. **Loading States:** Show feedback during async operations

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for backend directory
 */
export function generateBackendNestedRules(
  analysis: AnalysisResult,
  approach: "current_patterns" | "best_practices" | "hybrid"
): string {
  const frameworks = Object.keys(analysis.dependencies.frameworks).join(", ");
  const databases = analysis.dependencies.database.join(", ");
  
  return `---
description: Backend-specific development rules for ${frameworks || "server-side"} logic and APIs
globs:
alwaysApply: false
---

# Backend Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`backend/\` directory.
> Learn more: https://cursor.com/docs/context/rules

## 🎯 Backend Context

${frameworks ? `**Framework:** ${frameworks}` : "**Type:** Backend API"}
${databases ? `**Database:** ${databases}` : ""}

## 🏗️ Architecture Patterns

### Service Layer
\`\`\`
routes/        # API routes
controllers/   # Request handlers
services/      # Business logic
models/        # Data models
middleware/    # Express middleware
utils/         # Utility functions
\`\`\`

### Separation of Concerns
${approach === "current_patterns" ? `
- Follow existing architectural patterns
- Maintain consistency with current structure
` : `
- **Controllers:** Handle HTTP requests/responses only
- **Services:** Contain business logic
- **Models:** Define data structure and validation
- **Middleware:** Handle cross-cutting concerns
`}

## 🔌 API Design

### RESTful Endpoints
\`\`\`
GET    /api/users       # List resources
GET    /api/users/:id   # Get single resource
POST   /api/users       # Create resource
PUT    /api/users/:id   # Update resource
DELETE /api/users/:id   # Delete resource
\`\`\`

### Request/Response
- **Validation:** Validate all inputs
- **Status Codes:** Use appropriate HTTP status codes
- **Error Format:** Consistent error response structure
- **Pagination:** Implement for list endpoints

## 🗄️ Database

${databases ? `
**Database:** ${databases}

### Query Patterns
- Use parameterized queries to prevent SQL injection
- Implement proper indexing
- Use transactions for multi-step operations
- Handle connection pooling
` : `
### General Guidelines
- Use parameterized queries
- Implement proper error handling
- Use migrations for schema changes
`}

## 🔒 Security

### Authentication & Authorization
- Validate authentication on protected routes
- Check user permissions before operations
- Use secure session management
- Hash sensitive data (passwords, tokens)

### Input Validation
- Sanitize all user inputs
- Validate data types and formats
- Check for SQL injection attempts
- Prevent XSS attacks

### Rate Limiting
- Implement rate limiting on public endpoints
- Protect against brute force attacks
- Monitor for suspicious activity

## ⚡ Performance

- **Caching:** Cache frequently accessed data
- **Database:** Optimize queries and use indexes
- **Async Operations:** Use async/await for I/O operations
- **Connection Pooling:** Reuse database connections

## 🧪 Testing

${analysis.testing.framework ? `
**Framework:** ${analysis.testing.framework}

- Unit test services and utilities
- Integration test API endpoints
- Mock external dependencies
- Test error handling paths
` : `
- Add unit tests for business logic
- Test API endpoints
- Mock database calls in tests
`}

## 📝 Logging & Monitoring

- Log errors with stack traces
- Log important operations (auth, payments)
- Use structured logging
- Monitor performance metrics
- Set up alerts for critical errors

## 📖 Best Practices

1. **Error Handling:** Catch and handle all errors gracefully
2. **Environment Variables:** Use for configuration
3. **Secrets:** Never commit secrets to version control
4. **API Versioning:** Version your API (\`/api/v1/\`)
5. **Documentation:** Document API endpoints

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for API directory
 */
export function generateApiNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: API-specific development rules for endpoint development and data handling
globs:
alwaysApply: false
---

# API Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`api/\` directory.
> Learn more: https://cursor.com/docs/context/rules

## 🎯 API Context

**Purpose:** RESTful or GraphQL API endpoints

## 📋 Endpoint Structure

### File Organization
\`\`\`
api/
  routes/        # Route definitions
  handlers/      # Request handlers
  validators/    # Input validation
  middleware/    # API middleware
  schemas/       # Request/response schemas
\`\`\`

## 🔌 REST API Patterns

### Standard CRUD Operations
\`\`\`typescript
GET    /api/resource       # List all
GET    /api/resource/:id   # Get one
POST   /api/resource       # Create
PUT    /api/resource/:id   # Update
PATCH  /api/resource/:id   # Partial update
DELETE /api/resource/:id   # Delete
\`\`\`

### Request Validation
- Validate all request parameters
- Validate request body structure
- Check required fields
- Validate data types

### Response Format
\`\`\`json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}
\`\`\`

### Error Format
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
\`\`\`

## 🔒 Security

- **Authentication:** Verify JWT/session on protected endpoints
- **Authorization:** Check user permissions
- **Rate Limiting:** Limit requests per IP/user
- **CORS:** Configure appropriate CORS headers

## 📖 Best Practices

1. Use consistent naming conventions
2. Version your API endpoints
3. Implement proper error handling
4. Return appropriate status codes
5. Document endpoints with OpenAPI/Swagger

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for services directory
 */
export function generateServicesNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Service layer rules for business logic and data processing
globs:
alwaysApply: false
---

# Services Layer Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`services/\` directory.
> Learn more: https://cursor.com/docs/context/rules

## 🎯 Services Context

**Purpose:** Business logic and data processing layer

## 🏗️ Service Structure

### Service Organization
\`\`\`
services/
  UserService.ts       # User-related business logic
  AuthService.ts       # Authentication logic
  EmailService.ts      # Email handling
  PaymentService.ts    # Payment processing
\`\`\`

### Service Class Pattern
\`\`\`typescript
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}

  async createUser(data: CreateUserDto) {
    // Business logic here
    // Validation, transformation, orchestration
  }
}
\`\`\`

## 📋 Service Responsibilities

- **Business Logic:** Implement business rules
- **Data Orchestration:** Coordinate between repositories
- **Validation:** Business-level validation
- **Error Handling:** Handle business errors
- **Transactions:** Manage multi-step operations

## 🔧 Best Practices

1. **Single Responsibility:** One service per domain entity
2. **Dependency Injection:** Inject dependencies via constructor
3. **Pure Logic:** Keep services independent of HTTP layer
4. **Async/Await:** Use async/await for I/O operations
5. **Error Handling:** Throw domain-specific errors

## 🧪 Testing

- Unit test all service methods
- Mock repository dependencies
- Test error scenarios
- Test edge cases

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for packages directory (monorepo)
 */
export function generatePackagesNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Package-specific rules for monorepo package development
globs:
alwaysApply: false
---

# Monorepo Package Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`packages/\` directory.
> Learn more: https://cursor.com/docs/context/rules

## 🎯 Package Context

**Architecture:** Monorepo with shared packages

## 📦 Package Structure

### Standard Package Layout
\`\`\`
packages/
  shared-types/
    src/
    package.json
    tsconfig.json
  ui-components/
    src/
    package.json
  utils/
    src/
    package.json
\`\`\`

## 🔧 Package Development

### Package.json Configuration
- Define clear \`name\` (scoped if needed)
- Specify \`main\` and \`types\` entry points
- List peer dependencies appropriately
- Use workspace protocol for internal deps

### Exports
- Export from index files
- Use named exports for clarity
- Document public API

### Versioning
- Follow semantic versioning
- Coordinate versions in monorepo
- Use changesets for version management

## 📖 Best Practices

1. **Independence:** Minimize cross-package dependencies
2. **API Stability:** Maintain backward compatibility
3. **Documentation:** Document package purpose and API
4. **Testing:** Test packages independently
5. **Build:** Ensure packages build before dependent packages

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for apps directory (monorepo)
 */
export function generateAppsNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Application-specific rules for monorepo applications
globs:
alwaysApply: false
---

# Monorepo Application Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`apps/\` directory.
> Learn more: https://cursor.com/docs/context/rules

## 🎯 Applications Context

**Architecture:** Monorepo with multiple applications

## 🏗️ Application Structure

### Standard App Layout
\`\`\`
apps/
  web/              # Web application
    src/
    public/
    package.json
  mobile/           # Mobile app
    src/
    package.json
  admin/            # Admin panel
    src/
    package.json
\`\`\`

## 📦 Shared Dependencies

### Using Workspace Packages
\`\`\`json
{
  "dependencies": {
    "@myorg/shared-types": "workspace:*",
    "@myorg/ui-components": "workspace:*"
  }
}
\`\`\`

### Best Practices
- Import from workspace packages
- Share types and utilities
- Avoid code duplication
- Coordinate versions

## 🚀 Deployment

- Each app can deploy independently
- Share build configuration where possible
- Use environment-specific configs
- Coordinate API versions

## 📖 Application Guidelines

1. **Independence:** Apps should be independently deployable
2. **Shared Code:** Use workspace packages for shared logic
3. **Configuration:** Environment-specific settings per app
4. **Testing:** Test apps independently
5. **Documentation:** Document app-specific features

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Main function to generate nested rules based on type
 */
export function generateNestedRule(
  type: "frontend" | "backend" | "api" | "services" | "packages" | "apps",
  analysis: AnalysisResult,
  approach: "current_patterns" | "best_practices" | "hybrid" = "best_practices"
): string {
  switch (type) {
    case "frontend":
      return generateFrontendNestedRules(analysis, approach);
    case "backend":
      return generateBackendNestedRules(analysis, approach);
    case "api":
      return generateApiNestedRules(analysis);
    case "services":
      return generateServicesNestedRules(analysis);
    case "packages":
      return generatePackagesNestedRules(analysis);
    case "apps":
      return generateAppsNestedRules(analysis);
    default:
      return "";
  }
}

