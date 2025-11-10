# Generated Structure Example

This document shows what structure Cursor will generate when you use this initialization system.

## 📁 File Tree

When Cursor scans your repository and generates cursor rules, you'll get:

```
your-project/
│
├── .cursorrules                                 # 📄 Main entry (150 lines)
│   └── Quick context, role system, references
│
└── .cursor/                                     # 📁 Organized rules directory
    │
    ├── rules/                                   # 📁 Detailed topic-specific rules
    │   ├── architecture.md                      # 📄 200-400 lines
    │   │   ├── Framework patterns
    │   │   ├── File organization
    │   │   ├── Module structure
    │   │   └── Dependency management
    │   │
    │   ├── code-style.md                        # 📄 200-300 lines
    │   │   ├── Naming conventions
    │   │   ├── Formatting standards
    │   │   ├── Documentation requirements
    │   │   └── Language-specific practices
    │   │
    │   ├── git-workflow.md                      # 📄 150-250 lines
    │   │   ├── Branch strategy
    │   │   ├── Commit message format
    │   │   ├── PR guidelines
    │   │   └── Versioning approach
    │   │
    │   ├── testing.md                           # 📄 150-250 lines
    │   │   ├── Test framework setup
    │   │   ├── Test organization
    │   │   ├── Test patterns
    │   │   └── Coverage requirements
    │   │
    │   ├── security.md                          # 📄 150-250 lines
    │   │   ├── Authentication patterns
    │   │   ├── Input validation
    │   │   ├── API security
    │   │   └── Security checklist
    │   │
    │   └── performance.md                       # 📄 150-250 lines (optional)
    │       ├── Framework optimizations
    │       ├── Caching strategies
    │       └── Monitoring
    │
    ├── prompts/                                 # 📁 AI system prompts
    │   ├── README.md                             # 📄 Role announcement guide
    │   ├── documentation-writer.md
    │   ├── frontend-developer.md
    │   ├── backend-developer.md
    │   ├── software-architect.md
    │   ├── code-reviewer.md
    │   ├── qa-engineer.md
    │   ├── security-analyst.md
    │   ├── performance-engineer.md
    │   └── database-administrator.md
    │       ├── Full role-based system
    │       ├── Role selection guide
    │       ├── Role announcement examples
    │       └── Role-specific standards
    │
    └── quick-reference.md                       # 📄 100-200 lines
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

### 1. Main `.cursorrules` Loads First

```markdown
# ProjectName Cursor Rules

> **Modular Structure:** Detailed rules in `.cursor/rules/`

## Quick Context
- Project type, language, framework
- Tech stack summary
- Brief role announcement requirement

## Detailed Guidelines
- See `.cursor/rules/architecture.md` for patterns
- See `.cursor/rules/code-style.md` for naming
- See `.cursor/rules/git-workflow.md` for commits
- [etc...]

## Quick Reference
- See `.cursor/quick-reference.md` for commands
```

### 2. Cursor References Specific Files On-Demand

**When creating a component:**
→ Reads `.cursor/rules/architecture.md` for patterns
→ Reads `.cursor/rules/code-style.md` for naming
→ Announces role from `.cursor/prompts/system-prompts.md`

**When writing tests:**
→ Reads `.cursor/rules/testing.md` for patterns
→ Reads `.cursor/rules/code-style.md` for formatting
→ Adopts 🧪 QA Engineer role

**When making commits:**
→ Reads `.cursor/rules/git-workflow.md` for commit format
→ Suggests conventional commit message

## ✅ Benefits

### For Individual Developers
- **Faster navigation** - Jump directly to relevant file
- **Focused learning** - Read one topic at a time
- **Easy updates** - Modify specific sections without affecting others

### For Teams
- **Progressive onboarding** - New members learn gradually
- **Clear git diffs** - Changes to specific topics visible
- **Shared standards** - Copy `.cursor/rules/code-style.md` across projects
- **Customizable** - Each project can override specific files

### For Projects
- **Maintainable** - Update architecture without touching test rules
- **Scalable** - Add `.cursor/rules/deployment.md` as needed
- **Discoverable** - Clear folder structure shows what's documented
- **Version controllable** - Track changes per topic

## 🚀 Advanced Usage

### Share Across Projects

```bash
# Copy code style to another project
cp .cursor/rules/code-style.md ../other-project/.cursor/rules/

# Share testing patterns across team repos
cp .cursor/rules/testing.md ~/shared-configs/
```

### Extend for Your Needs

```bash
# Add new rule file
touch .cursor/rules/deployment.md
touch .cursor/rules/monitoring.md
touch .cursor/rules/api-design.md

# Update main .cursorrules to reference them
```

### Override for Specific Tasks

```
@cursor "Follow .cursor/rules/architecture.md but ignore performance rules for this prototype"
```

### Reference Specific Sections

```
@cursor "Use the commit format from .cursor/rules/git-workflow.md for this feature branch"
```

## 📝 Example: Main `.cursorrules` File

```markdown
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

**📖 Full documentation:** `.cursor/prompts/system-prompts.md`

## 📚 Detailed Guidelines

For comprehensive rules, see:

- **Architecture:** `.cursor/rules/architecture.md`
  - React component patterns
  - Express service layer
  - API design standards

- **Code Style:** `.cursor/rules/code-style.md`
  - TypeScript conventions
  - Naming standards
  - Documentation requirements

- **Git Workflow:** `.cursor/rules/git-workflow.md`
  - Feature branch strategy
  - Conventional commits
  - PR requirements

- **Testing:** `.cursor/rules/testing.md`
  - Jest + RTL patterns
  - Mock strategies
  - Coverage targets

- **Security:** `.cursor/rules/security.md`
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

**Full reference:** `.cursor/quick-reference.md`

---

**Version:** 2.0.0 (Modular Structure)
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

