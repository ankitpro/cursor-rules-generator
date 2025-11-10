# Cursor Rules Generator - Master Template

> **⚠️ CRITICAL FOR CURSOR AI:**
> 
> **This file should ONLY be used when explicitly attached and asked to generate cursor rules.**
> 
> **DO NOT reference this file during normal development work.**
> 
> ## 🏗️ MODULAR STRUCTURE REQUIREMENT
> 
> **You MUST generate a modular structure, NOT a single monolithic file:**
> 
> ```
> project-root/
> ├── .cursorrules              # Main entry point (lightweight, ~150 lines)
> └── .cursor/                  # Organized rules directory
>     ├── rules/                # Topic-specific detailed rules
>     ├── prompts/              # System prompts (role-based)
>     └── quick-reference.md    # Commands and patterns
> ```
> 
> **DO NOT create a single massive `.cursorrules` file.**
> 
> ## Generation Process
> 
> When asked to generate `.cursorrules`, follow these steps:
> 1. Analyze the user's project structure and tech stack (automated scanning)
> 2. Generate comprehensive analysis report
> 3. Wait for user choice (Option A/B/C)
> 4. Create `.cursor/` directory structure
> 5. Generate all detailed rule files
> 6. Generate main `.cursorrules` with references
> 7. After generation, DO NOT reference these files again unless explicitly asked

---

## 📋 Generation Instructions for Cursor

When a user asks you to generate `.cursorrules` using this template:

### Step 1: Automated Repository Analysis

**DO NOT ask the user for information. Discover everything automatically.**

#### 1.1 Scan Dependency Files

Search for and read these files to detect technologies:

```javascript
// Priority order for detection
const dependencyFiles = [
  'package.json',           // Node.js/JavaScript/TypeScript
  'requirements.txt',       // Python pip
  'Pipfile',               // Python pipenv
  'pyproject.toml',        // Python poetry
  'go.mod',                // Go
  'Cargo.toml',            // Rust
  'Gemfile',               // Ruby
  'pom.xml',               // Java Maven
  'build.gradle',          // Java/Kotlin Gradle
  'composer.json',         // PHP
  'pubspec.yaml',          // Dart/Flutter
  'mix.exs',               // Elixir
  'Package.swift',         // Swift
];
```

**Extract from dependencies:**
- Framework (React, Vue, Angular, Express, FastAPI, Django, Flask, etc.)
- UI libraries (Material-UI, Ant Design, Tailwind, Bootstrap, etc.)
- State management (Redux, Zustand, Pinia, NgRx, etc.)
- Testing frameworks (Jest, pytest, Mocha, RSpec, etc.)
- Database clients (pg, mongoose, sqlalchemy, etc.)
- Build tools (Vite, webpack, Rollup, Parcel, etc.)

#### 1.2 Analyze Project Structure

```javascript
// Scan directory structure
const commonStructures = {
  'src/components/': 'Component-based architecture',
  'src/pages/': 'Page-based routing',
  'src/services/': 'Service layer pattern',
  'src/utils/': 'Utility functions',
  'backend/': 'Backend separation',
  'frontend/': 'Frontend separation',
  'api/': 'API directory',
  'tests/': 'Separate test directory',
  '__tests__/': 'Jest test directory',
  'spec/': 'RSpec test directory',
};
```

**Detect:**
- Monorepo (lerna.json, pnpm-workspace.yaml, multiple package.json files)
- Frontend/backend split
- Microservices architecture
- Component organization patterns
- Test file locations (co-located vs. separate)

#### 1.3 Analyze Code Patterns

**Read 5-10 sample files from each major directory:**

```python
# For each file, detect:
patterns_to_detect = {
    'naming': {
        'functions': 'camelCase vs snake_case vs PascalCase',
        'variables': 'camelCase vs snake_case',
        'constants': 'UPPER_SNAKE_CASE vs others',
        'files': 'kebab-case vs snake_case vs PascalCase',
    },
    'error_handling': {
        'try_catch': 'Frequency and pattern',
        'error_classes': 'Custom Error classes',
        'error_messages': 'Detailed vs simple',
        'logging': 'console.log vs logger vs none',
    },
    'function_patterns': {
        'async_await': 'Usage frequency',
        'promises': 'Usage patterns',
        'arrow_functions': 'vs function declarations',
        'pure_functions': 'Functional programming usage',
    },
    'imports': {
        'style': 'Named vs default imports',
        'aliases': 'Path aliasing (@/, ~/, etc.)',
        'organization': 'Grouped vs individual',
    },
    'documentation': {
        'jsdoc': 'JSDoc usage',
        'docstrings': 'Python docstring usage',
        'comments': 'Inline comment frequency',
    },
}
```

#### 1.4 Analyze Git Workflow

```bash
# Run git commands to analyze:
git branch -a              # Detect branch structure
git log --oneline -20      # Detect commit message patterns
git tag                    # Detect versioning approach
```

**Detect:**
- Branch naming: `main/master`, `dev/develop`, `feature/*`, `bugfix/*`, `hotfix/*`
- Commit message format: Conventional commits, custom format, or ad-hoc
- Tag format: Semantic versioning, date-based, custom

#### 1.5 Analyze Environment Configuration

**Scan for:**
```javascript
const envFiles = [
  '.env.example',
  '.env.sample',
  '.env.template',
  'config.example.js',
  'docker-compose.yml',    // May contain env vars
];
```

**Extract:**
- Variable naming patterns (UPPER_CASE, camelCase)
- Required vs. optional variables
- Configuration structure
- Secrets management approach

#### 1.6 Detect Testing Setup

**Search for:**
- Test files: `*.test.js`, `*.spec.js`, `*_test.py`, `*_spec.rb`
- Test configuration: `jest.config.js`, `pytest.ini`, `.rspec`
- Coverage tools: `coverage/`, `.coveragerc`, `jest.config.js` coverage section

**Analyze test files to detect:**
- Testing patterns (unit vs. integration vs. e2e)
- Mock/stub usage
- Assertion styles
- Test organization

#### 1.7 Detect Special Integrations

**Scan for:**
- AI/LLM integrations (openai, anthropic, ollama packages)
- Cloud SDKs (@aws-sdk/*, @azure/*, @google-cloud/*)
- Real-time features (socket.io, pusher, supabase)
- Authentication libraries (passport, next-auth, etc.)

### Step 2: Generate Analysis Report

After completing Step 1, present a comprehensive analysis report to the user:

```markdown
🔍 **Repository Analysis Complete**

📦 **Detected Technologies:**
- Language: [Detected language(s) and versions]
- Framework: [Framework name and version]
- UI Library: [UI library if frontend]
- Database: [Database technology]
- Testing: [Test framework]
- Build Tool: [Build tool]

📁 **Project Structure:**
[For each aspect, use ✅ for good, ⚠️ for needs attention, ❌ for missing]

✅ Components organized in src/components/
⚠️ Services and utilities mixed in src/utils/
✅ Tests co-located with source files
❌ No API documentation found

📝 **Code Patterns Detected:**

**Naming Conventions:**
- Functions: [camelCase | snake_case | PascalCase] (consistency: X%)
- Variables: [detected pattern]
- Constants: [UPPER_SNAKE_CASE | other]
- Files: [kebab-case | snake_case | PascalCase]

**Error Handling:**
- Try-catch blocks: [X% of async functions]
- Error classes: [Custom errors | built-in only]
- Logging: [console | logger library | none]
- Error messages: [Detailed | Generic]

**Function Patterns:**
- Async/await: [Usage %]
- Arrow functions: [Usage %]
- Documentation: [JSDoc/docstrings in X% of functions]

**Import Patterns:**
- Style: [Named imports | Default imports | Mixed]
- Path aliases: [Yes: @/, ~/ | No]

🌳 **Git Workflow:**
- Branches detected: [list branches]
- Branch strategy: [Gitflow | GitHub Flow | Custom | None]
- Commit messages: [Conventional | Custom | Ad-hoc]
- Tags: [Semantic versioning | Date-based | None]

⚙️ **Environment Variables:**
Found X variables in [.env.example]:
- [List variable names without values]

🧪 **Testing Infrastructure:**
- Framework: [Jest | pytest | etc.]
- Test files: [X files found]
- Coverage: [Configured | Not configured]
- Test patterns: [Unit | Integration | E2E]

🔌 **Special Integrations:**
[Only if detected]
- AI/LLM: [OpenAI | Anthropic | Ollama | etc.]
- Cloud: [AWS | Azure | GCP]
- Real-time: [Socket.io | WebSocket | etc.]

---

📊 **Pattern Analysis: Current vs. Best Practices**

| Aspect | Your Pattern | Best Practice | Status |
|--------|--------------|---------------|--------|
| Naming | camelCase (inconsistent) | Consistent camelCase | ⚠️ Needs standardization |
| Error Handling | Basic try-catch | Try-catch + logging + user messages | ⚠️ Can improve |
| Documentation | 20% JSDoc coverage | 80%+ for public APIs | ❌ Needs work |
| Git Workflow | Ad-hoc branches | feature/*, bugfix/* convention | ⚠️ Can standardize |
| Commit Messages | Free-form | Conventional commits | ⚠️ Can standardize |
| File Organization | Mixed services/utils | Separate directories | ⚠️ Can improve |
| Testing | [Your pattern] | [Best practice] | [Status] |

---

💡 **Recommendations:**

**High Priority:**
1. [Specific recommendation based on findings]
2. [Specific recommendation based on findings]

**Medium Priority:**
3. [Specific recommendation based on findings]
4. [Specific recommendation based on findings]

**Low Priority:**
5. [Specific recommendation based on findings]

---

🎯 **Next Steps - Choose One:**

**Option A: Generate rules based on YOUR current patterns**
- Preserves your existing code style
- No changes to codebase required
- Good for: Teams with established patterns, legacy codebases

**Option B: Generate rules with BEST PRACTICES**
- Incorporates industry best practices
- May require gradual codebase updates
- Good for: New projects, teams wanting to improve

**Option C: Hybrid approach**
- Keep some current patterns, adopt some best practices
- I'll ask for your preference on each aspect

Please respond: A, B, or C
```

### Step 3: Generate .cursorrules Based on User Choice

After user selects option (A, B, or C), generate `.cursorrules` accordingly.

### Step 4: Select Appropriate Sections

Based on project type analysis, include relevant sections:

| Project Type | Include Sections |
|--------------|------------------|
| **Full-Stack Web** | Project Overview, Role System, Frontend Patterns, Backend Patterns, Git Workflow, Testing, Security |
| **Frontend Only** | Project Overview, Role System, Frontend Patterns, UI Components, Git Workflow, Testing |
| **Backend API** | Project Overview, Role System, Backend Patterns, API Design, Database, Git Workflow, Testing, Security |
| **Mobile App** | Project Overview, Role System, Mobile Patterns, State Management, Git Workflow, Testing |
| **Python/Data Science** | Project Overview, Role System, Python Patterns, Data Processing, Git Workflow, Testing |
| **DevOps/Infrastructure** | Project Overview, Role System, Infrastructure Patterns, CI/CD, Security, Deployment |

### Step 5: Adapt Templates Based on User Choice

#### If Option A (Current Patterns):
- Use detected naming conventions (even if inconsistent)
- Document existing error handling patterns
- Reflect actual file organization
- Use detected git workflow
- Include environment variables as found
- Document existing testing approach

#### If Option B (Best Practices):
- Apply industry-standard naming conventions
- Include comprehensive error handling patterns
- Suggest optimal file organization
- Recommend Gitflow or GitHub Flow
- Standardize commit messages (Conventional Commits)
- Add JSDoc/docstring requirements
- Include comprehensive testing patterns

#### If Option C (Hybrid):
Ask user for each category:
```
For Naming Conventions:
- Current: Mixed camelCase/snake_case
- Best Practice: Consistent camelCase for JS/TS
Choose: [Current | Best Practice | Custom]

For Error Handling:
- Current: Basic try-catch
- Best Practice: Try-catch + logging + user-friendly messages
Choose: [Current | Best Practice | Custom]

[Continue for each aspect...]
```

### Step 6: Generate Modular Cursor Rules Structure

**IMPORTANT:** Create a modular, organized structure instead of one massive file.

#### File Structure to Create:

```
project-root/
├── .cursorrules                          # Main entry point (create this)
└── .cursor/                              # Rules directory (create this)
    ├── rules/                            # Detailed rules (create this folder)
    │   ├── architecture.md               # Architecture patterns
    │   ├── code-style.md                 # Code style guidelines
    │   ├── git-workflow.md               # Git conventions
    │   ├── testing.md                    # Testing requirements
    │   ├── security.md                   # Security best practices
    │   └── performance.md                # Performance optimization (optional)
    ├── prompts/                          # Modular role prompts (create this folder)
    │   ├── README.md                     # Role announcement guide
    │   ├── documentation-writer.md
    │   ├── frontend-developer.md
    │   ├── backend-developer.md
    │   ├── software-architect.md
    │   ├── code-reviewer.md
    │   ├── qa-engineer.md
    │   ├── security-analyst.md
    │   ├── performance-engineer.md
    │   └── database-administrator.md
    └── quick-reference.md                # Commands, paths, patterns
```

#### 6.1 Main `.cursorrules` File (Root)

**Purpose:** Lightweight entry point that Cursor always reads
**Length:** ~100-150 lines
**Content:**

```markdown
# [Project Name] Cursor Rules

> **📁 Modular Structure:** This project uses organized cursor rules.
> Detailed guidelines are in `.cursor/rules/`. This file provides quick context.

## 🎯 Quick Context

**Project Type:** [Detected type]
**Primary Language:** [Detected language]
**Framework:** [Detected framework]

**Tech Stack:**
- Frontend: [If applicable]
- Backend: [If applicable]
- Database: [If applicable]
- Testing: [Detected framework]

**Project Structure:**
- [Brief description of folder organization]

## 🎭 Role-Based System

**CRITICAL:** At the start of EVERY response, announce your role:

\```
🎭 **Role Adopted:** [Role Name]
📋 **Why:** [Brief explanation]
\```

**Available Roles:**
- 📝 Documentation Writer - Technical docs
- ⚛️ Frontend Developer - UI/Components
- 🔧 Backend Developer - APIs/Services
- 🔍 Code Reviewer - Code quality
- 🏗️ Software Architect - System design
- 🧪 QA Engineer - Testing
- [Add other relevant roles based on project]

**📖 Full role documentation:** `.cursor/prompts/README.md` and individual role files

## 📚 Detailed Guidelines

For comprehensive rules, see:

- **Architecture Patterns:** `.cursor/rules/architecture.md`
- **Code Style:** `.cursor/rules/code-style.md`
- **Git Workflow:** `.cursor/rules/git-workflow.md`
- **Testing:** `.cursor/rules/testing.md`
- **Security:** `.cursor/rules/security.md`
[If applicable:] - **Performance:** `.cursor/rules/performance.md`

## 🚀 Quick Reference

**Common Commands:**
[2-3 most used commands from package.json]

**Key Locations:**
- [Most important directories]

**Full reference:** `.cursor/quick-reference.md`

---

**Note:** When working on specific tasks, Cursor will reference the relevant detailed files automatically.
```

#### 6.2 `.cursor/rules/architecture.md`

**Content:**
- Project type and architecture overview
- Framework-specific patterns (React, FastAPI, etc.)
- File organization standards
- Module/component structure
- Import/export conventions
- Dependency management

**Length:** 200-400 lines

#### 6.3 `.cursor/rules/code-style.md`

**Content:**
- Naming conventions (functions, variables, files)
- Formatting standards
- Function documentation (JSDoc, docstrings, etc.)
- Error handling patterns
- Logging standards
- Comment guidelines
- Language-specific best practices

**Length:** 200-300 lines

#### 6.4 `.cursor/rules/git-workflow.md`

**Content:**
- Branch strategy (detected or recommended)
- Commit message format
- PR/MR guidelines
- Code review process
- Versioning approach
- Tag conventions

**Length:** 150-250 lines

#### 6.5 `.cursor/rules/testing.md`

**Content:**
- Testing framework and setup
- Test organization
- Test patterns (unit, integration, e2e)
- Coverage requirements
- Mock/stub patterns
- Running tests

**Length:** 150-250 lines

#### 6.6 `.cursor/rules/security.md`

**Content:**
- Authentication patterns
- Authorization checks
- Input validation
- API security
- Data protection
- Dependency security
- Security checklist

**Length:** 150-250 lines

#### 6.7 `.cursor/rules/performance.md` (Optional)

**Content:**
- Framework-specific optimizations
- Caching strategies
- Bundle optimization
- Database query optimization
- Monitoring and profiling

**Length:** 150-250 lines
**Include if:** Performance is critical or framework-specific optimizations exist

#### 6.8 `.cursor/prompts/` - Modular Role Files

**Generate individual files for each role** - This enables easy customization:

- `README.md` - Role announcement requirements and selection guide
- `documentation-writer.md` - Technical writing and documentation role
- `frontend-developer.md` - Frontend development role
- `backend-developer.md` - Backend development role
- `software-architect.md` - Architecture and design role
- `code-reviewer.md` - Code review and quality role
- `qa-engineer.md` - Testing and quality assurance role
- `security-analyst.md` - Security review and best practices role
- `performance-engineer.md` - Performance optimization role
- `database-administrator.md` - Database operations role

**Project-specific roles (optional):**
- `monorepo-manager.md` - If monorepo detected
- `build-engineer.md` - If complex build tooling detected

**Length:** Each file 100-200 lines
**ALWAYS INCLUDE** - This is the core of the role-based system

#### 6.9 `.cursor/quick-reference.md`

**Content:**
- All common commands (from package.json, Makefile)
- File locations (actual paths)
- Key patterns (5-10 most important)
- Environment variables (from .env files)
- Useful aliases/shortcuts

**Length:** 100-200 lines

---

### 6.10 Generation Order

Create files in this order:

1. Create `.cursor/` directory
2. Create `.cursor/rules/` subdirectory
3. Create `.cursor/prompts/` subdirectory
4. Generate all detailed files first (`.cursor/rules/*.md`, `.cursor/prompts/*.md`, `.cursor/quick-reference.md`)
5. Generate main `.cursorrules` last (with references to all created files)

---

## 🎭 Role-Based System (ALWAYS INCLUDE)

> **This is the core of the cursor rules system and should be included in EVERY generated `.cursorrules` file.**

```markdown
## 🎭 Role-Based System Prompts

Cursor adopts different expert roles based on the task type to ensure consistent quality and adherence to standards.

### 🎯 Role Announcement Requirement

**CRITICAL:** At the start of EVERY response, Cursor MUST explicitly announce:

\```
🎭 **Role Adopted:** [Role Name(s)]
📋 **Why:** [Brief 1-line explanation of why this role was chosen]
\```

**Examples:**
\```
🎭 **Role Adopted:** ⚛️ Frontend Developer
📋 **Why:** Building React component with state management

🎭 **Role Adopted:** 🔧 Backend Developer → 🔒 Security Analyst
📋 **Why:** Creating authentication endpoint requiring secure design

🎭 **Role Adopted:** 🐙 GitHub Workflow Manager → 🧪 QA Engineer
📋 **Why:** Setting up CI/CD pipeline with automated testing
\```

This allows the user to:
- ✅ Verify correct role selection
- ✅ Understand the reasoning
- ✅ Make adjustments to role system if needed
- ✅ Learn role selection patterns

### Quick Role Selection

When starting a task, Cursor will automatically adopt the appropriate role:

| Task Type | Adopt Role | Focus |
|-----------|-----------|--------|
| **Writing docs** | 📝 Documentation Writer | Clear, structured technical writing |
| **Frontend work** | ⚛️ Frontend Developer | Components, state, performance |
| **Backend/API** | 🔧 Backend Developer | APIs, services, error handling |
| **Cloud integration** | ☁️ Cloud Specialist | Cloud services, infrastructure |
| **Code review** | 🔍 Code Reviewer | Standards, security, quality |
| **Architecture** | 🏗️ Software Architect | System design, scalability |
| **Performance** | ⚡ Performance Engineer | Optimization, caching |
| **Security** | 🔒 Security Analyst | Vulnerabilities, best practices |
| **Testing** | 🧪 QA Engineer | Test coverage, mocks |
| **AI features** | 🤖 AI Integration Specialist | LLM integration, prompts |
| **CI/CD** | 🐙 GitHub Workflow Manager | Automation, pipelines |
| **Releases** | 🚀 Release Manager | Versioning, changelogs |
| **Data analysis** | 📊 Data Analyst | Metrics, analytics |
| **Database** | 🗄️ Database Administrator | Schema, queries, optimization |
| **Visualization** | 📈 Data Visualization Specialist | Charts, dashboards |
| **UX design** | 🎨 UX Designer | User flows, accessibility |

### Multi-Role Tasks

Complex tasks may require multiple roles in sequence:

\```
Example: "Add user authentication"

1. 🏗️ Architect: Design authentication flow
2. 🔒 Security Analyst: Define security requirements
3. 🔧 Backend Developer: Implement auth endpoints
4. ⚛️ Frontend Developer: Build login UI
5. 🔍 Code Reviewer: Review implementation
6. 🧪 QA Engineer: Write tests
7. 📝 Documentation Writer: Document feature
\```
```

---

## 📐 Template: Project Overview Section

**⚠️ IMPORTANT: Fill this based on actual repository analysis, not placeholders**

```markdown
## Project Overview

[PROJECT_NAME] is a [PROJECT_TYPE] built with [ACTUAL_DETECTED_TECH_STACK]. 

**Key Information:**
- **Primary Language:** [Detected from files - e.g., JavaScript/TypeScript, Python, Go, Rust]
- **Project Type:** [Detected from structure - e.g., Web Application, REST API, CLI Tool, Library]
- **Main Purpose:** [Inferred from README.md if available, or file structure]

### Tech Stack
- **Frontend:** [Detected from dependencies - e.g., React 18.2, Vue 3.3, Angular 16]
- **Backend:** [Detected from dependencies - e.g., Node.js 20.x + Express 4.18, Python 3.11 + FastAPI]
- **Database:** [Detected from dependencies or docker-compose - e.g., PostgreSQL, MongoDB, MySQL]
- **Cloud:** [Detected from SDKs - e.g., AWS (detected @aws-sdk/*), Azure, GCP, or "Self-hosted" if none]
- **Testing:** [Detected from devDependencies - e.g., Jest 29, pytest, Go test]
- **Build Tools:** [Detected from config files - e.g., Vite 5, webpack 5, esbuild]
- **Other:** [Other detected technologies - e.g., Redis (from docker-compose), Docker (Dockerfile found)]

### Architecture
[Describe based on actual folder structure]
- **Type:** [Monorepo | Frontend/Backend Split | Single Application | Microservices]
- **Structure:** [Describe actual directory organization]
```

---

## 📐 Template: Architecture Patterns

### For React/Vue/Angular Frontend

```markdown
## Frontend Architecture

### Component Structure
- **Functional components** with hooks (React) / Composition API (Vue)
- **Smart/Container components**: Handle data fetching and state
- **Presentational components**: Pure UI components
- **Lazy loading**: Use dynamic imports for code splitting
- **Error boundaries**: Implement proper error handling

### State Management
- [SPECIFY: Redux/Zustand/Context API/Pinia/NgRx]
- Global state for: [authentication, theme, user preferences]
- Local state for: [component-specific data]

### UI Framework
- [SPECIFY: Material-UI, Ant Design, Chakra UI, Tailwind, etc.]
- Use [FRAMEWORK] components for consistency
- Custom components in `src/components/`
- Reusable patterns in `src/components/common/`

### Performance
- Lazy load routes and heavy components
- Use `memo()` / `useMemo()` / `useCallback()` for expensive operations
- Implement virtualization for large lists
- Optimize bundle size with tree shaking

### File Organization
\```
src/
├── components/          # Reusable components
├── pages/              # Route components
├── hooks/              # Custom hooks
├── services/           # API clients
├── utils/              # Helper functions
├── contexts/           # React Context providers
└── assets/             # Static assets
\```
```

### For Node.js/Express Backend

```markdown
## Backend Architecture

### Patterns
- **Functional programming**: Pure functions with clear inputs/outputs
- **Service layer**: Business logic separated from controllers
- **Controller pattern**: Thin controllers, delegate to services
- **Error handling**: Comprehensive try-catch with meaningful messages
- **Middleware**: Authentication, validation, error handling
- **Dependency injection**: For testability

### API Design
- **RESTful principles**: Proper HTTP methods and status codes
- **Versioning**: `/api/v1/` prefix for all endpoints
- **Request validation**: Validate inputs before processing
- **Response format**: Consistent JSON structure
- **Error responses**: Clear, actionable error messages

### File Organization
\```
backend/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── services/           # Business logic
├── models/            # Data models
├── routes/            # Route definitions
├── middleware/        # Express middleware
├── utils/             # Helper functions
└── tests/             # Test files
\```

### Error Handling Pattern
\```javascript
try {
  const result = await riskyOperation();
  
  return res.json({
    success: true,
    data: result
  });
} catch (error) {
  console.error('Operation failed:', {
    message: error.message,
    stack: error.stack?.split('\\n').slice(0, 3)
  });
  
  return res.status(500).json({
    success: false,
    error: error.message,
    userMessage: 'User-friendly error description'
  });
}
\```
```

### For Python/FastAPI Backend

```markdown
## Backend Architecture

### Patterns
- **Async/await**: Use async functions for I/O operations
- **Type hints**: Use Python type hints for all functions
- **Pydantic models**: Request/response validation
- **Dependency injection**: FastAPI's dependency system
- **Repository pattern**: Data access layer
- **Service layer**: Business logic

### API Design
- **RESTful endpoints**: Clear resource naming
- **Auto-generated docs**: Leverage FastAPI's OpenAPI
- **Request validation**: Pydantic models
- **Response models**: Type-safe responses
- **Error handling**: HTTPException with detail

### File Organization
\```
backend/
├── app/
│   ├── api/           # API routes
│   ├── core/          # Configuration
│   ├── models/        # Database models
│   ├── schemas/       # Pydantic schemas
│   ├── services/      # Business logic
│   └── utils/         # Helper functions
├── tests/             # Test files
└── main.py            # Application entry
\```

### Code Style
\```python
from typing import List, Optional
from fastapi import HTTPException
from pydantic import BaseModel

async def get_items(
    skip: int = 0,
    limit: int = 100
) -> List[Item]:
    """
    Retrieve items with pagination.
    
    Args:
        skip: Number of items to skip
        limit: Maximum items to return
        
    Returns:
        List of items
        
    Raises:
        HTTPException: If database query fails
    """
    try:
        return await item_service.get_items(skip, limit)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch items: {str(e)}"
        )
\```
```

---

## 📐 Template: Code Style

**⚠️ IMPORTANT: Base this on DETECTED patterns from repository analysis**

### For JavaScript/TypeScript

```markdown
## Code Style

### Naming Conventions
[Use patterns detected during analysis. If Option B (Best Practices), use standards below]

**Current Project Patterns:** [Describe what was actually found]
- **Variables/Functions**: [detected pattern - e.g., "mostly camelCase, some inconsistencies"]
- **Constants**: [detected pattern - e.g., "UPPER_SNAKE_CASE in 80% of files"]
- **Classes/Components**: [detected pattern - e.g., "consistently PascalCase"]
- **Files**: [detected pattern - e.g., "mix of kebab-case and camelCase"]
- **Private methods**: [detected pattern or "not used"]

[If Option B - Best Practices selected, add:]
**Recommended Standards:**
- **Variables/Functions**: camelCase (`getUserData`, `isValid`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)
- **Classes/Components**: PascalCase (`UserProfile`, `DataTable`)
- **Files**: kebab-case (`user-profile.jsx`, `data-table.jsx`)
- **Private methods**: Prefix with `_` (`_validateInput`)

### Function Documentation
[If JSDoc/TSDoc detected, show examples. If not detected but Option B selected, add requirement]

**Current Usage:** [X% of functions have documentation]

[If Option B:]
**Required Format:**
\```javascript
/**
 * [Brief description]
 * 
 * @param {string} param1 - Description
 * @param {Object} options - Additional options
 * @returns {Promise<Type>} Description
 * @throws {Error} When [condition]
 */
async function exampleFunction(param1, options = {}) {
  // Implementation
}
\```

### Code Patterns
[Based on detected patterns]
**Currently Used:**
- Variable declarations: [const usage: X%, let: Y%, var: Z%]
- Functions: [Arrow functions: X%, Function declarations: Y%]
- Async patterns: [async/await: X%, .then(): Y%]
- String formatting: [Template literals: X%, Concatenation: Y%]

[If Option B, add:]
**Best Practices:**
- Use `const` by default, `let` when reassignment needed, never `var`
- Prefer arrow functions for callbacks
- Use destructuring for objects and arrays
- Use template literals for string interpolation
- Use async/await over .then() chains
- Use optional chaining (`?.`) and nullish coalescing (`??`)
```

### For Python

```markdown
## Code Style

### Naming Conventions
[Use patterns detected during analysis]

**Current Project Patterns:** [Describe what was actually found]
- **Variables/Functions**: [detected - e.g., "consistently snake_case"]
- **Constants**: [detected - e.g., "mostly UPPER_SNAKE_CASE"]
- **Classes**: [detected - e.g., "consistently PascalCase"]
- **Files**: [detected - e.g., "all snake_case"]
- **Private methods**: [detected - e.g., "using _ prefix in 60% of cases"]

[If Option B:]
**Recommended Standards (PEP 8):**
- **Variables/Functions**: snake_case (`get_user_data`, `is_valid`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)
- **Classes**: PascalCase (`UserProfile`, `DataTable`)
- **Files**: snake_case (`user_profile.py`, `data_table.py`)
- **Private methods**: Prefix with `_` (`_validate_input`)

### Type Hints & Documentation
**Current Usage:** 
- Type hints: [Found in X% of functions]
- Docstrings: [Found in Y% of functions]

[If type hints detected, show example format used]
[If Option B or low coverage, add requirement:]

**Required Format:**
\```python
from typing import List, Optional, Dict, Any

def get_user_data(
    user_id: str,
    include_deleted: bool = False
) -> Optional[Dict[str, Any]]:
    """
    Brief description.
    
    Args:
        user_id: The user ID to fetch
        include_deleted: Include deleted users
        
    Returns:
        User data dictionary or None if not found
        
    Raises:
        ValueError: If user_id is invalid
        DatabaseError: If database query fails
    """
    # Implementation
\```

### Code Patterns
**Currently Used:**
- String formatting: [f-strings: X%, .format(): Y%, %: Z%]
- Context managers: [Using `with` in X% of file operations]
- List comprehensions: [Usage frequency]
- Async functions: [X async functions found]

[If Option B:]
**Best Practices:**
- Follow PEP 8 style guide  
- Use type hints for all public function signatures
- Use list comprehensions when readable
- Prefer f-strings for string formatting
- Use context managers (`with` statements) for resources
- Keep functions focused and small (max 50 lines)
```

---

## 📐 Template: Git Workflow

**⚠️ IMPORTANT: Base this on DETECTED git patterns from repository**

```markdown
## Git Workflow

### Current Branch Strategy
[Describe detected branches and patterns]

**Detected Branches:**
- [List actual branches found - e.g., main, dev, feature/xyz, etc.]

**Detected Pattern:**
- Primary branch: [main | master]
- Development branch: [dev | develop | detected/none]
- Feature branches: [Detected pattern - e.g., "feature/*, feat/*, inconsistent"]
- Bug fix branches: [Detected pattern - e.g., "bugfix/*, fix/*, inconsistent"]

[If Option B - Best Practices selected, add:]

### Recommended Branch Strategy (Gitflow)
\```
main          # Production-ready code
  ↑
dev           # Integration branch
  ↑
feature/*     # Feature development
bugfix/*      # Bug fixes
hotfix/*      # Emergency production fixes
\```

### Creating Features
\```bash
# Start from dev
git checkout dev && git pull origin dev

# Create feature branch
git checkout -b feature/add-user-auth

# Make changes, commit frequently
git add .
git commit -m "feat: Add JWT authentication"

# Push branch
git push origin feature/add-user-auth

# Create PR to dev
# After approval, merge to dev
# After testing on dev, merge to main
\```

### Commit Message Format

**Current Pattern Detected:**
[Analyze last 20 commits and describe pattern]
- Format: [Conventional Commits | Custom format | Ad-hoc/Free-form]
- Consistency: [X% follow a pattern]
- Examples found:
  - [Example 1 from actual commits]
  - [Example 2 from actual commits]
  - [Example 3 from actual commits]

[If Option B - Best Practices selected, add:]

**Recommended: Conventional Commits**
Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

\```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style (no logic change)
refactor: # Code refactoring
perf:     # Performance improvements
test:     # Adding tests
chore:    # Build process, dependencies

# Examples:
feat(auth): Add JWT token validation
fix(api): Fix null pointer in user endpoint
docs: Update API documentation
refactor(db): Optimize query performance
\```

**Benefits:**
- Auto-generate changelogs
- Semantic versioning automation
- Clear change history
- Easier code reviews

### Before Committing
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Linter passes
- [ ] No sensitive data (API keys, passwords)
- [ ] Documentation updated if needed
```

---

## 📐 Template: Testing Requirements

### For JavaScript/Jest

```markdown
## Testing Requirements

### Framework
- **Test Runner**: Jest
- **React Testing**: @testing-library/react
- **Coverage**: Minimum 80% for critical paths

### Test Organization
\```
src/
├── components/
│   ├── Button.jsx
│   └── Button.test.jsx       # Co-located tests
├── services/
│   ├── api.js
│   └── api.test.js
\```

### Test Patterns
\```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\```

### What to Test
- [ ] Component rendering
- [ ] User interactions
- [ ] API calls (mocked)
- [ ] Error handling
- [ ] Edge cases
```

### For Python/pytest

```markdown
## Testing Requirements

### Framework
- **Test Runner**: pytest
- **Coverage**: pytest-cov (minimum 80%)
- **Async Tests**: pytest-asyncio

### Test Organization
\```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── conftest.py        # Fixtures
└── __init__.py
\```

### Test Patterns
\```python
import pytest
from app.services import UserService

@pytest.mark.asyncio
async def test_get_user_success():
    """Test successful user retrieval."""
    user_service = UserService()
    user = await user_service.get_user("user123")
    
    assert user is not None
    assert user.id == "user123"

@pytest.mark.asyncio
async def test_get_user_not_found():
    """Test user not found scenario."""
    user_service = UserService()
    
    with pytest.raises(ValueError):
        await user_service.get_user("invalid")
\```

### What to Test
- [ ] Function logic
- [ ] API endpoints
- [ ] Database queries (with test DB)
- [ ] Error handling
- [ ] Edge cases
```

---

## 📐 Template: Security Best Practices

```markdown
## Security Best Practices

### Authentication & Authorization
- Use industry-standard auth (JWT, OAuth 2.0)
- Never store passwords in plain text (bcrypt, argon2)
- Implement rate limiting on auth endpoints
- Use HTTPS in production
- Validate tokens on every protected request

### Input Validation
- Validate all user inputs
- Sanitize data before database queries
- Use parameterized queries (prevent SQL injection)
- Validate file uploads (type, size, content)
- Use schema validation (Joi, Zod, Pydantic)

### API Security
- Use API keys/tokens for authentication
- Implement CORS properly
- Rate limit all public endpoints
- Log security events
- Never expose internal error details to users

### Data Protection
- Never log sensitive data (passwords, tokens, PII)
- Use environment variables for secrets
- Never commit secrets to version control
- Encrypt sensitive data at rest
- Use secure session management

### Dependencies
- Keep dependencies updated
- Audit dependencies regularly (`npm audit`, `pip-audit`)
- Use lock files (package-lock.json, poetry.lock)
- Review security advisories
```

---

## 📐 Template: Performance Optimization

### For React Frontend

```markdown
## Performance Optimization

### React Patterns
\```javascript
import { memo, useMemo, useCallback, lazy, Suspense } from 'react';

// Memoize expensive components
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* Complex rendering */}</div>;
});

// Memoize expensive calculations
function DataTable({ data }) {
  const sortedData = useMemo(() => {
    return data.sort((a, b) => b.value - a.value);
  }, [data]);
  
  const handleClick = useCallback((id) => {
    // Handle click
  }, []);
  
  return <table>{/* Render sortedData */}</table>;
}

// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\```

### Bundle Optimization
- Code splitting with dynamic imports
- Tree shaking (use named imports)
- Minimize bundle size
- Lazy load heavy libraries
- Use production builds

### Rendering Optimization
- Virtualize long lists (react-window)
- Debounce search inputs
- Throttle scroll handlers
- Avoid inline functions in JSX
- Use key prop correctly in lists
```

### For Backend

```markdown
## Performance Optimization

### Database
- Index frequently queried columns
- Use connection pooling
- Implement pagination for large datasets
- Avoid N+1 queries
- Use database query optimization tools

### Caching
\```javascript
const cache = new Map();

async function getCachedData(key, fetchFn, ttl = 3600) {
  if (cache.has(key)) {
    const { data, timestamp } = cache.get(key);
    if (Date.now() - timestamp < ttl * 1000) {
      return data;
    }
  }
  
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
\```

### API Optimization
- Implement response compression (gzip)
- Use pagination for large responses
- Implement field filtering (return only requested fields)
- Batch similar operations
- Use async/parallel processing
```

---

## 📐 Template: AI/LLM Integration (If Applicable)

```markdown
## AI/LLM Integration

### Architecture
- **Centralized service**: All AI calls through one service
- **Provider abstraction**: Support multiple LLM providers
- **Graceful fallback**: Basic functionality if AI unavailable

### Configuration
\```javascript
// AI configuration storage
const aiConfig = {
  provider: 'anthropic' | 'openai' | 'ollama',
  apiKey: 'stored-in-env-or-localStorage',
  model: 'claude-3-sonnet' | 'gpt-4' | 'llama2',
  settings: {
    temperature: 0.7,
    maxTokens: 2000
  }
};
\```

### Usage Pattern
\```javascript
// Backend service
async function getAIInsights(data, options = {}) {
  try {
    const prompt = formatPrompt(data);
    const response = await aiService.generate({
      prompt,
      ...options
    });
    
    return {
      success: true,
      insights: response.text,
      provider: aiConfig.provider,
      model: aiConfig.model
    };
  } catch (error) {
    console.error('AI generation failed:', error);
    
    // Fallback to basic analysis
    return {
      success: false,
      insights: generateBasicInsights(data),
      source: 'fallback'
    };
  }
}
\```

### Best Practices
- Always provide fallback for AI failures
- Cache AI responses when appropriate
- Validate AI responses before using
- Handle rate limits gracefully
- Never expose API keys in frontend
- Use system prompts for consistency
- Monitor token usage and costs
```

---

## 📐 Template: Quick Reference Section

**⚠️ IMPORTANT: Extract actual commands and paths from repository**

```markdown
## Quick Reference

### Common Commands
[Extract from package.json scripts, Makefile, or similar]

\```bash
# Development
[Detected command - e.g., npm run dev, yarn dev, python main.py, go run ., cargo run]
[Detected command - e.g., npm run build, yarn build, python setup.py build]
[Detected command - e.g., npm test, pytest, go test ./..., cargo test]
[Detected command - e.g., npm run lint, flake8, golangci-lint]

# Git workflow (based on detected branch strategy)
[Use detected primary branch - e.g., main or master]
[Use detected dev branch if exists - e.g., dev or develop]
[Use detected branch pattern - e.g., feature/* or feat/*]
\```

### File Locations
[Based on actual project structure found]
- Configuration: [Detected - e.g., `config/`, `.env`, `settings.py`]
- [Frontend Components]: [Detected - e.g., `src/components/`, `frontend/components/`]
- [Backend Services]: [Detected - e.g., `src/services/`, `backend/services/`, `app/services/`]
- [Utilities]: [Detected - e.g., `src/utils/`, `lib/`, `helpers/`]
- Tests: [Detected - e.g., `tests/`, `__tests__/`, `spec/`, co-located]
- Documentation: [Detected - e.g., `docs/`, `documentation/`, or "README.md only"]

### Key Patterns
[List 3-5 most important patterns detected from code analysis]
1. [Pattern 1 - e.g., "All API calls go through src/services/api.js"]
2. [Pattern 2 - e.g., "React components use hooks only (no class components)"]
3. [Pattern 3 - e.g., "Error handling uses custom AppError class"]
4. [Pattern 4 - e.g., "Database queries in repositories/"]
5. [Pattern 5 - e.g., "Authentication via JWT tokens in headers"]

### Environment Variables
[Extract from .env.example, .env.sample, or .env.template]
[List ONLY the variable names found, NOT values, NOT FinOps-specific]

\```bash
# Required
[VAR_NAME_1]=[description or example]
[VAR_NAME_2]=[description or example]

# Optional
[VAR_NAME_3]=[description or example]
[VAR_NAME_4]=[description or example]
\```

**Example (based on typical findings):**
\```bash
# Required
DATABASE_URL=postgresql://localhost:5432/dbname
PORT=3000

# Optional
LOG_LEVEL=info
CACHE_TTL=3600
\```
```

---

## 🎯 Generation Checklist for Cursor

Before generating `.cursorrules`, ensure you have:

**✅ Analysis Complete:**
- [ ] Scanned dependency files (package.json, requirements.txt, etc.)
- [ ] Analyzed project structure and file organization
- [ ] Read sample code files to detect patterns
- [ ] Checked git branches and commit history
- [ ] Found environment variable files
- [ ] Detected testing framework and patterns
- [ ] Identified special integrations (AI, cloud, real-time)

**✅ Report Generated:**
- [ ] Provided comprehensive analysis report to user
- [ ] Compared current patterns vs. best practices
- [ ] Listed specific recommendations
- [ ] Offered Options A/B/C to user
- [ ] Waited for user's choice before proceeding

**✅ Modular Structure Created:**
- [ ] Created `.cursor/` directory
- [ ] Created `.cursor/rules/` subdirectory
- [ ] Created `.cursor/prompts/` subdirectory
- [ ] Generated `.cursorrules` main file (~100-150 lines)
- [ ] Generated `.cursor/rules/architecture.md`
- [ ] Generated `.cursor/rules/code-style.md`
- [ ] Generated `.cursor/rules/git-workflow.md`
- [ ] Generated `.cursor/rules/testing.md`
- [ ] Generated `.cursor/rules/security.md`
- [ ] Generated `.cursor/rules/performance.md` (if applicable)
- [ ] Generated `.cursor/prompts/README.md` and individual role files (REQUIRED)
- [ ] Generated `.cursor/quick-reference.md`

**✅ Content Quality:**
- [ ] Main `.cursorrules` references all detailed files
- [ ] Each file focuses on one topic (no overlap)
- [ ] All based on actual detected technologies and patterns
- [ ] Role-based system included in both main file and prompts directory
- [ ] No placeholder text in any file
- [ ] No FinOps-specific references (unless analyzing FinOps)
- [ ] All examples use project's actual tech stack
- [ ] All file paths match actual project structure
- [ ] All commands match actual package.json/Makefile scripts

**✅ Quality Checks:**
- [ ] NO placeholder text like [PROJECT_NAME] or [TECH_STACK]
- [ ] NO FinOps-specific references (unless analyzing FinOps itself)
- [ ] All examples use project's actual tech stack
- [ ] All file paths match actual project structure
- [ ] All commands match actual package.json scripts
- [ ] Naming conventions match detected language standards
- [ ] Environment variables match actual .env file contents

---

## 📝 Example Output Structure

**Note:** This is a structural example only. YOUR generated `.cursorrules` must be based on ACTUAL repository analysis, not this template.

```markdown
# [Detected Project Name] Cursor Rules

## Project Overview
[Auto-generated description based on README.md analysis and detected technologies]

**Key Information:**
- **Primary Language:** [Detected]
- **Project Type:** [Detected]
- **Main Purpose:** [Inferred from README or structure]

### Tech Stack
[List ALL detected technologies with versions]

### Architecture
[Describe actual folder structure]

---

## 🎭 Role-Based System Prompts
[Always include full role system from template - this is non-negotiable]

---

## Architecture Patterns
[Framework-specific patterns based on detection]

---

## Code Style
[Based on Option A (detected patterns) or Option B (best practices)]

---

## File Organization
[Actual directory structure from analysis]

---

## Error Handling
[Detected patterns or best practice recommendations]

---

## Git Workflow
[Based on detected branches and user choice]

---

## Testing Requirements
[Based on detected framework]

---

## Security Best Practices
[Language and framework-specific]

---

## Performance Optimization
[Framework-specific recommendations]

---

## Quick Reference

### Common Commands
[Extracted from package.json, Makefile, etc.]

### File Locations
[Actual paths from repository]

### Key Patterns
[5 most important patterns detected]

### Environment Variables
[From .env.example or similar files]
```

---

## 🚀 Tips for Effective Generation

### Be Thorough in Analysis
- Read multiple files from each directory (not just one)
- Check both root and nested package files (monorepo detection)
- Analyze git history for patterns (not just current state)
- Look for configuration in multiple formats (.js, .json, .yaml, .toml)
- Check docker-compose.yml for additional services (databases, caches)

### Show Your Work
- Provide detailed analysis report before generating
- Explain WHY you detected each pattern
- Show examples from actual code
- Compare current vs. best practices objectively
- Don't judge - just inform

### Adapt, Don't Template
- NO placeholder text like [PROJECT_NAME] or [TECH_STACK]
- NO generic examples - use actual code patterns found
- NO FinOps-specific references (unless analyzing FinOps)
- YES to project-specific patterns
- YES to detected naming conventions
- YES to actual file paths and commands

### Respect User Choice
- If user chooses Option A, document their patterns AS-IS
- Don't try to "sneak in" best practices they didn't choose
- If user chooses Option B, be comprehensive with standards
- If user chooses Option C (hybrid), respect each individual choice

### Keep It Practical
- Include executable commands (from package.json)
- Reference actual file paths (that exist)
- Document real patterns (observed in code)
- Provide working examples (based on their framework)
- Link to relevant docs (for their tech stack)

---

## ✅ Post-Generation Actions

After generating `.cursorrules`:

1. **Verify completeness** - All required sections included
2. **Check accuracy** - Tech stack correctly identified from analysis
3. **No placeholders** - All brackets replaced with actual detected values
4. **Test examples** - Code examples match project's tech stack
5. **File paths accurate** - All paths point to actual directories
6. **Commands work** - All commands match package.json or detected build system

**Present Summary to User:**
```markdown
✅ **Modular cursor rules have been generated!**

📁 **Structure Created:**
\```
your-project/
├── .cursorrules                    # ✅ Main entry point (150 lines)
└── .cursor/
    ├── rules/
    │   ├── architecture.md         # ✅ [X] lines
    │   ├── code-style.md           # ✅ [Y] lines
    │   ├── git-workflow.md         # ✅ [Z] lines
    │   ├── testing.md              # ✅ [A] lines
    │   ├── security.md             # ✅ [B] lines
    │   └── performance.md          # ✅ [C] lines [if included]
    ├── prompts/                    # ✅ Modular role files
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
    └── quick-reference.md          # ✅ [E] lines

Total: [X+Y+Z+A+B+C+D+E] lines across [#] files
\```

📊 **What was included:**
- **Main file:** Quick context and role announcement requirement
- **Architecture:** [Framework]-specific patterns for your [detected structure]
- **Code Style:** Based on [Option A: your patterns / Option B: best practices / Option C: hybrid]
- **Git Workflow:** [Detected branch strategy] with [commit format]
- **Testing:** [Detected framework] patterns and requirements
- **Security:** [Language]-specific security guidelines
- **System Prompts:** Full role-based system with [X] roles
- **Quick Reference:** [Y] commands and [Z] key patterns

💡 **Generated based on:**
- [If Option A:] Your current code patterns (as-is documentation)
- [If Option B:] Industry best practices with improvement recommendations
- [If Option C:] Hybrid approach with your custom preferences

📋 **Next steps:**
1. **Review files** - based on automated analysis, verify accuracy
2. **Customize if needed** - add team-specific conventions to relevant files
3. **Test it** - ask me to perform tasks and verify I follow the rules
4. **Commit everything:**
   \```bash
   git add .cursorrules .cursor/
   git commit -m "chore: Add modular cursor rules"
   \```
5. **Archive cursor-initialization/** - you won't need it again

🎭 **From now on:**
- I'll announce my role at the start of EVERY response
- I'll follow patterns from `.cursor/rules/` automatically
- I'll reference specific rule files when relevant
- Main `.cursorrules` loads first for quick context
- Detailed files load on-demand for specific tasks

📚 **Modular Benefits:**
- ✅ Easy to update individual sections
- ✅ Share specific rules across projects
- ✅ Clean git diffs (only changed files)
- ✅ Progressive learning for team
- ✅ Can customize per topic

**Try it now:** Ask me to create a new component/function and watch me:
1. Announce my adopted role
2. Reference `.cursor/rules/architecture.md` for patterns
3. Follow `.cursor/rules/code-style.md` for naming
4. Apply your project's specific conventions!
```

---

**Version:** 2.0.0  
**Last Updated:** October 30, 2025  
**Source:** Production Best Practices  
**Major Change:** Modular structure with `.cursor/` directory organization  
**Compatibility:** All Cursor versions with .cursorrules support

