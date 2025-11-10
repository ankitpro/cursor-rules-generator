# Cursor Rules Generator

**Automatically generate production-quality, modular `.cursorrules` for any project**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](docs/CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> _"Empowering developers, one cursor rule at a time"_

---

## 🎯 What is This?

**Cursor Rules Generator** is an intelligent system that automatically analyzes your codebase and generates comprehensive, organized cursor rules with zero manual input.

Instead of writing rules manually or using generic templates, this system:
- 🔍 **Scans your repository** - Dependencies, structure, code patterns, git workflow, environment variables
- 📊 **Analyzes everything** - Compares your patterns against best practices
- 🎯 **Gives you options** - Use current patterns, adopt best practices, or hybrid
- 📁 **Generates modular structure** - Organized files instead of one massive document
- 🎭 **Includes role-based system** - Cursor automatically adopts appropriate expert roles

---

## ✨ Key Features

### 🤖 Fully Automated
- **One simple prompt** - No manual project description needed
- **Intelligent scanning** - Detects all technologies, frameworks, patterns
- **Zero placeholders** - All values from actual codebase analysis

### 📁 Modular Structure
Generates organized structure instead of single massive file:
```
your-project/
├── .cursorrules              # Main entry point (~150 lines)
└── .cursor/
    ├── rules/                # Topic-specific detailed rules
    │   ├── architecture.md
    │   ├── code-style.md
    │   ├── git-workflow.md
    │   ├── testing.md
    │   ├── security.md
    │   └── performance.md
    ├── prompts/              # Modular role-based system
    │   ├── README.md         # Role announcement guide
    │   ├── documentation-writer.md
    │   ├── frontend-developer.md
    │   ├── backend-developer.md
    │   ├── software-architect.md
    │   ├── code-reviewer.md
    │   ├── qa-engineer.md
    │   ├── security-analyst.md
    │   ├── performance-engineer.md
    │   └── database-administrator.md
    └── quick-reference.md    # Commands & patterns
```

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

Scan my repository and generate comprehensive .cursorrules based on my actual codebase.

# Commit and cleanup
git add .cursorrules .cursor/
git commit -m "chore: Add cursor rules"
rm -rf cursor-rules-generator
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **[README.md](README.md)** | Project overview - Start here! |
| **[MCP_SETUP.md](MCP_SETUP.md)** | **NEW!** MCP Server setup guide |
| **[QUICK_START.md](QUICK_START.md)** | 5-minute setup guide (folder method) |
| **[docs/USER_GUIDE.md](docs/USER_GUIDE.md)** | Complete user guide |
| **[docs/GENERATOR_TEMPLATE.md](docs/GENERATOR_TEMPLATE.md)** | Master template (for Cursor AI) |
| **[docs/STRUCTURE_EXAMPLE.md](docs/STRUCTURE_EXAMPLE.md)** | Visual example of generated structure |
| **[docs/CHANGELOG.md](docs/CHANGELOG.md)** | v2.0 features and changelog |
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
- Main `.cursorrules` with quick context
- `.cursor/rules/` with detailed topic files
- `.cursor/prompts/` with individual role files (each role has its own file for easy customization!)
- `.cursor/quick-reference.md` with commands

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
Scan my repository and generate comprehensive .cursorrules
```

**Transform your development workflow with intelligent, automated cursor rules!** 🎊

---

## 📦 Installation Scripts

- `./install-mcp.sh` - Automated MCP server setup
- `./verify-setup.sh` - Verify installation is correct

---

**Version:** 2.0.0  
**Last Updated:** November 10, 2025  
**Status:** ✅ Production Ready

