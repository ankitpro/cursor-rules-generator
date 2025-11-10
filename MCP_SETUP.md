# MCP Server Setup Guide

This guide explains how to use the Cursor Rules Generator as an MCP (Model Context Protocol) server in Cursor IDE.

## 🎯 What is MCP?

MCP (Model Context Protocol) allows Cursor to connect to external tools, resources, and prompts. By setting up this MCP server, you can:

- **Access Templates**: Load the generator template directly in Cursor
- **Run Analysis Tools**: Analyze any project automatically
- **Generate Rules**: Create cursor rules with one command
- **Use Prompts**: Pre-built prompts for cursor rules generation

## 🚀 Quick Setup

### Step 1: Configure Cursor

Add the MCP server to your Cursor settings:

**On macOS/Linux:**
Edit `~/.cursor/mcp.json`

**On Windows:**
Edit `%APPDATA%\Cursor\mcp.json`

**Configuration:**

```json
{
  "mcpServers": {
    "cursor-rules-generator": {
      "command": "npx",
      "args": [
        "-y",
        "cursor-rules-generator-mcp@latest"
      ],
      "env": {
        "TEMPLATE_REPO_URL": "https://github.com/ankitpro/cursor-rules-generator.git"
      }
    }
  }
}
```

**That's it!** No installation, no cloning, no building. The MCP server runs via npx and automatically:
- ✅ Downloads the latest version
- ✅ Fetches templates from GitHub
- ✅ Analyzes your projects
- ✅ Generates cursor rules

### Step 2: Restart Cursor

Restart Cursor IDE to load the MCP server.

### Step 3: Verify Installation

Open Cursor and check if the MCP server is loaded:
1. Open the command palette (Cmd/Ctrl + Shift + P)
2. Look for MCP-related commands
3. Check the Cursor sidebar for the MCP section

## 📚 Usage

### Method 1: Using Prompts (Easiest)

In Cursor chat, use the built-in prompts:

```
Use the "generate-cursor-rules" prompt with projectPath="/path/to/your/project"
```

Or:

```
Use the "analyze-project" prompt with projectPath="/path/to/your/project"
```

### Method 2: Using Tools Directly

You can call the MCP tools directly:

**1. Analyze a Project:**
```
Use the analyze_project tool to analyze my project at /path/to/your/project
```

**2. Generate Cursor Rules:**
```
Use the generate_cursor_rules tool to create cursor rules for /path/to/your/project with approach "best_practices"
```

### Method 3: Using Resources

Access the generator template:

```
Load the template://generator-template resource
```

This gives you the full generator template to understand how cursor rules are created.

## 🛠️ Available Tools

### `analyze_project`
Analyzes a project to detect technologies, patterns, and structure.

**Parameters:**
- `projectPath` (required): Absolute path to the project root

**Returns:**
- Comprehensive analysis report
- Technology detection
- Code patterns
- Git workflow analysis

**Example:**
```json
{
  "tool": "analyze_project",
  "arguments": {
    "projectPath": "/Users/yourname/projects/my-app"
  }
}
```

### `generate_cursor_rules`
Generates modular .cursorrules files based on project analysis.

**Parameters:**
- `projectPath` (required): Absolute path to project root
- `approach` (optional): "current_patterns", "best_practices", or "hybrid"
- `analysisResult` (optional): Previous analysis result

**Returns:**
- List of generated files
- File structure summary

**Example:**
```json
{
  "tool": "generate_cursor_rules",
  "arguments": {
    "projectPath": "/Users/yourname/projects/my-app",
    "approach": "best_practices"
  }
}
```

## 📖 Available Resources

### `template://generator-template`
The master template for generating cursor rules. Contains all instructions for analyzing projects and generating modular cursor rules.

### `template://quick-start`
Quick start guide for using the cursor rules generator.

### `template://user-guide`
Complete user guide for the cursor rules generator.

## 💬 Available Prompts

### `generate-cursor-rules`
Full workflow to generate cursor rules for a project.

**Arguments:**
- `projectPath`: Absolute path to project

### `analyze-project`
Analyze a project to detect technologies and patterns.

**Arguments:**
- `projectPath`: Absolute path to project

## 🎯 Complete Workflow Example

Here's a complete example of using the MCP server:

```
1. Me: "I want to generate cursor rules for my project at /Users/me/projects/my-app"

2. Cursor: [Uses analyze_project tool]
   - Detects: React 18, TypeScript, Express, PostgreSQL
   - Analyzes: Code patterns, git workflow, testing
   - Presents: Comprehensive analysis report

3. Me: "Apply best practices"

4. Cursor: [Uses generate_cursor_rules tool with approach="best_practices"]
   - Generates: .cursorrules
   - Generates: .cursor/rules/*.md
   - Generates: .cursor/prompts/system-prompts.md
   - Reports: "Successfully generated 8 files"

5. Me: "Great! Commit these files"

6. Cursor: [Commits the files]
```

## 🔧 Configuration Options

### Change Template Repository

You can point the MCP server to a different template repository:

```json
{
  "mcpServers": {
    "cursor-rules-generator": {
      "command": "node",
      "args": ["/path/to/cursor-rules-generator/dist/index.js"],
      "env": {
        "TEMPLATE_REPO_URL": "https://github.com/your-org/your-custom-templates.git"
      }
    }
  }
}
```

### Use Local Repository

For development or offline use:

```json
{
  "mcpServers": {
    "cursor-rules-generator": {
      "command": "node",
      "args": ["/path/to/cursor-rules-generator/dist/index.js"],
      "env": {
        "TEMPLATE_REPO_URL": "file:///absolute/path/to/local/templates"
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Server Not Loading

1. Check that Node.js is installed: `node --version`
2. Verify the path to `dist/index.js` is correct
3. Check Cursor's MCP logs (usually in ~/.cursor/logs/)
4. Ensure the build was successful: `npm run build`

### Permission Errors

If you get permission errors:

```bash
chmod +x /path/to/cursor-rules-generator/dist/index.js
```

### Template Not Loading

The server clones templates to `~/.cursor-rules-generator-cache/`. If templates aren't loading:

```bash
# Clear the cache
rm -rf ~/.cursor-rules-generator-cache/

# Restart Cursor to re-clone
```

### Tools Not Working

If tools aren't responding:

1. Restart Cursor completely
2. Check the MCP configuration in `mcp.json`
3. Look for error messages in Cursor's console
4. Verify the project path is absolute (not relative)

## 📊 Comparison: MCP vs Folder Method

| Feature | MCP Server | Folder Method |
|---------|------------|---------------|
| **Setup** | One-time configuration | Copy folder per project |
| **Updates** | Auto-updates from GitHub | Manual copy each time |
| **Resources** | Access templates as resources | Need to read files |
| **Tools** | Built-in analysis tools | Manual analysis |
| **Prompts** | Pre-built prompts | Write prompts manually |
| **Maintenance** | Update once, applies everywhere | Update each project |

## 🌟 Best Practices

1. **Use Absolute Paths**: Always provide absolute paths to projects
2. **Check Analysis First**: Review the analysis before generating rules
3. **Choose Approach Carefully**: 
   - `current_patterns`: Document existing code as-is
   - `best_practices`: Apply industry standards
   - `hybrid`: Mix of both
4. **Review Generated Files**: Always review before committing
5. **Customize**: Feel free to edit generated files for your needs

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/ankitpro/cursor-rules-generator/issues)
- **Docs**: See main README.md for more details

---

## 👨‍💻 Author

**Ankit Agarwal**
- 📧 Email: [ankitagarwalpro@gmail.com](mailto:ankitagarwalpro@gmail.com)
- 🐙 GitHub: [@ankitpro](https://github.com/ankitpro)

---

**Happy cursor rules generation!** 🎉

