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
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

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
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

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
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

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
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

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
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

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
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

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
 * Generate nested rules for terraform directory
 */
export function generateTerraformNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Terraform-specific rules for infrastructure as code development
globs:
alwaysApply: false
---

# Terraform Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`terraform/\` directory.
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

## 🎯 Terraform Context

**Purpose:** Infrastructure as Code using Terraform

## 📋 File Structure

### Standard Terraform Layout
\`\`\`
terraform/
  main.tf              # Main configuration
  variables.tf         # Input variables
  outputs.tf           # Output values
  providers.tf         # Provider configurations
  terraform.tfvars     # Variable values
  modules/             # Reusable modules
    vpc/
    security-group/
  environments/
    dev/
    staging/
    prod/
\`\`\`

## 🏗️ Code Organization

### Resource Naming
- Use descriptive resource names: \`aws_instance.web_server\`
- Follow consistent naming patterns
- Use underscores for resource names
- Prefix with resource type when helpful

### Module Structure
\`\`\`hcl
module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr = var.vpc_cidr
  environment = var.environment
}
\`\`\`

## 📝 Best Practices

### Variables
- Define all variables with descriptions
- Set appropriate types (\`string\`, \`number\`, \`list\`, \`map\`)
- Provide default values when reasonable
- Use validation rules for critical variables

\`\`\`hcl
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}
\`\`\`

### State Management
- Use remote state backend (S3, Terraform Cloud)
- Enable state locking
- Use workspaces for environments
- Never commit \`.terraform\` or state files

### Security
- Store secrets in vault or parameter store
- Use data sources for sensitive values
- Enable encryption for state files
- Implement least privilege IAM policies

## 🔧 Terraform Commands

\`\`\`bash
terraform init       # Initialize working directory
terraform plan       # Preview changes
terraform apply      # Apply changes
terraform destroy    # Destroy infrastructure
terraform fmt        # Format code
terraform validate   # Validate configuration
\`\`\`

## 📖 Module Best Practices

1. **Single Responsibility:** Each module should have a clear purpose
2. **Input Validation:** Validate variables at module boundaries
3. **Output Values:** Export useful values for composition
4. **Documentation:** Include README.md in each module
5. **Versioning:** Version modules using git tags

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for packer directory
 */
export function generatePackerNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Packer-specific rules for image building automation
globs:
alwaysApply: false
---

# Packer Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`packer/\` directory.
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

## 🎯 Packer Context

**Purpose:** Automated machine image building

## 📋 File Structure

### Standard Packer Layout
\`\`\`
packer/
  templates/
    base-ubuntu.pkr.hcl
    web-server.pkr.hcl
  scripts/
    setup.sh
    install-deps.sh
  files/
    config.json
  variables/
    common.pkrvars.hcl
    aws.pkrvars.hcl
\`\`\`

## 🏗️ Template Structure

### HCL2 Format (Recommended)
\`\`\`hcl
packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "example" {
  ami_name      = "app-\${var.environment}-\${local.timestamp}"
  instance_type = var.instance_type
  region        = var.aws_region
  source_ami_filter {
    filters = {
      virtualization-type = "hvm"
      name               = "ubuntu/images/*ubuntu-focal-20.04-amd64-server-*"
    }
    most_recent = true
  }
}

build {
  sources = ["source.amazon-ebs.example"]
  
  provisioner "shell" {
    scripts = [
      "scripts/setup.sh",
      "scripts/install-deps.sh"
    ]
  }
}
\`\`\`

## 📝 Best Practices

### Variables
- Define all variables with descriptions and types
- Use variable files for environment-specific values
- Set sensitive variables via environment variables

### Provisioners
- Use shell scripts for complex provisioning
- Keep scripts idempotent
- Test scripts independently before packer build
- Use file provisioner for config files

### Image Naming
- Include timestamp or version in AMI names
- Use consistent naming convention
- Tag images with metadata (version, environment)

### Security
- Don't hardcode credentials
- Use IAM roles when building on AWS
- Minimize installed software
- Update and patch base images regularly

## 🔧 Packer Commands

\`\`\`bash
packer init .              # Initialize plugins
packer fmt .               # Format HCL files
packer validate .          # Validate template
packer build template.pkr.hcl  # Build image
\`\`\`

## 📖 Image Building Best Practices

1. **Base Images:** Start with minimal, secure base images
2. **Layering:** Build incrementally for faster iterations
3. **Testing:** Validate images before deployment
4. **Documentation:** Document installed software and configuration
5. **Versioning:** Tag images with semantic versions

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for kubernetes directory
 */
export function generateKubernetesNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Kubernetes-specific rules for container orchestration configurations
globs:
alwaysApply: false
---

# Kubernetes Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`kubernetes/\` or \`k8s/\` directory.
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

## 🎯 Kubernetes Context

**Purpose:** Container orchestration and deployment configurations

## 📋 File Structure

### Standard Kubernetes Layout
\`\`\`
kubernetes/
  base/
    deployment.yaml
    service.yaml
    configmap.yaml
    secret.yaml
  overlays/
    dev/
      kustomization.yaml
    staging/
      kustomization.yaml
    prod/
      kustomization.yaml
  helm/
    Chart.yaml
    values.yaml
    templates/
\`\`\`

## 🏗️ Resource Organization

### Deployment
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-name
  labels:
    app: app-name
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app-name
  template:
    metadata:
      labels:
        app: app-name
    spec:
      containers:
      - name: app
        image: app:v1.0.0
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
\`\`\`

## 📝 Best Practices

### Resource Naming
- Use lowercase with hyphens
- Include app name and component
- Be consistent across environments

### Labels and Selectors
- Add meaningful labels for organization
- Use recommended labels (app.kubernetes.io/*)
- Enable filtering and selection

### Resource Limits
- Always set resource requests and limits
- Right-size based on actual usage
- Use namespaces for isolation

### Security
- Don't run as root (use securityContext)
- Use network policies
- Implement RBAC
- Scan images for vulnerabilities
- Use secrets for sensitive data

### High Availability
- Set appropriate replica counts
- Use pod disruption budgets
- Configure readiness and liveness probes
- Use anti-affinity for pod distribution

## 🔧 Kubectl Commands

\`\`\`bash
kubectl apply -f deployment.yaml    # Apply configuration
kubectl get pods                     # List pods
kubectl describe pod <pod-name>     # Pod details
kubectl logs <pod-name>             # View logs
kubectl exec -it <pod-name> -- sh   # Shell into pod
\`\`\`

## 📖 Configuration Best Practices

1. **Kustomize:** Use for environment-specific configs
2. **Helm:** Use for templating and package management
3. **GitOps:** Store configs in version control
4. **Validation:** Validate YAML before applying
5. **Documentation:** Document custom configurations

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for ansible directory
 */
export function generateAnsibleNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Ansible-specific rules for configuration management and automation
globs:
alwaysApply: false
---

# Ansible Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`ansible/\` directory.
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

## 🎯 Ansible Context

**Purpose:** Configuration management and infrastructure automation

## 📋 File Structure

### Standard Ansible Layout
\`\`\`
ansible/
  inventories/
    dev/
      hosts.yml
    prod/
      hosts.yml
  playbooks/
    deploy.yml
    configure.yml
  roles/
    common/
      tasks/
      handlers/
      templates/
      files/
      vars/
      defaults/
    webserver/
  group_vars/
    all.yml
    webservers.yml
  host_vars/
  ansible.cfg
\`\`\`

## 🏗️ Playbook Structure

### Basic Playbook
\`\`\`yaml
---
- name: Configure web servers
  hosts: webservers
  become: yes
  
  vars:
    http_port: 80
    
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: yes
        
    - name: Start nginx service
      service:
        name: nginx
        state: started
        enabled: yes
\`\`\`

## 📝 Best Practices

### Task Naming
- Use descriptive task names
- Start with verb (Install, Configure, Ensure)
- Be specific about what the task does

### Idempotency
- Tasks should be safe to run multiple times
- Use appropriate modules (apt, yum, service)
- Check state before making changes

### Variables
- Use group_vars for group-specific variables
- Use host_vars for host-specific variables
- Define defaults in roles/defaults/main.yml
- Use vault for sensitive data

### Role Structure
- Keep roles focused and reusable
- Document role purpose and variables
- Use role dependencies appropriately
- Test roles independently

### Security
- Use ansible-vault for secrets
- Don't commit unencrypted credentials
- Use become judiciously
- Implement least privilege

## 🔧 Ansible Commands

\`\`\`bash
ansible-playbook playbook.yml              # Run playbook
ansible-playbook playbook.yml --check      # Dry run
ansible-playbook playbook.yml --tags web   # Run specific tags
ansible-inventory --list                    # List inventory
ansible-vault encrypt vars.yml             # Encrypt file
ansible-vault edit vars.yml                # Edit encrypted file
\`\`\`

## 📖 Playbook Best Practices

1. **Tags:** Use tags for selective execution
2. **Handlers:** Use for service restarts and notifications
3. **Templates:** Use Jinja2 templates for config files
4. **Testing:** Test playbooks in dev before prod
5. **Documentation:** Document playbook purpose and variables

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for docker directory
 */
export function generateDockerNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Docker-specific rules for containerization
globs:
alwaysApply: false
---

# Docker Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`docker/\` directory.
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

## 🎯 Docker Context

**Purpose:** Container image building and orchestration

## 📋 File Structure

### Standard Docker Layout
\`\`\`
docker/
  Dockerfile
  Dockerfile.dev
  Dockerfile.prod
  .dockerignore
  docker-compose.yml
  docker-compose.dev.yml
  docker-compose.prod.yml
  nginx/
    nginx.conf
  scripts/
    entrypoint.sh
\`\`\`

## 🏗️ Dockerfile Best Practices

### Multi-stage Build
\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## 📝 Best Practices

### Image Optimization
- Use multi-stage builds to reduce size
- Use specific base image versions
- Minimize layers by combining RUN commands
- Use .dockerignore to exclude unnecessary files

### Security
- Don't run as root user
- Use non-root USER instruction
- Scan images for vulnerabilities
- Keep base images updated
- Don't include secrets in images

### Layer Caching
- Order instructions from least to most frequently changing
- Copy package files before source code
- Leverage build cache effectively

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
\`\`\`

## 🔧 Docker Commands

\`\`\`bash
docker build -t app:latest .           # Build image
docker run -p 3000:3000 app:latest     # Run container
docker-compose up                       # Start services
docker-compose down                     # Stop services
docker ps                               # List running containers
docker logs <container-id>             # View logs
docker exec -it <container-id> sh      # Shell into container
\`\`\`

## 📖 Container Best Practices

1. **Single Process:** One process per container
2. **Immutability:** Don't modify running containers
3. **Logs:** Write logs to stdout/stderr
4. **Health Checks:** Implement health check endpoints
5. **Graceful Shutdown:** Handle SIGTERM properly

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Generate nested rules for helm directory
 */
export function generateHelmNestedRules(
  analysis: AnalysisResult
): string {
  return `---
description: Helm-specific rules for Kubernetes package management
globs:
alwaysApply: false
---

# Helm Development Guidelines

> **📁 Nested Rules:** This file is automatically applied when working with files in the \`helm/\` directory.
> Learn more: https://cursor.com/docs/context/rules | Community rules: https://cursor.directory/rules

## 🎯 Helm Context

**Purpose:** Kubernetes application package management

## 📋 Chart Structure

### Standard Helm Chart Layout
\`\`\`
helm/
  my-app/
    Chart.yaml           # Chart metadata
    values.yaml          # Default values
    values-dev.yaml      # Dev environment values
    values-prod.yaml     # Prod environment values
    templates/
      deployment.yaml
      service.yaml
      ingress.yaml
      configmap.yaml
      secret.yaml
      _helpers.tpl       # Template helpers
      NOTES.txt          # Post-install notes
    charts/              # Chart dependencies
    .helmignore
\`\`\`

## 🏗️ Chart.yaml

\`\`\`yaml
apiVersion: v2
name: my-app
description: A Helm chart for my application
type: application
version: 1.0.0
appVersion: "1.0.0"

dependencies:
  - name: postgresql
    version: 11.x.x
    repository: https://charts.bitnami.com/bitnami
\`\`\`

## 📝 Template Best Practices

### Using Values
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "my-app.fullname" . }}
  labels:
    {{- include "my-app.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "my-app.selectorLabels" . | nindent 6 }}
  template:
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
        ports:
        - containerPort: {{ .Values.service.port }}
\`\`\`

### Helper Templates
\`\`\`yaml
{{/*
Expand the name of the chart.
*/}}
{{- define "my-app.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "my-app.labels" -}}
helm.sh/chart: {{ include "my-app.chart" . }}
{{ include "my-app.selectorLabels" . }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}
\`\`\`

## 🔧 Helm Commands

\`\`\`bash
helm create my-app                 # Create new chart
helm lint my-app/                  # Lint chart
helm template my-app/              # Render templates locally
helm install my-app ./my-app       # Install chart
helm upgrade my-app ./my-app       # Upgrade release
helm uninstall my-app              # Uninstall release
helm list                          # List releases
helm get values my-app             # Get values for release
\`\`\`

## 📖 Values Best Practices

### values.yaml Structure
\`\`\`yaml
# Default values for my-app
replicaCount: 1

image:
  repository: my-app
  pullPolicy: IfNotPresent
  tag: ""

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  className: ""
  annotations: {}
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 100
\`\`\`

## 📝 Best Practices

1. **Versioning:** Use semantic versioning for charts
2. **Values:** Provide sensible defaults
3. **Documentation:** Document all values in values.yaml
4. **Testing:** Use helm test for validation
5. **Dependencies:** Pin dependency versions
6. **Helpers:** Use helper templates for reusability
7. **Conditionals:** Use if statements for optional resources

---

**📚 Reference:** See main rules in \`.cursor/rules/\` for project-wide guidelines
`;
}

/**
 * Main function to generate nested rules based on type
 */
export function generateNestedRule(
  type: "frontend" | "backend" | "api" | "services" | "packages" | "apps" |
       "terraform" | "packer" | "kubernetes" | "ansible" | "docker" | "helm",
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
    case "terraform":
      return generateTerraformNestedRules(analysis);
    case "packer":
      return generatePackerNestedRules(analysis);
    case "kubernetes":
      return generateKubernetesNestedRules(analysis);
    case "ansible":
      return generateAnsibleNestedRules(analysis);
    case "docker":
      return generateDockerNestedRules(analysis);
    case "helm":
      return generateHelmNestedRules(analysis);
    default:
      return "";
  }
}

