# Generated Structure Example

This document shows what structure Cursor will generate when you use this initialization system.

## 📁 File Tree

When Cursor scans your repository and generates cursor rules, you'll get:

```
your-project/
│
├── AGENTS.md                                    # 📄 Optional: Simple alternative
│
└── .cursor/                                     # 📁 Organized rules directory
    │
    ├── rules/                                   # 📁 Detailed topic-specific rules
    │   ├── main.mdc                             # 📄 Main entry (150 lines)
    │   ├── architecture.mdc                     # 📄 200-400 lines
    │   │   ├── Framework patterns
    │   │   ├── File organization
    │   │   ├── Module structure
    │   │   └── Dependency management
    │   │
    │   ├── code-style.mdc                       # 📄 200-300 lines
    │   │   ├── Naming conventions
    │   │   ├── Formatting standards
    │   │   ├── Documentation requirements
    │   │   └── Language-specific practices
    │   │
    │   ├── git-workflow.mdc                     # 📄 150-250 lines
    │   │   ├── Branch strategy
    │   │   ├── Commit message format
    │   │   ├── PR guidelines
    │   │   └── Versioning approach
    │   │
    │   ├── testing.mdc                          # 📄 150-250 lines
    │   │   ├── Test framework setup
    │   │   ├── Test organization
    │   │   ├── Test patterns
    │   │   └── Coverage requirements
    │   │
    │   ├── security.mdc                         # 📄 150-250 lines
    │   │   ├── Authentication patterns
    │   │   ├── Input validation
    │   │   ├── API security
    │   │   └── Security checklist
    │   │
    │   └── performance.mdc                      # 📄 150-250 lines (optional)
    │       ├── Framework optimizations
    │       ├── Caching strategies
    │       └── Monitoring
    │
    ├── prompts/                                 # 📁 AI system prompts
    │   ├── README.mdc                           # 📄 Role announcement guide
    │   ├── documentation-writer.mdc
    │   ├── frontend-developer.mdc
    │   ├── backend-developer.mdc
    │   ├── software-architect.mdc
    │   ├── code-reviewer.mdc
    │   ├── qa-engineer.mdc
    │   ├── security-analyst.mdc
    │   ├── performance-engineer.mdc
    │   └── database-administrator.mdc
    │       ├── Full role-based system
    │       ├── Role selection guide
    │       ├── Role announcement examples
    │       └── Role-specific standards
    │
    └── quick-reference.mdc                      # 📄 100-200 lines
        ├── Common commands
        ├── File locations
        ├── Key patterns
        └── Environment variables
```

## 📊 Size Breakdown

**Total Structure:**
- Main file: ~150 lines
- Rules: ~1,000-1,800 lines (5-6 files)
- System prompts: ~300-500 lines
- Quick reference: ~100-200 lines
- **Total: 1,550-2,650 lines** across 8-9 organized files

**Compare to monolithic approach:**
- ❌ Old: One 2,000+ line file (hard to navigate)
- ✅ New: 8-9 focused files (150-400 lines each)

## 🎯 How It Works

### 1. Main `.cursor/rules/main.mdc` Loads First

```markdown
---
description: Main project context and quick reference
globs:
alwaysApply: true
---

# ProjectName Cursor Rules

> **Modular Structure:** Detailed rules in `.cursor/rules/`

## Quick Context
- Project type, language, framework
- Tech stack summary
- Brief role announcement requirement

## Detailed Guidelines
- See `.cursor/rules/architecture.mdc` for patterns
- See `.cursor/rules/code-style.mdc` for naming
- See `.cursor/rules/git-workflow.mdc` for commits
- [etc...]

## Quick Reference
- See `.cursor/quick-reference.mdc` for commands
```

### 2. Cursor References Specific Files On-Demand

**When creating a component:**
→ Reads `.cursor/rules/architecture.mdc` for patterns
→ Reads `.cursor/rules/code-style.mdc` for naming
→ Announces role from `.cursor/prompts/README.mdc`

**When writing tests:**
→ Reads `.cursor/rules/testing.mdc` for patterns
→ Reads `.cursor/rules/code-style.mdc` for formatting
→ Adopts 🧪 QA Engineer role

**When making commits:**
→ Reads `.cursor/rules/git-workflow.mdc` for commit format
→ Suggests conventional commit message

## ✅ Benefits

### For Individual Developers
- **Faster navigation** - Jump directly to relevant file
- **Focused learning** - Read one topic at a time
- **Easy updates** - Modify specific sections without affecting others

### For Teams
- **Progressive onboarding** - New members learn gradually
- **Clear git diffs** - Changes to specific topics visible
- **Shared standards** - Copy `.cursor/rules/code-style.mdc` across projects
- **Customizable** - Each project can override specific files

### For Projects
- **Maintainable** - Update architecture without touching test rules
- **Scalable** - Add `.cursor/rules/deployment.mdc` as needed
- **Discoverable** - Clear folder structure shows what's documented
- **Version controllable** - Track changes per topic

## 🚀 Advanced Usage

### Share Across Projects

```bash
# Copy code style to another project
cp .cursor/rules/code-style.mdc ../other-project/.cursor/rules/

# Share testing patterns across team repos
cp .cursor/rules/testing.mdc ~/shared-configs/
```

### Extend for Your Needs

```bash
# Add new rule file
touch .cursor/rules/deployment.mdc
touch .cursor/rules/monitoring.mdc
touch .cursor/rules/api-design.mdc

# Update main.mdc to reference them
```

### Override for Specific Tasks

```
@cursor "Follow .cursor/rules/architecture.mdc but ignore performance rules for this prototype"
```

### Reference Specific Sections

```
@cursor "Use the commit format from .cursor/rules/git-workflow.mdc for this feature branch"
```

## 📝 Example: Main `.cursor/rules/main.mdc` File

```markdown
---
description: Main project context and quick reference
globs:
alwaysApply: true
---

# MyApp Cursor Rules

> **📁 Modular Structure:** Detailed guidelines in `.cursor/rules/`

## 🎯 Quick Context

**Project Type:** Full-stack web application
**Primary Language:** TypeScript
**Framework:** React 18 + Express + PostgreSQL

**Tech Stack:**
- Frontend: React 18.2, Material-UI 5, React Router 6
- Backend: Node.js 20 + Express 4.18
- Database: PostgreSQL 15
- Testing: Jest 29, React Testing Library

**Project Structure:**
- `client/src/` - React frontend
- `server/` - Express backend
- `shared/` - Shared types and utilities

## 🎭 Role-Based System

**CRITICAL:** At the start of EVERY response, announce:

\```
🎭 **Role Adopted:** [Role Name]
📋 **Why:** [Brief explanation]
\```

**Available Roles:**
- ⚛️ Frontend Developer - React components, hooks
- 🔧 Backend Developer - Express APIs, services
- 🗄️ Database Administrator - PostgreSQL queries
- 🧪 QA Engineer - Jest tests
- 🔍 Code Reviewer - Code quality

**📖 Full documentation:** `.cursor/prompts/README.mdc`

## 📚 Detailed Guidelines

For comprehensive rules, see:

- **Architecture:** `.cursor/rules/architecture.mdc`
  - React component patterns
  - Express service layer
  - API design standards

- **Code Style:** `.cursor/rules/code-style.mdc`
  - TypeScript conventions
  - Naming standards
  - Documentation requirements

- **Git Workflow:** `.cursor/rules/git-workflow.mdc`
  - Feature branch strategy
  - Conventional commits
  - PR requirements

- **Testing:** `.cursor/rules/testing.mdc`
  - Jest + RTL patterns
  - Mock strategies
  - Coverage targets

- **Security:** `.cursor/rules/security.mdc`
  - JWT authentication
  - Input validation
  - SQL injection prevention

## 🚀 Quick Reference

**Common Commands:**
```bash
npm run dev        # Start dev server (frontend + backend)
npm test           # Run all tests
npm run lint       # ESLint + Prettier
```

**Key Patterns:**
1. All API calls through `client/src/services/api.ts`
2. React hooks only (no class components)
3. Express routes delegate to service layer
4. Database queries use parameterized statements

**Full reference:** `.cursor/quick-reference.mdc`

---

**Version:** 3.2.0 (Official .cursor/rules/ Format)
**Last Updated:** [Generated date]
```

## 🎊 Result

You get **production-quality, organized, maintainable cursor rules** that:
- ✅ Are easy to navigate and update
- ✅ Scale with your project
- ✅ Work across teams
- ✅ Provide focused, topic-specific guidance
- ✅ Enable progressive learning
- ✅ Support advanced workflows

---

**This structure is automatically generated based on YOUR actual codebase analysis!**

