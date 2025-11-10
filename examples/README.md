# Examples

This directory contains example configurations and usage scenarios for the Cursor Rules Generator.

## Files

### ⚙️ [cursor-mcp-config.json](cursor-mcp-config.json)
**Example MCP configuration** for `~/.cursor/mcp.json`

Shows how to configure the MCP server in Cursor IDE:
```json
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

Copy this configuration to your `~/.cursor/mcp.json` file to get started!

### 📝 [usage-example.md](usage-example.md)
**Real-world usage examples** showing:
- How to analyze different types of projects
- Step-by-step generation workflows
- Customization options
- Common use cases and patterns

## Quick Start

1. Copy the MCP configuration from `cursor-mcp-config.json` to `~/.cursor/mcp.json`
2. Restart Cursor IDE
3. In any project, ask Cursor: "Generate cursor rules for this project"
4. Review the generated files in `.cursorrules` and `.cursor/` directory

## Need More Help?

- See the main [README.md](../README.md)
- Read the [Quick Start Guide](../QUICK_START.md)
- Check the [MCP Setup Guide](../MCP_SETUP.md)
- Review the [User Guide](../docs/USER_GUIDE.md)

---

**Author:** Ankit Agarwal
- 📧 Email: [ankitagarwalpro@gmail.com](mailto:ankitagarwalpro@gmail.com)
- 🐙 GitHub: [@ankitpro](https://github.com/ankitpro)

