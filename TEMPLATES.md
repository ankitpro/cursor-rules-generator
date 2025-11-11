# Template Library

**14 Pre-Built Templates for Popular Tech Stacks**

Inspired by [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) community

---

## 🎨 What Are Templates?

Templates are pre-built cursor rules for popular tech stacks that provide:
- **Best practices** from the community
- **Framework-specific** patterns and conventions
- **Quick start** foundation for your project
- **Smart merging** with your actual codebase analysis

## 🔄 How Templates Work

1. **Choose a template** (optional) - Browse or get suggestions
2. **Analysis runs** - We scan your actual codebase
3. **Smart merge** - Template best practices + your project patterns
4. **Result** - Customized cursor rules for YOUR project

### Merge Strategies

- **`template-first`**: Use template as base, add analysis insights as comments
- **`analysis-first`**: Use analysis as base, add template best practices as enhancements
- **`balanced`** (default): Merge both with equal weight

---

## 📚 Available Templates

### Frameworks (6 templates)

#### ⚛️ React + TypeScript + Tailwind
**ID:** `react-typescript-tailwind`

Modern React development with TypeScript strict mode and Tailwind CSS.

**Includes:**
- Component patterns and structure
- TypeScript best practices
- Tailwind CSS organization
- Custom hooks patterns
- Performance optimization (memo, useMemo, useCallback)
- Testing with React Testing Library

**When to use:**
- React projects with TypeScript
- Frontend applications using Tailwind
- Component-heavy SPAs

---

#### ⚡ Next.js App Router
**ID:** `nextjs-app-router`

Next.js 14+ with App Router, Server Components, and modern patterns.

**Includes:**
- Server Components patterns
- Client Components when needed
- Server Actions
- Data fetching strategies
- Route handlers and API routes
- Metadata API
- Loading and error states
- Caching strategies

**When to use:**
- Next.js 13+ projects
- Full-stack React applications
- SEO-focused web apps

---

#### 🐍 Python FastAPI
**ID:** `fastapi-async`

Modern async Python API development with FastAPI and type hints.

**Includes:**
- Async/await patterns
- Pydantic models for validation
- Type hints everywhere
- Dependency injection
- API endpoint patterns
- Error handling
- Testing with pytest

**When to use:**
- Python API projects
- Async backend services
- Type-safe Python applications

---

#### 🌐 Django REST Framework
**ID:** `django-rest-framework`

Django REST Framework best practices for building robust APIs.

**Includes:**
- Serializers patterns
- ViewSets and routers
- Custom actions
- Permission classes
- Authentication patterns
- Testing strategies

**When to use:**
- Django projects
- REST API development
- Python web applications

---

#### 💚 Vue 3 + TypeScript
**ID:** `vue3-typescript`

Vue 3 Composition API with TypeScript and best practices.

**Includes:**
- Composition API patterns
- Script setup syntax
- TypeScript integration
- Composables for reusable logic
- Pinia state management
- Component patterns

**When to use:**
- Vue 3 projects
- TypeScript + Vue
- Modern Vue applications

---

#### 🚀 Express + TypeScript
**ID:** `express-typescript`

Type-safe Express.js API development with TypeScript.

**Includes:**
- Type-safe request handlers
- Middleware patterns
- Error handling middleware
- Router organization
- Dependency injection
- API structure

**When to use:**
- Node.js API projects
- Express applications
- Type-safe backend development

---

### Full Stacks (2 templates)

#### 🎯 Full-Stack TypeScript
**ID:** `full-stack-typescript`

End-to-end TypeScript with shared types between frontend and backend.

**Includes:**
- Monorepo structure
- Shared types package
- Type-safe API contracts
- Frontend + Backend patterns
- Workspace configuration
- End-to-end type safety

**When to use:**
- Monorepo projects
- Full-stack TypeScript applications
- Projects with shared types

---

#### 🏗️ Microservices Architecture
**ID:** `microservices-architecture`

Microservices patterns, API contracts, and distributed systems.

**Includes:**
- Service independence patterns
- API Gateway patterns
- Circuit breaker
- Event-driven communication
- Service discovery
- Observability patterns
- Health checks

**When to use:**
- Microservices projects
- Distributed systems
- Service-oriented architecture

---

### Languages (2 templates)

#### 🐍 Python Best Practices
**ID:** `python-best-practices`

Python development following PEP 8, type hints, and modern patterns.

**Includes:**
- PEP 8 compliance
- Type hints for all functions
- Docstrings patterns
- Function and class patterns
- Error handling
- Context managers
- Testing with pytest

**When to use:**
- General Python projects
- Python libraries
- Script development

---

#### 🦀 Rust Patterns
**ID:** `rust-patterns`

Idiomatic Rust with ownership patterns and best practices.

**Includes:**
- Ownership and borrowing patterns
- Error handling with Result
- Struct and trait patterns
- Lifetime management
- Memory safety patterns
- Testing conventions

**When to use:**
- Rust projects
- Systems programming
- Performance-critical applications

---

### DevOps & Cloud (4 templates)

#### 🔧 Terraform + AWS
**ID:** `terraform-aws-iac`

Infrastructure as Code with Terraform for AWS deployments.

**Includes:**
- Module patterns
- State management (S3 + DynamoDB)
- Version constraints
- Variable validation
- Data sources
- Locals for DRY
- IAM best practices
- Resource tagging

**When to use:**
- AWS infrastructure projects
- Terraform IaC
- Multi-environment setups

---

#### ☸️ Kubernetes + Helm
**ID:** `kubernetes-helm`

Kubernetes deployments and Helm chart development.

**Includes:**
- Deployment patterns
- Service configurations
- Helm chart structure
- Resource limits
- Health checks (liveness/readiness)
- ConfigMaps and Secrets
- RBAC patterns
- NetworkPolicies

**When to use:**
- Kubernetes deployments
- Helm chart development
- Container orchestration

---

#### 🐳 Docker Compose
**ID:** `docker-compose-dev`

Multi-container development with Docker Compose.

**Includes:**
- Service definitions
- Volume management
- Network configuration
- Health checks
- Multi-stage Dockerfiles
- Development patterns
- Environment variables

**When to use:**
- Local development environments
- Multi-service applications
- Docker-based development

---

#### 🔄 GitHub Actions CI/CD
**ID:** `github-actions-cicd`

Continuous Integration and Deployment with GitHub Actions.

**Includes:**
- CI workflow patterns
- Deployment workflows
- Matrix testing
- Docker build and push
- Secret management
- Caching strategies
- Security scanning
- OIDC authentication

**When to use:**
- GitHub-hosted projects
- CI/CD automation
- Automated deployments

---

## 🚀 Usage Examples

### List All Templates

```
"List available templates"
```

**Response:**
```json
{
  "templates": [
    {
      "id": "react-typescript-tailwind",
      "name": "React + TypeScript + Tailwind CSS",
      "category": "framework",
      "tags": ["react", "typescript", "tailwind"]
    },
    // ... more templates
  ]
}
```

### Filter by Category

```
"List templates in the framework category"
```

### Filter by Tags

```
"Show me all templates with typescript tag"
```

### Get Suggestions Based on Analysis

```
1. "Analyze my project"
2. "Suggest templates for this project"
```

The MCP will analyze your codebase and recommend relevant templates.

### Generate with Template

```
"Generate cursor rules using the React TypeScript template"
```

Or with specific merge strategy:

```
"Generate rules with Next.js template using balanced merge strategy"
```

---

## 🎯 Merge Strategies Explained

### Template-First
**Best for:** New projects or when you want to strictly follow framework conventions

```
Template Content (100%)
├── Framework best practices
└── Your project insights (as comments/additions)
```

### Analysis-First
**Best for:** Existing projects with established patterns

```
Your Project Analysis (100%)
├── Detected patterns
└── Template recommendations (as enhancements)
```

### Balanced (Default)
**Best for:** Most projects

```
Merged Content (50/50)
├── Template best practices
└── Your project patterns
```

---

## 🤝 Contributing Templates

Want to add a template? We welcome contributions!

1. Create template file in `src/templates/library/`
2. Follow the Template interface
3. Add to registry in `src/templates/index.ts`
4. Update this documentation
5. Submit a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📖 Credits

Templates inspired by the amazing [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) community.

Special thanks to:
- PatrickJS and all contributors to awesome-cursorrules
- The Cursor IDE community
- Template contributors

---

## 👨‍💻 Maintainer

**Ankit Agarwal**  
📧 Email: ankitagarwalpro@gmail.com  
🐙 GitHub: https://github.com/ankitpro  
📦 NPM: https://www.npmjs.com/package/cursor-rules-generator-mcp

---

## ☕ Support This Project

Enjoying the templates? Consider supporting the project:

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/chillbaba)

---

**Built with ❤️ for the developer community**

