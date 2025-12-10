# Changelog

All notable changes to the Cursor Rules Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.4.0] - 2024-12-10

### 🚀 Major Feature: Technology Folder Support

This release extends nested rules support to include technology-based folders commonly found in infrastructure and DevOps projects.

### Added

- 🔧 **Technology Folder Detection**: Automatically detects and creates nested rules for:
  - `terraform/` - Terraform IaC rules (variables, modules, state management)
  - `packer/` - Packer image building rules (templates, provisioners)
  - `kubernetes/` or `k8s/` - Kubernetes orchestration rules (deployments, services, best practices)
  - `ansible/` - Ansible automation rules (playbooks, roles, inventory)
  - `docker/` - Docker containerization rules (Dockerfile best practices, compose)
  - `helm/` - Helm chart rules (templates, values, versioning)
- 📖 **Community Resources**: All nested rules now include reference to [cursor.directory/rules](https://cursor.directory/rules) for community examples
- 🏗️ **Comprehensive Templates**: Six new specialized template generators for DevOps/infrastructure technologies
- 🎯 **Smart Detection**: Recognizes both standard (`kubernetes`) and shorthand (`k8s`) directory names

### Enhanced

- 📊 **Type System**: Extended to support all technology folder types
- 🔍 **Structure Analyzer**: Now detects infrastructure and DevOps directories
- 📚 **Documentation**: Each technology template includes best practices, security guidelines, and common patterns

### Technology-Specific Guidelines Include

- **Terraform**: Variable validation, module structure, state management, security
- **Packer**: HCL2 templates, provisioners, image naming, build optimization
- **Kubernetes**: Resource organization, security contexts, RBAC, high availability
- **Ansible**: Playbook structure, idempotency, roles, vault for secrets
- **Docker**: Multi-stage builds, security, layer caching, compose patterns
- **Helm**: Chart structure, templating, values organization, versioning

---

## [3.3.0] - 2024-12-10

### 🌳 Major Feature: Nested Rules Support

This release adds support for **nested rules**, following the official Cursor documentation pattern where subdirectories can have their own `.cursor/rules/` directories.

### Added

- 🌳 **Nested Rules Generation**: Automatically generates subdirectory-specific rules for better organization
- 📁 **Smart Directory Detection**: Identifies and creates rules for:
  - `frontend/` - Frontend-specific rules (UI, components, state management)
  - `backend/` - Backend-specific rules (API, database, authentication)
  - `api/` - API-specific rules (endpoints, validation)
  - `services/` - Service layer rules (business logic)
  - `packages/` - Monorepo package rules
  - `apps/` - Monorepo application rules
- 🎯 **Context-Aware Rules**: Nested rules automatically apply when working with files in their directories
- 📝 **Template Generators**: Six specialized template generators for different directory types
- 🔧 **Configuration**: Enabled by default, can be controlled via `generateNestedRules` option

### Enhanced

- 📊 **Structure Analyzer**: Enhanced to detect nested rule candidates automatically
- 🏗️ **Type System**: Updated types to support nested rules structure
- 📚 **Documentation**: Updated README with nested rules examples and patterns

### File Structure

```
your-project/
├── frontend/
│   └── .cursor/rules/
│       └── main.mdc      # Frontend-specific rules
├── backend/
│   └── .cursor/rules/
│       └── main.mdc      # Backend-specific rules
└── .cursor/
    └── rules/
        ├── main.mdc      # Project-wide rules
        └── ...
```

### Benefits

- **Better Organization**: Scope rules to specific parts of your codebase
- **Automatic Context**: Rules apply automatically when working in directories
- **Cleaner Structure**: Follows official Cursor nested rules pattern
- **Reduced Noise**: Only relevant rules apply in each context

### References

- Official Cursor Nested Rules Documentation: https://cursor.com/docs/context/rules
- Example: "Organize rules by placing them in `.cursor/rules` directories throughout your project"

---

## [3.2.0] - 2025-12-03

### 🗑️ Breaking Change: Removed Deprecated `.cursorrules` File

This release removes the deprecated `.cursorrules` file and fully adopts the official Cursor `.cursor/rules/` directory structure as per https://cursor.com/docs/context/rules

### Changed

- 🗑️ **Removed `.cursorrules`**: No longer generates deprecated `.cursorrules` file at project root
- 📁 **New Main Entry Point**: Main rules now in `.cursor/rules/main.mdc` with `alwaysApply: true`
- 📚 **Updated Documentation**: All references to `.cursorrules` replaced with `.cursor/rules/` structure

### Migration Guide

**For Existing Users:**
1. Delete your existing `.cursorrules` file
2. Regenerate rules to get new `.cursor/rules/main.mdc` structure
3. All rule content is now in `.cursor/rules/` directory

**File Structure Changes:**
```
Before (v3.1):
├── .cursorrules          # Deprecated - no longer generated
└── .cursor/rules/...

After (v3.2):
└── .cursor/
    ├── rules/
    │   ├── main.mdc      # New main entry point
    │   ├── architecture.mdc
    │   └── ...
```

### References

- Official Cursor Rules Documentation: https://cursor.com/docs/context/rules
- The `.cursorrules` file is being deprecated by Cursor in favor of `.cursor/rules/` directory

---

## [3.1.0] - 2025-11-19

### 🎉 Major Update: Official Cursor Rules Format Support

This release aligns the project with the official Cursor rules format as documented at https://cursor.com/docs/context/rules

### Added

- ✨ **MDC Frontmatter Support**: All `.mdc` files now include frontmatter metadata with `description`, `globs`, and `alwaysApply` fields
- 📝 **AGENTS.md Generation**: Optional simple markdown alternative to `.cursorrules` for straightforward project instructions
- 📚 **Official Format Compliance**: Generated rules follow official Cursor MDC format specifications
- 🔗 **Documentation Links**: References to official Cursor documentation throughout generated files
- ⚡ **Intelligent Rule Application**: MDC metadata enables context-aware rule application by Cursor AI

### Changed

- 🔄 **File Extensions**: All rule files now use `.mdc` extension (MDC format) with frontmatter metadata
- 📋 **Deprecation Note**: `.cursorrules` file now includes deprecation information and migration guidance
- 🎯 **Rule Metadata**: Each generated rule includes structured metadata for better AI understanding
- 📖 **Documentation Updates**: All guides updated to reflect official Cursor rules format
- 🏗️ **Template Structure**: Templates updated with MDC frontmatter in all generators

### Improved

- 🤖 **AI Context**: Better context understanding through descriptive metadata
- 📊 **Rule Organization**: Clearer rule purpose through frontmatter descriptions
- 🎨 **Customization**: Easier customization through structured metadata fields
- 📚 **Documentation**: Comprehensive guides for MDC format and AGENTS.md usage

### Technical Changes

- Added `generateAgentsMd` option to `GenerationOptions` interface
- Added `agentsMd` field to `GenerationResult` structure  
- Created `agentsMdTemplate.ts` for AGENTS.md generation
- Updated all template generators to include MDC frontmatter
- Updated type definitions for AGENTS.md support

### Migration Guide

**For Existing Users:**
1. Regenerate rules to get new `.mdc` format with metadata
2. Optionally add `AGENTS.md` for simpler alternative format
3. Review MDC frontmatter in each rule file
4. Customize `globs` and `alwaysApply` fields as needed

**File Format Changes:**
- Files now include MDC frontmatter block with metadata
- All `.mdc` files have `description`, `globs`, and `alwaysApply` fields

**New Features:**
- Set `generateAgentsMd: true` to generate `AGENTS.md`
- Customize rule application via MDC frontmatter
- Reference official Cursor docs for advanced usage

### References

- Official Cursor Rules Documentation: https://cursor.com/docs/context/rules
- MDC Format: Frontmatter with `description`, `globs`, `alwaysApply`
- AGENTS.md: Simple markdown alternative for basic instructions

---

## [3.0.3] - 2025-11-18

### 🔧 Fixed

- **File Extension Change**: Changed all generated files in `.cursor/` folder from `.md` to `.mdc` extension
  - Updated `rules/` files (architecture, code-style, git-workflow, testing, security)
  - Updated `prompts/` files (README and all role files)
  - Updated `quick-reference` file
  - This ensures proper file type recognition in Cursor IDE

### 📝 Documentation

- Updated README.md to reflect `.mdc` file extensions in the structure examples
- Updated all documentation references to use `.mdc` extensions for generated files

## [3.0.0] - 2025-11-10

### 🎉 Major Feature: Template Library System

**BREAKING CHANGE:** MCP tool schemas updated with optional template parameters (backward compatible).

#### 🎨 Added - Template Library

**14 Pre-Built Templates:**

**Frameworks (6):**
- React + TypeScript + Tailwind CSS
- Next.js 14+ App Router
- Python FastAPI (Async)
- Django REST Framework
- Vue 3 + TypeScript (Composition API)
- Express + TypeScript

**Full Stacks (2):**
- Full-Stack TypeScript (Monorepo)
- Microservices Architecture

**Languages (2):**
- Python Best Practices
- Rust Development Patterns

**DevOps & Cloud (4):**
- Terraform + AWS Infrastructure
- Kubernetes + Helm
- Docker Compose Development
- GitHub Actions CI/CD

#### 🛠️ New Features

1. **Template Selection System**
   - Browse templates by category (framework, language, stack, specialized)
   - Filter templates by tags
   - Get AI-suggested templates based on project analysis

2. **Three Merge Strategies**
   - `template-first`: Template as base + analysis insights
   - `analysis-first`: Analysis as base + template best practices
   - `balanced` (default): Equal merge of both

3. **New MCP Tools**
   - `list_templates`: Browse available templates
   - `suggest_templates`: Get recommendations based on analysis
   - Enhanced `generate_cursor_rules`: Now supports optional template parameter

4. **Smart Template Merging**
   - Automatic detection of applicable templates
   - Intelligent merging of template content with project analysis
   - Preserves project-specific patterns while adding best practices

#### 📚 Documentation

- **NEW:** [TEMPLATES.md](TEMPLATES.md) - Complete template library documentation
- Updated README.md with template library section
- Updated MCP_SETUP.md with template usage examples
- Enhanced CHANGELOG with feature breakdown

#### 🔄 Changed

- MCP server version updated to 3.0.0
- `generate_cursor_rules` tool schema now accepts optional `template` parameter
- Generator function updated to support template merging
- Template system architecture integrated into core

#### 💡 Benefits

- **Quick Start**: Pre-built templates for popular stacks
- **Community Wisdom**: Best practices from awesome-cursorrules
- **Still Automated**: Templates are optional enhancements
- **Fully Customized**: Smart merge with your actual codebase
- **Backward Compatible**: Works without templates too

#### 📖 Credits

Templates inspired by [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) community.

#### 🔗 Migration Guide

**No migration needed!** Templates are optional features:

**Existing workflow (still works):**
```
"Generate cursor rules for my project"
```

**New workflow with templates:**
```
"List available templates"
"Generate cursor rules using the React TypeScript template"
```

---

## [2.1.0] - 2025-11-10

### 🎯 Major Feature: Modular Role System

**Breaking Change:** Switched from single `system-prompts.md` to individual role files for better customization.

#### Added
- **Individual role files** in `.cursor/prompts/`:
  - `README.md` - Role announcement guide and overview
  - `documentation-writer.md` - Technical writing role
  - `frontend-developer.md` - Frontend development role
  - `backend-developer.md` - Backend development role
  - `software-architect.md` - Architecture design role
  - `code-reviewer.md` - Code review role
  - `qa-engineer.md` - Testing and QA role
  - `security-analyst.md` - Security review role
  - `performance-engineer.md` - Performance optimization role
  - `database-administrator.md` - Database operations role
  - Plus project-specific roles (monorepo-manager, build-engineer)

#### Changed
- **File Structure**: Replaced single `system-prompts.md` with 10+ modular role files
- **Customization**: Users can now edit individual roles without touching others
- **Organization**: Each role is self-contained with clear responsibilities
- **Documentation**: Updated all docs to reflect new structure

#### Benefits
- ✅ **Easier Customization**: Edit only the roles you want to change
- ✅ **Better Organization**: Each role has its own dedicated file
- ✅ **Clearer Context**: Role-specific documentation in focused files
- ✅ **Reduced Clutter**: No need to scroll through a 500-line file
- ✅ **Git-Friendly**: Better diffs when roles change

#### Migration
- Existing projects with `system-prompts.md` will continue to work
- Re-run the generator to get the new modular structure
- Previous `system-prompts.md` can be safely deleted after regeneration

---

## [2.0.0] - 2025-11-10

### Added - MCP Server Support 🎉

#### MCP (Model Context Protocol) Integration
- **Full MCP Server implementation** - Use as an MCP server in Cursor IDE
- **GitHub repository configuration** - Point to any GitHub repo for templates
- **Automatic repository cloning and caching** - Templates auto-update from GitHub
- **MCP Resources** - Access generator templates as resources in Cursor
- **MCP Prompts** - Pre-built prompts for cursor rules generation
- **MCP Tools** - Comprehensive project analysis and generation tools

#### Tools
- `analyze_project` - Comprehensive project analysis with technology detection
- `generate_cursor_rules` - Generate modular cursor rules files
- Individual analyzers for dependencies, structure, code patterns, git workflow

#### Resources
- `template://generator-template` - Master generation template
- `template://quick-start` - Quick start guide
- `template://user-guide` - Complete user guide

#### Prompts
- `generate-cursor-rules` - Full cursor rules generation workflow
- `analyze-project` - Project analysis workflow

#### Analysis Features
- **Dependency Detection** - Automatically detects languages, frameworks, UI libraries, databases
- **Structure Analysis** - Detects monorepos, frontend/backend splits, test organization
- **Code Pattern Analysis** - Naming conventions, error handling, documentation coverage
- **Git Workflow Analysis** - Branch strategies, commit formats, versioning approaches
- **Environment Analysis** - Detects .env files, configuration, secrets
- **Testing Analysis** - Test frameworks, patterns, coverage configuration

#### Generation Features
- **Modular Structure** - Generates organized .cursor/ directory structure
- **8 Specialized Files** - Main rules + 7 detailed topic files
- **Three Approaches** - Current patterns, best practices, or hybrid
- **Framework-Specific Templates** - React, Vue, Express, FastAPI, Django, and more
- **Language-Specific Conventions** - JavaScript/TypeScript, Python, Go, Rust

### Documentation
- **MCP_SETUP.md** - Complete MCP server setup guide
- **examples/usage-example.md** - 10+ practical usage examples
- **examples/cursor-mcp-config.json** - Example MCP configuration
- Updated README with MCP setup instructions
- Added troubleshooting section for MCP

### Technical Improvements
- Built with TypeScript for type safety
- Modular architecture for easy maintenance
- Comprehensive error handling
- Git repository caching for performance
- Template versioning support

### Changed
- **Primary Usage Method** - MCP server is now the recommended approach
- **README Structure** - Updated with MCP-first documentation
- **Quick Start** - Now shows both MCP and folder methods

### Maintained Backward Compatibility
- Traditional folder method still fully supported
- All v1.0 features still work
- Existing documentation preserved

## [1.0.0] - 2024-10-30

### Initial Release

#### Core Features
- Automated project analysis
- Template-based cursor rules generation
- Modular file structure (.cursorrules + .cursor/)
- Role-based system prompts
- Support for 10+ programming languages
- Support for 20+ frameworks

#### Documentation
- README.md with comprehensive overview
- QUICK_START.md for fast setup
- GENERATOR_TEMPLATE.md for AI instructions
- USER_GUIDE.md with detailed guidance
- STRUCTURE_EXAMPLE.md with visual examples
- CONTRIBUTING.md for contributors

#### Supported Technologies
- **Languages**: JavaScript, TypeScript, Python, Go, Rust, Ruby, Java, PHP
- **Frontend**: React, Vue, Angular, Next.js
- **Backend**: Express, FastAPI, Django, Flask
- **Databases**: PostgreSQL, MySQL, MongoDB
- **Testing**: Jest, pytest, Cypress, Playwright

#### Features
- Dependency detection from package files
- Code pattern analysis
- Git workflow detection
- Documentation coverage analysis
- Environment variable detection
- Test framework detection

---

## Future Plans

### [2.1.0] - Planned
- [ ] Web UI for configuration
- [ ] Template marketplace
- [ ] Custom rule templates
- [ ] AI-powered rule suggestions
- [ ] Integration with popular IDEs beyond Cursor
- [ ] Rule validation and linting
- [ ] Team collaboration features

### [3.0.0] - Ideas
- [ ] Rule analytics and metrics
- [ ] Automated rule updates based on codebase changes
- [ ] Multi-language project support (mixed codebases)
- [ ] CI/CD integration for rule enforcement
- [ ] VSCode extension
- [ ] JetBrains plugin

---

## Migration Guides

### From v1.0 to v2.0

**If you used the folder method:**
- Continue using as before - fully compatible
- Consider migrating to MCP server for better experience
- MCP setup takes ~5 minutes

**Benefits of migrating to MCP:**
- ✅ No more copying folders between projects
- ✅ Automatic template updates from GitHub
- ✅ Works across all your projects
- ✅ Access to MCP resources and prompts
- ✅ Better integration with Cursor

**Migration Steps:**
1. Follow [MCP_SETUP.md](MCP_SETUP.md)
2. Configure `~/.cursor/mcp.json`
3. Restart Cursor
4. Test with one project
5. Remove copied folders from projects

---

## Contributors

- **Ankit Agarwal** - Initial work and MCP implementation
- Open source contributors welcome!

## Acknowledgments

- Built for the developer community
- Inspired by real-world development workflows
- Thanks to all who provided feedback and suggestions

---

**Questions or Issues?** Open an issue on GitHub

