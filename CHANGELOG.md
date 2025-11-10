# Changelog

All notable changes to the Cursor Rules Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

