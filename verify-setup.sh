#!/bin/bash

# Cursor Rules Generator MCP Server Verification Script

echo "🔍 Verifying Cursor Rules Generator MCP Setup"
echo "=============================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check Node.js
echo "1. Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found${NC}"
    ((ERRORS++))
fi

# Check npm
echo ""
echo "2. Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found${NC}"
    ((ERRORS++))
fi

# Check node_modules
echo ""
echo "3. Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules directory exists${NC}"
else
    echo -e "${RED}❌ node_modules not found. Run: npm install${NC}"
    ((ERRORS++))
fi

# Check dist folder
echo ""
echo "4. Checking build output..."
if [ -d "dist" ] && [ -f "dist/index.js" ]; then
    echo -e "${GREEN}✅ dist/index.js exists${NC}"
else
    echo -e "${RED}❌ Build output not found. Run: npm run build${NC}"
    ((ERRORS++))
fi

# Check MCP config
echo ""
echo "5. Checking MCP configuration..."
MCP_CONFIG="$HOME/.cursor/mcp.json"
if [ -f "$MCP_CONFIG" ]; then
    echo -e "${GREEN}✅ $MCP_CONFIG exists${NC}"
    
    # Check if our server is configured
    if grep -q "cursor-rules-generator" "$MCP_CONFIG"; then
        echo -e "${GREEN}✅ cursor-rules-generator found in config${NC}"
    else
        echo -e "${YELLOW}⚠️  cursor-rules-generator not found in config${NC}"
        echo "   Add the configuration from .cursorrules-mcp-example.json"
    fi
else
    echo -e "${YELLOW}⚠️  $MCP_CONFIG not found${NC}"
    echo "   Create it using: ./install-mcp.sh"
fi

# Check TypeScript config
echo ""
echo "6. Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    echo -e "${GREEN}✅ tsconfig.json exists${NC}"
else
    echo -e "${RED}❌ tsconfig.json not found${NC}"
    ((ERRORS++))
fi

# Check package.json
echo ""
echo "7. Checking package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json exists${NC}"
    
    # Check for required dependencies
    if grep -q "@modelcontextprotocol/sdk" "package.json"; then
        echo -e "${GREEN}✅ MCP SDK dependency found${NC}"
    else
        echo -e "${RED}❌ MCP SDK dependency missing${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}❌ package.json not found${NC}"
    ((ERRORS++))
fi

# Check documentation
echo ""
echo "8. Checking documentation..."
DOCS=("README.md" "MCP_SETUP.md" "CHANGELOG.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✅ $doc${NC}"
    else
        echo -e "${YELLOW}⚠️  $doc not found${NC}"
    fi
done

# Summary
echo ""
echo "=========================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Make sure Cursor is restarted"
    echo "2. In Cursor, try: 'Use generate-cursor-rules prompt'"
    echo "3. Check MCP_SETUP.md for usage instructions"
else
    echo -e "${RED}❌ $ERRORS error(s) found${NC}"
    echo ""
    echo "Fix the errors above and run this script again"
fi
echo "=========================================="

