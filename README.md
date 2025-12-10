# Cursor Rules Generator

**Automatically generate production-quality, modular cursor rules with `.mdc` format and AGENTS.md support**

[![Version](https://img.shields.io/badge/version-3.3.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> _"Empowering developers with official Cursor rules format"_

---

## 🎯 What is This?

**Cursor Rules Generator** is an intelligent system that automatically analyzes your codebase and generates comprehensive, organized cursor rules using the official Cursor format with zero manual input.

**NEW in v3.1:** Full support for the official Cursor rules format with `.mdc` (MDC) frontmatter metadata and `AGENTS.md` alternative format!

Instead of writing rules manually or using generic templates, this system:
- 🔍 **Scans your repository** - Dependencies, structure, code patterns, git workflow, environment variables
- 📊 **Analyzes everything** - Compares your patterns against best practices
- 🎯 **Gives you options** - Use current patterns, adopt best practices, or hybrid
- 📁 **Generates modular structure** - Organized files with official `.mdc` format
- ✨ **MDC Frontmatter** - Each rule includes metadata for intelligent application
- 📝 **AGENTS.md Support** - Optional simple markdown alternative
- 🎭 **Includes role-based system** - Cursor automatically adopts appropriate expert roles

---

## ✨ Key Features

### 🤖 Fully Automated
- **One simple prompt** - No manual project description needed
- **Intelligent scanning** - Detects all technologies, frameworks, patterns
- **Zero placeholders** - All values from actual codebase analysis

### 📁 Modular Structure with Official Format
Generates organized structure using official Cursor `.mdc` format with **nested rules**:
```
your-project/
├── AGENTS.md                 # Optional: Simple markdown alternative
├── frontend/                 # 🌳 NEW: Nested rules for frontend
│   └── .cursor/
│       └── rules/
│           └── main.mdc      # Frontend-specific rules
├── backend/                  # 🌳 NEW: Nested rules for backend
│   └── .cursor/
│       └── rules/
│           └── main.mdc      # Backend-specific rules
└── .cursor/
    ├── rules/                # Topic-specific rules with MDC frontmatter
    │   ├── main.mdc          # Main entry point with project context
    │   ├── architecture.mdc  # Each includes metadata for intelligent application
    │   ├── code-style.mdc    # description: Applied based on context
    │   ├── git-workflow.mdc  # globs: File patterns (optional)
    │   ├── testing.mdc       # alwaysApply: Auto-application flag
    │   ├── security.mdc
    │   └── performance.mdc
    ├── prompts/              # Modular role-based system (custom extension)
    │   ├── README.mdc        # Role announcement guide
    │   ├── documentation-writer.mdc
    │   ├── frontend-developer.mdc
    │   ├── backend-developer.mdc
    │   ├── software-architect.mdc
    │   ├── code-reviewer.mdc
    │   ├── qa-engineer.mdc
    │   ├── security-analyst.mdc
    │   ├── performance-engineer.mdc
    │   └── database-administrator.mdc
    └── quick-reference.mdc   # Commands & patterns
```

**🌳 Nested Rules:** Automatically creates subdirectory-specific rules that apply when working in:
- `frontend/` - UI components, state management, styling
- `backend/` - API logic, database, authentication
- `api/` - Endpoint definitions and validation
- `services/` - Business logic layer
- `packages/` - Monorepo package development
- `apps/` - Monorepo applications
- `terraform/` - Infrastructure as code (IaC)
- `packer/` - Image building automation
- `kubernetes/` or `k8s/` - Container orchestration
- `ansible/` - Configuration management
- `docker/` - Containerization
- `helm/` - Kubernetes package management

Learn more: https://cursor.com/docs/context/rules | Community: https://cursor.directory/rules

### 🆕 What's New in v3.4

- 🚀 **Technology Folder Support**: Detects and creates nested rules for DevOps/infrastructure folders (terraform, packer, kubernetes, ansible, docker, helm)
- 📖 **Community Resources**: All rules now reference [cursor.directory/rules](https://cursor.directory/rules) for examples
- 🔧 **Comprehensive Templates**: Specialized guidelines for each technology with best practices
- 🎯 **Smart Detection**: Recognizes both standard and shorthand directory names (kubernetes/k8s)

### Previous Updates (v3.3)

- 🌳 **Nested Rules Support**: Automatically generates subdirectory-specific rules for better organization
- 📁 **Smart Directory Detection**: Identifies frontend/, backend/, api/, and other key directories
- 🎯 **Context-Aware Rules**: Rules automatically apply when working in specific directories
- 📚 **Enhanced Structure**: Follows official Cursor nested rules pattern

### Previous Updates (v3.2)

- ✨ **Official MDC Format**: All `.mdc` files now include frontmatter metadata
- 📝 **AGENTS.md Support**: Optional simple markdown alternative
- 🗑️ **Removed Deprecated `.cursorrules`**: Now uses `.cursor/rules/main.mdc` as main entry
- 📚 **Updated Documentation**: Aligned with official Cursor documentation
- 🎯 **Rule Metadata**: Each rule includes `description`, `globs`, and `alwaysApply` fields
- 🔗 **Official Links**: References to https://cursor.com/docs/context/rules

### 🌍 Universal Support
- **Languages:** JavaScript/TypeScript, Python, Go, Rust, Ruby, Java, PHP, Dart, Elixir, Swift
- **Frameworks:** React, Vue, Angular, Next.js, FastAPI, Django, Flask, Express, and more
- **Project Types:** Web apps, APIs, mobile apps, CLI tools, libraries, microservices

### 🎭 Role-Based System
Cursor automatically announces and adopts appropriate expert roles:
- 📝 Documentation Writer
- ⚛️ Frontend Developer
- 🔧 Backend Developer
- 🏗️ Software Architect
- 🧪 QA Engineer
- 🔒 Security Analyst
- And more...

### 🎨 Template Library (NEW in v3.0!)
Start with pre-built templates for popular tech stacks, then let our analyzer customize them for your project:

**Available Templates:**

**Frameworks:**
- ⚛️ React + TypeScript + Tailwind
- ⚡ Next.js App Router
- 🐍 Python FastAPI
- 🌐 Django REST Framework
- 💚 Vue 3 + TypeScript
- 🚀 Express + TypeScript

**Full Stacks:**
- 🎯 Full-Stack TypeScript
- 🏗️ Microservices Architecture

**Languages:**
- 🐍 Python Best Practices
- 🦀 Rust Patterns

**DevOps & Cloud (NEW!):**
- 🔧 Terraform + AWS
- ☸️ Kubernetes + Helm
- 🐳 Docker Compose
- 🔄 GitHub Actions CI/CD

**How It Works:**
1. **Optional:** Choose a template: `"List available templates"`
2. **Automatic:** Analyzer scans your codebase
3. **Smart Merge:** Template best practices + your patterns
4. **Result:** Best of both worlds!

See [TEMPLATES.md](TEMPLATES.md) for details on each template.

---

## 🚀 Quick Start

### Method 1: MCP Server (Recommended)

Set up once, use everywhere! The MCP server integrates directly with Cursor.

**No installation needed** - uses npx to run automatically!

```json
# Add to ~/.cursor/mcp.json:
{
  "mcpServers": {
    "cursor-rules-generator": {
      "command": "npx",
      "args": ["-y", "cursor-rules-generator-mcp@latest"],
      "env": {
        "TEMPLATE_REPO_URL": "https://github.com/ankitpro/cursor-rules-generator.git"
      }
    }
  }
}
```

**That's it!** Restart Cursor, then use in any project:
```
"Generate cursor rules for /path/to/my/project"
```

The MCP server automatically:
- ✅ Fetches latest templates from GitHub
- ✅ Analyzes your project
- ✅ Generates cursor rules
- ✅ No manual installation required!

**📖 Full MCP Setup Guide:** [MCP_SETUP.md](MCP_SETUP.md)

### Method 2: Folder Method (Traditional)

Copy the folder to each project:

```bash
# Clone and copy to your project
git clone https://github.com/ankitpro/cursor-rules-generator.git
cp -r cursor-rules-generator /path/to/your/project/
cd /path/to/your/project

# In Cursor:
@cursor-rules-generator

Scan my repository and generate comprehensive cursor rules based on my actual codebase.

# Commit and cleanup
git add .cursor/ AGENTS.md
git commit -m "chore: Add cursor rules"
rm -rf cursor-rules-generator
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **[README.md](README.md)** | Project overview - Start here! |
| **[TEMPLATES.md](TEMPLATES.md)** | **NEW v3.0!** Template library guide |
| **[CHANGELOG.md](CHANGELOG.md)** | **v3.0** features and changelog |
| **[MCP_SETUP.md](MCP_SETUP.md)** | MCP Server setup guide |
| **[QUICK_START.md](QUICK_START.md)** | 5-minute setup guide (folder method) |
| **[docs/USER_GUIDE.md](docs/USER_GUIDE.md)** | Complete user guide |
| **[docs/GENERATOR_TEMPLATE.md](docs/GENERATOR_TEMPLATE.md)** | Master template (for Cursor AI) |
| **[docs/STRUCTURE_EXAMPLE.md](docs/STRUCTURE_EXAMPLE.md)** | Visual example of generated structure |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Contribution guidelines |

---

## 💡 How It Works

### Step 1: Automated Analysis

Cursor scans your repository:
- 📦 **Dependencies** - package.json, requirements.txt, go.mod, etc.
- 🏗️ **Structure** - Monorepo, frontend/backend split, folder organization
- 📝 **Code Patterns** - Naming conventions, error handling, function patterns
- 🌳 **Git Workflow** - Branches, commits, versioning
- ⚙️ **Environment** - .env files, configuration
- 🧪 **Testing** - Framework, patterns, coverage

### Step 2: Analysis Report

Cursor generates comprehensive report:
```
🔍 Repository Analysis Complete

📦 Detected Technologies:
- Frontend: React 18.2.0 with TypeScript
- Backend: Node.js 20.x with Express 4.x
- Database: PostgreSQL
- Testing: Jest + React Testing Library

📝 Code Patterns Found:
✅ Consistent camelCase for functions
⚠️ Mixed error handling (suggest standardization)
❌ No JSDoc comments found

💡 Recommendations:
1. Add JSDoc to public APIs
2. Standardize error handling
3. Adopt conventional commits

🎯 Choose:
A) Use current patterns (as-is documentation)
B) Apply best practices (with improvements)
C) Hybrid approach (choose per topic)
```

### Step 3: Modular Generation

Based on your choice, Cursor creates:
- `.cursor/rules/main.mdc` with quick context (main entry point)
- `.cursor/rules/` with detailed topic files
- `.cursor/prompts/` with individual role files (each role has its own file for easy customization!)
- `.cursor/quick-reference.mdc` with commands
- Optional `AGENTS.md` for simple setups

---

## 🎯 Use Cases

### For Individual Developers
- 🚀 **New Projects** - Set up quality standards from day one
- 📚 **Existing Projects** - Document actual patterns and conventions
- 🔄 **Multiple Projects** - Maintain consistency across repos

### For Teams
- 👥 **Onboarding** - New members learn standards progressively
- 📊 **Code Reviews** - Standardized patterns for consistent reviews
- 🔄 **Collaboration** - Share and sync coding standards

### For Organizations
- 🏢 **Multi-team Projects** - Ensure consistency across teams
- 📈 **Quality Standards** - Enforce best practices automatically
- 🔧 **Maintenance** - Easy updates to standards over time

---

## 🌟 Examples

### React + Node.js Full-Stack
Automatically detects and documents:
- React hooks patterns
- Material-UI component usage
- Express service layer
- Jest + React Testing Library
- PostgreSQL parameterized queries

### Python FastAPI Backend
Automatically detects and documents:
- Async/await patterns
- Type hints usage
- Pydantic models
- pytest patterns
- SQLAlchemy queries

### Go Microservices
Automatically detects and documents:
- Package organization
- Error handling patterns
- Testing with table-driven tests
- Docker deployment
- gRPC or REST API design

---

## 🎓 Learning Path

### New to Cursor Rules?
1. Read [QUICK_START.md](QUICK_START.md) - 5-minute setup
2. Try in a test project first
3. Review generated files
4. Explore [docs/STRUCTURE_EXAMPLE.md](docs/STRUCTURE_EXAMPLE.md)
5. Read [docs/USER_GUIDE.md](docs/USER_GUIDE.md) for details

### Migration from v1.0?
1. Review [docs/CHANGELOG.md](docs/CHANGELOG.md)
2. Regenerate with v2.0 for modular structure
3. Migrate custom rules to appropriate files

---

## 🤝 Contributing

Contributions are welcome and encouraged! Whether you're fixing bugs, adding features, or improving documentation, your input is valued.

**📚 See [CONTRIBUTING.md](CONTRIBUTING.md) for complete guidelines**

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m "feat: Your feature description"`
6. Push and create a Pull Request

### Areas for Contribution

- [ ] 🌍 Add support for more languages/frameworks
- [ ] 📐 Create rule templates for common project types
- [ ] 🧪 Add comprehensive tests
- [ ] 🔧 Add CI/CD integration checks
- [ ] 📊 Build rule validation tool
- [ ] 🌐 Create community rule sharing platform
- [ ] 📝 Improve documentation and examples

**All skill levels welcome!** See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 👨‍💻 Author

**Ankit Agarwal**

- 📧 Email: [ankitagarwalpro@gmail.com](mailto:ankitagarwalpro@gmail.com)
- 🐙 GitHub: [@ankitpro](https://github.com/ankitpro)
- 💡 Mission: Making Cursor development more efficient for everyone

_"Born from real-world needs, built for real-world developers."_

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 🙏 Acknowledgments

- Inspired by the Cursor community
- Based on production experience and best practices from real-world usage
- Built for developers, by developers

---

## 📞 Support

- 💬 **GitHub Issues:** For bug reports and feature requests
- 📚 **Documentation:** Comprehensive guides in this repository
---

## 🚀 Get Started Now

### MCP Server (Recommended)
```json
# Add to ~/.cursor/mcp.json:
{
  "mcpServers": {
    "cursor-rules-generator": {
      "command": "npx",
      "args": ["-y", "cursor-rules-generator-mcp@latest"],
      "env": {
        "TEMPLATE_REPO_URL": "https://github.com/ankitpro/cursor-rules-generator.git"
      }
    }
  }
}

# Restart Cursor, then use in any project:
"Generate cursor rules for /path/to/my/project"
```

### Folder Method (Traditional)
```bash
# Clone and copy to your project
git clone https://github.com/ankitpro/cursor-rules-generator.git
cp -r cursor-rules-generator /path/to/your/project/

# Open in Cursor:
@cursor-rules-generator
Scan my repository and generate comprehensive cursor rules
```

**Transform your development workflow with intelligent, automated cursor rules!** 🎊

---

## 📦 Installation Scripts

- `./install-mcp.sh` - Automated MCP server setup
- `./verify-setup.sh` - Verify installation is correct

---

**Version:** 3.4.0  
**Last Updated:** December 10, 2024  
**Status:** ✅ Production Ready

