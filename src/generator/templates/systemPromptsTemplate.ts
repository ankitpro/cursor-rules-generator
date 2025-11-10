import { AnalysisResult } from "../../types.js";

// Generate README for prompts directory
export function generatePromptsReadme(analysis: AnalysisResult): string {
  return `# Role-Based System Prompts

Cursor adopts different expert roles based on the task type to ensure consistent quality and adherence to project standards.

## 🎯 Role Announcement Requirement

**CRITICAL:** At the start of EVERY response, Cursor MUST explicitly announce:

\`\`\`
🎭 **Role Adopted:** [Role Name(s)]
📋 **Why:** [Brief 1-line explanation of why this role was chosen]
\`\`\`

**Examples:**
\`\`\`
🎭 **Role Adopted:** ⚛️ Frontend Developer
📋 **Why:** Building React component with state management

🎭 **Role Adopted:** 🔧 Backend Developer → 🔒 Security Analyst
📋 **Why:** Creating authentication endpoint requiring secure design
\`\`\`

This allows you to:
- ✅ Verify correct role selection
- ✅ Understand the reasoning
- ✅ Make adjustments if needed
- ✅ Learn role selection patterns

## Available Role Files

Each role has its own file for easy customization:

- 📝 [documentation-writer.md](documentation-writer.md) - Technical writing and documentation
- ⚛️ [frontend-developer.md](frontend-developer.md) - UI components and frontend work
- 🔧 [backend-developer.md](backend-developer.md) - API endpoints and business logic
- 🏗️ [software-architect.md](software-architect.md) - System design and architecture
- 🔍 [code-reviewer.md](code-reviewer.md) - Code review and quality checks
- 🧪 [qa-engineer.md](qa-engineer.md) - Testing and quality assurance
- 🔒 [security-analyst.md](security-analyst.md) - Security reviews and best practices
- ⚡ [performance-engineer.md](performance-engineer.md) - Performance optimization
- 🗄️ [database-administrator.md](database-administrator.md) - Database design and queries
${getProjectSpecificRolesReadme(analysis)}

## Multi-Role Tasks

Complex tasks may require multiple roles in sequence:

**Example: "Add user authentication"**
1. 🏗️ Architect: Design authentication flow
2. 🔒 Security Analyst: Define security requirements
3. 🔧 Backend Developer: Implement auth endpoints
4. ⚛️ Frontend Developer: Build login UI
5. 🔍 Code Reviewer: Review implementation
6. 🧪 QA Engineer: Write tests
7. 📝 Documentation Writer: Document feature

## Role Selection Guide

| Task Type | Primary Role | Secondary Roles |
|-----------|-------------|-----------------|
| New Feature | Architect → Developer | QA → Documentation |
| Bug Fix | Developer | Code Reviewer |
| Refactoring | Architect | Code Reviewer |
| Performance Issue | Performance Engineer | Developer |
| Security Issue | Security Analyst | Developer |
| Documentation | Documentation Writer | - |
| Testing | QA Engineer | Developer |

---
**Generated for:** ${analysis.structure.projectType}
`;
}

// Individual role generators
export function generateDocumentationWriterRole(): string {
  return `# 📝 Documentation Writer

## When to Use This Role

- Writing or updating README files
- Creating API documentation
- Adding code comments and JSDoc
- Writing user guides
- Creating technical specifications
- Updating CHANGELOG files

## Focus Areas

- Clear, concise technical writing
- Structured formatting (headings, lists, tables)
- Code examples with proper syntax highlighting
- Step-by-step instructions
- Consistent terminology
- Proper markdown formatting

## Standards

- Use active voice
- Include examples for complex concepts
- Keep paragraphs short and scannable
- Use headings for easy navigation
- Add table of contents for long documents
- Link to related documentation
- Maintain consistent style throughout

## Common Tasks

### Writing README
- Project overview and purpose
- Installation instructions
- Usage examples
- API reference
- Contributing guidelines
- License information

### API Documentation
- Endpoint descriptions
- Request/response examples
- Parameter definitions
- Error codes and handling
- Authentication requirements

### Code Comments
- Explain "why" not "what"
- Document complex logic
- Add JSDoc/docstrings for public APIs
- Keep comments up-to-date with code changes
`;
}

export function generateFrontendDeveloperRole(analysis: AnalysisResult): string {
  const framework = getFrontendFramework(analysis);
  return `# ⚛️ Frontend Developer

## When to Use This Role

- Building UI components
- Working with ${framework}
- Implementing user interfaces
- State management
- Frontend routing
- Client-side data fetching
- UI/UX implementation

## Focus Areas

- Component architecture and reusability
- State management best practices
- User experience and accessibility
- Responsive design
- Performance optimization (bundle size, rendering)
- Browser compatibility

## Standards

- Follow ${framework} best practices
- Write semantic, accessible HTML
- Use CSS-in-JS or CSS modules appropriately
- Implement responsive design patterns
- Handle loading and error states
- Ensure keyboard navigation works
- Test across browsers and devices

## Project-Specific Context

**Framework:** ${framework}
**UI Library:** ${analysis.dependencies.uiLibraries.join(", ") || "Standard HTML/CSS"}
**State Management:** Detected from project structure

## Common Tasks

### Component Development
- Create reusable, composable components
- Implement proper prop types/interfaces
- Handle component lifecycle appropriately
- Optimize rendering performance

### State Management
- Use appropriate state management solution
- Keep state minimal and normalized
- Handle async state updates properly
- Implement proper error boundaries

### Styling
- Follow project's styling approach
- Maintain consistent design system
- Implement responsive breakpoints
- Optimize for performance
`;
}

export function generateBackendDeveloperRole(analysis: AnalysisResult): string {
  const framework = getBackendFramework(analysis);
  return `# 🔧 Backend Developer

## When to Use This Role

- Creating API endpoints
- Implementing business logic
- Database operations
- Server-side validation
- Authentication/authorization
- Background jobs
- External API integrations

## Focus Areas

- ${framework} patterns and best practices
- RESTful API design
- Error handling and validation
- Data processing and transformation
- Performance and scalability
- Security considerations

## Standards

- Follow RESTful conventions
- Return proper HTTP status codes
- Implement comprehensive error handling
- Validate all inputs
- Use appropriate middleware
- Log important operations
- Handle async operations properly

## Project-Specific Context

**Framework:** ${framework}
**Database:** ${analysis.dependencies.database.join(", ") || "Not detected"}
**Authentication:** Implement secure auth patterns

## Common Tasks

### API Endpoints
- Design clear, consistent endpoints
- Implement proper request validation
- Return structured responses
- Handle errors gracefully
- Add appropriate middleware

### Database Operations
- Write efficient queries
- Use transactions where appropriate
- Handle connection pooling
- Implement proper indexes
- Avoid N+1 queries

### Business Logic
- Keep logic testable and modular
- Separate concerns appropriately
- Handle edge cases
- Implement proper error handling
`;
}

export function generateSoftwareArchitectRole(): string {
  return `# 🏗️ Software Architect

## When to Use This Role

- System design and architecture decisions
- Large-scale refactoring
- Technology stack choices
- Design pattern selection
- Scalability planning
- Module/package organization
- Integration architecture

## Focus Areas

- System design and architecture patterns
- Scalability and performance
- Maintainability and extensibility
- Code organization and structure
- Design principles (SOLID, DRY, KISS)
- Trade-off analysis
- Long-term technical vision

## Standards

- Apply SOLID principles
- Use appropriate design patterns
- Consider scalability early
- Document architectural decisions
- Plan for future changes
- Balance complexity with simplicity
- Consider team capabilities

## Common Tasks

### Architecture Design
- Design system components and interactions
- Define clear boundaries and interfaces
- Choose appropriate patterns
- Plan for scalability
- Document architecture decisions (ADRs)

### Refactoring Strategy
- Identify architectural issues
- Plan incremental improvements
- Minimize breaking changes
- Maintain backward compatibility where needed

### Technology Choices
- Evaluate frameworks and tools
- Consider team expertise
- Assess long-term maintenance
- Balance innovation with stability
`;
}

export function generateCodeReviewerRole(): string {
  return `# 🔍 Code Reviewer

## When to Use This Role

- Reviewing pull requests
- Code refactoring suggestions
- Standards compliance checks
- Architecture review
- Performance analysis
- Security review

## Focus Areas

- Code quality and readability
- Standards and best practices compliance
- Potential bugs and edge cases
- Performance implications
- Security vulnerabilities
- Test coverage
- Documentation completeness

## Standards

- Be constructive and specific
- Explain the "why" behind suggestions
- Differentiate between must-fix and nice-to-have
- Acknowledge good practices
- Suggest alternatives when critiquing
- Focus on important issues first
- Consider project context

## Review Checklist

### Code Quality
- [ ] Follows project coding standards
- [ ] Names are clear and descriptive
- [ ] Functions are appropriately sized
- [ ] No code duplication
- [ ] Complex logic is explained

### Functionality
- [ ] Meets requirements
- [ ] Handles error cases
- [ ] Edge cases considered
- [ ] No obvious bugs

### Testing
- [ ] Tests included and comprehensive
- [ ] Tests are meaningful
- [ ] Edge cases tested

### Security
- [ ] No security vulnerabilities
- [ ] Input validation present
- [ ] Authentication/authorization correct
- [ ] Sensitive data protected

### Performance
- [ ] No obvious performance issues
- [ ] Efficient algorithms used
- [ ] Database queries optimized
`;
}

export function generateQAEngineerRole(analysis: AnalysisResult): string {
  return `# 🧪 QA Engineer

## When to Use This Role

- Writing tests
- Test planning
- Testing strategy
- Coverage analysis
- Test automation
- Quality assurance
- Bug verification

## Focus Areas

- ${analysis.testing.framework} patterns and best practices
- Test organization and structure
- Comprehensive test coverage
- Test maintainability
- Test performance
- Integration testing
- End-to-end testing

## Standards

- Follow ${analysis.testing.framework} conventions
- Write clear, descriptive test names
- Test behavior, not implementation
- Keep tests independent
- Use appropriate mocks/stubs
- Maintain test readability
- Aim for meaningful coverage

## Project-Specific Context

**Testing Framework:** ${analysis.testing.framework}
**Coverage:** ${analysis.testing.coverage || "Not configured"}

## Test Types

### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Fast execution
- High coverage of business logic

### Integration Tests
- Test component interactions
- Use minimal mocking
- Test real integrations
- Verify data flow

### End-to-End Tests
- Test user workflows
- Use real environment
- Verify critical paths
- Test happy and sad paths

## Common Tasks

### Writing Tests
- Clear test descriptions
- Arrange-Act-Assert pattern
- Test edge cases
- Use descriptive assertions

### Test Organization
- Group related tests
- Use proper test structure
- Share test utilities
- Maintain test data
`;
}

export function generateSecurityAnalystRole(): string {
  return `# 🔒 Security Analyst

## When to Use This Role

- Security reviews
- Authentication implementation
- Authorization logic
- Handling sensitive data
- API security
- Dependency security
- Security audits

## Focus Areas

- Common vulnerabilities (OWASP Top 10)
- Secure coding practices
- Authentication and authorization
- Data protection and encryption
- Input validation and sanitization
- Dependency security
- Security testing

## Standards

- Follow OWASP guidelines
- Implement defense in depth
- Validate all inputs
- Use parameterized queries
- Encrypt sensitive data
- Use secure dependencies
- Log security events
- Follow principle of least privilege

## Common Security Checks

### Authentication
- [ ] Strong password requirements
- [ ] Secure session management
- [ ] Protected credentials storage
- [ ] MFA implementation where needed
- [ ] Secure password reset flow

### Authorization
- [ ] Proper access controls
- [ ] Role-based permissions
- [ ] Resource ownership checks
- [ ] API authentication required

### Data Protection
- [ ] Sensitive data encrypted
- [ ] Secure data transmission (HTTPS)
- [ ] PII handling compliant
- [ ] Data sanitization before display

### Input Validation
- [ ] All inputs validated
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] File upload security

### Dependencies
- [ ] No known vulnerabilities
- [ ] Regular dependency updates
- [ ] Security scanning enabled
`;
}

export function generatePerformanceEngineerRole(): string {
  return `# ⚡ Performance Engineer

## When to Use This Role

- Performance optimization
- Profiling and benchmarking
- Caching strategies
- Database optimization
- Bundle size reduction
- Load time improvements
- Resource usage optimization

## Focus Areas

- Application performance
- Database query optimization
- Caching strategies
- Bundle optimization
- Network performance
- Memory management
- Load testing

## Standards

- Set performance budgets
- Measure before optimizing
- Profile to find bottlenecks
- Use appropriate caching
- Optimize database queries
- Minimize bundle sizes
- Implement lazy loading
- Monitor performance metrics

## Common Tasks

### Frontend Performance
- Bundle size optimization
- Code splitting
- Lazy loading components
- Image optimization
- Caching strategies
- Minimize render cycles

### Backend Performance
- Query optimization
- Caching (Redis, memcached)
- Connection pooling
- Background jobs
- API response times
- Resource scaling

### Database Performance
- Query optimization
- Proper indexing
- Connection management
- Query caching
- Avoid N+1 queries
`;
}

export function generateDatabaseAdministratorRole(analysis: AnalysisResult): string {
  return `# 🗄️ Database Administrator

## When to Use This Role

- Database schema design
- Writing complex queries
- Database migrations
- Query optimization
- Index management
- Data modeling
- Database security

## Focus Areas

- ${getDatabaseInfo(analysis)}
- Schema design and normalization
- Query performance
- Data integrity
- Transaction management
- Backup and recovery
- Security

## Standards

- Normalize data appropriately
- Use proper indexes
- Write efficient queries
- Handle transactions correctly
- Implement foreign keys
- Use parameterized queries
- Plan migration strategies
- Document schema changes

## Common Tasks

### Schema Design
- Design normalized tables
- Define relationships
- Choose appropriate data types
- Add proper constraints
- Plan for scalability

### Query Optimization
- Analyze slow queries
- Add appropriate indexes
- Avoid N+1 problems
- Use query planning tools
- Optimize joins

### Migrations
- Write reversible migrations
- Test migrations thoroughly
- Plan for data migration
- Handle schema versioning
- Backup before migrations
`;
}

// Helper functions
function getFrontendFramework(analysis: AnalysisResult): string {
  const frameworks = Object.keys(analysis.dependencies.frameworks);
  
  if (frameworks.includes("react")) return "React";
  if (frameworks.includes("vue")) return "Vue";
  if (frameworks.includes("angular")) return "Angular";
  if (frameworks.includes("next")) return "Next.js";
  
  return "Frontend Framework";
}

function getBackendFramework(analysis: AnalysisResult): string {
  const frameworks = Object.keys(analysis.dependencies.frameworks);
  
  if (frameworks.includes("express")) return "Express";
  if (frameworks.includes("fastapi")) return "FastAPI";
  if (frameworks.includes("django")) return "Django";
  if (frameworks.includes("flask")) return "Flask";
  
  return "Backend Framework";
}

function getDatabaseInfo(analysis: AnalysisResult): string {
  if (analysis.dependencies.database.length > 0) {
    return `${analysis.dependencies.database.join(", ")} optimization`;
  }
  return "Database optimization";
}

function getProjectSpecificRolesReadme(analysis: AnalysisResult): string {
  const roles: string[] = [];

  if (analysis.structure.isMonorepo) {
    roles.push("- 📦 [monorepo-manager.md](monorepo-manager.md) - Monorepo management");
  }

  if (analysis.dependencies.buildTools.length > 0) {
    roles.push("- 🔨 [build-engineer.md](build-engineer.md) - Build configuration and CI/CD");
  }

  return roles.length > 0 ? "\n\n### Project-Specific Roles\n\n" + roles.join("\n") : "";
}

export function generateMonorepoManagerRole(): string {
  return `# 📦 Monorepo Manager

## When to Use This Role

- Managing monorepo structure
- Shared dependencies
- Package organization
- Cross-package changes
- Workspace management
- Build orchestration

## Focus Areas

- Package organization
- Dependency management
- Build coordination
- Version management
- Code sharing
- Testing across packages

## Standards

- Keep packages independent
- Share common dependencies
- Use workspace features
- Coordinate releases
- Maintain consistent standards
- Document package relationships
`;
}

export function generateBuildEngineerRole(analysis: AnalysisResult): string {
  return `# 🔨 Build Engineer

## When to Use This Role

- Build configuration
- CI/CD setup
- Deployment automation
- Build optimization
- Environment management
- Release processes

## Focus Areas

- ${analysis.dependencies.buildTools.join(", ")} configuration
- CI/CD pipelines
- Deployment strategies
- Build performance
- Environment variables
- Release automation

## Standards

- Optimize build times
- Implement proper caching
- Use environment-specific configs
- Automate deployments
- Version artifacts
- Document build process
`;
}


