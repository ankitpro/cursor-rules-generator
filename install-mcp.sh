#!/bin/bash

# Cursor Rules Generator MCP Server Installation Script
# This script helps you set up the MCP server for Cursor IDE

set -e

echo "🚀 Cursor Rules Generator MCP Server Setup"
echo "==========================================="
echo ""

# Get the absolute path of the current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Step 1: Check Node.js
echo "📋 Step 1: Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Step 2: Install dependencies
echo "📦 Step 2: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Build TypeScript
echo "🔨 Step 3: Building TypeScript..."
npm run build
echo "✅ Build complete"
echo ""

# Step 4: Configure MCP
echo "⚙️  Step 4: Configuring MCP..."
MCP_CONFIG_DIR="$HOME/.cursor"
MCP_CONFIG_FILE="$MCP_CONFIG_DIR/mcp.json"

# Create .cursor directory if it doesn't exist
if [ ! -d "$MCP_CONFIG_DIR" ]; then
    echo "Creating $MCP_CONFIG_DIR directory..."
    mkdir -p "$MCP_CONFIG_DIR"
fi

# Generate MCP configuration
cat > /tmp/cursor-rules-mcp-config.json <<EOF
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
EOF

echo ""
echo "📝 Generated MCP configuration:"
cat /tmp/cursor-rules-mcp-config.json
echo ""

# Check if mcp.json already exists
if [ -f "$MCP_CONFIG_FILE" ]; then
    echo "⚠️  Warning: $MCP_CONFIG_FILE already exists"
    echo ""
    echo "Options:"
    echo "  1) Backup existing and replace with new configuration"
    echo "  2) Show configuration to manually merge"
    echo "  3) Skip configuration step"
    read -p "Choose option (1-3): " choice
    
    case $choice in
        1)
            BACKUP_FILE="$MCP_CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
            cp "$MCP_CONFIG_FILE" "$BACKUP_FILE"
            echo "✅ Backed up existing config to: $BACKUP_FILE"
            cp /tmp/cursor-rules-mcp-config.json "$MCP_CONFIG_FILE"
            echo "✅ Configuration updated"
            ;;
        2)
            echo ""
            echo "Add this to your existing $MCP_CONFIG_FILE:"
            echo "-------------------------------------------"
            cat /tmp/cursor-rules-mcp-config.json | jq '.mcpServers'
            echo "-------------------------------------------"
            ;;
        3)
            echo "⏭️  Skipped configuration"
            ;;
        *)
            echo "Invalid choice. Skipping configuration."
            ;;
    esac
else
    cp /tmp/cursor-rules-mcp-config.json "$MCP_CONFIG_FILE"
    echo "✅ Configuration created at: $MCP_CONFIG_FILE"
fi

echo ""
echo "🎉 Installation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Restart Cursor IDE"
echo "2. Open any project in Cursor"
echo "3. Try: 'Use generate-cursor-rules prompt for /path/to/your/project'"
echo ""
echo "📚 Documentation:"
echo "- Quick Setup: MCP_SETUP.md"
echo "- Usage Examples: examples/usage-example.md"
echo "- Full Guide: README.md"
echo ""
echo "🐛 Troubleshooting:"
echo "If the server doesn't load, check:"
echo "- Cursor is restarted"
echo "- Path in mcp.json is correct: $SCRIPT_DIR/dist/index.js"
echo "- Build was successful (check dist/ directory)"
echo ""
echo "✨ Happy cursor rules generation!"

