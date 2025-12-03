# ⚡ Quick Start Guide

Get production-quality cursor rules with official `.mdc` format in 5 minutes!

**NEW in v3.1:** Generated rules now use official Cursor `.mdc` format with frontmatter metadata!

---

## 📋 Prerequisites

- ✅ Cursor IDE installed
- ✅ Project with code (any language/framework)
- ✅ Git repository (recommended but not required)

---

## 🚀 Steps

### 1️⃣ Copy This Folder to Your Project

```bash
# Navigate to your project
cd /path/to/your/project

# Copy cursor-rules-generator folder here
cp -r /path/to/cursor-rules-generator .
```

Your project structure:
```
your-project/
├── cursor-rules-generator/   # ← This folder
├── src/
├── package.json
└── ...
```

### 2️⃣ Open Project in Cursor

```bash
# Open in Cursor
cursor .
```

### 3️⃣ Attach Folder and Give Prompt

In Cursor chat:

```
@cursor-rules-generator

Scan my repository and generate comprehensive cursor rules based on my actual codebase.
```

### 4️⃣ Review Analysis Report

Cursor will show detailed analysis:
```
🔍 Repository Analysis Complete

📦 Detected Technologies: React 18, Node.js, PostgreSQL
📁 Project Structure: Frontend/Backend split
📝 Code Patterns: camelCase, async/await, Jest tests
🌳 Git Workflow: main + dev branches

💡 Recommendations: [List of suggestions]

🎯 Choose:
A) Use current patterns
B) Apply best practices
C) Hybrid approach

Please respond: A, B, or C
```

### 5️⃣ Choose Option

Type your choice:
- **A** - Document current patterns as-is
- **B** - Apply industry best practices
- **C** - Pick and choose per topic

### 6️⃣ Wait for Generation

Cursor creates:
```
your-project/
├── AGENTS.md                 # ✅ Optional: Simple alternative format
└── .cursor/
    ├── rules/                # ✅ Detailed rules with MDC frontmatter
    │   ├── main.mdc          # ✅ Main entry point with project context
    │   ├── architecture.mdc  # Each includes metadata:
    │   ├── code-style.mdc    #   - description (for intelligent application)
    │   ├── git-workflow.mdc  #   - globs (file patterns)
    │   ├── testing.mdc       #   - alwaysApply (auto-application flag)
    │   ├── security.mdc
    │   └── performance.mdc
    ├── prompts/              # ✅ Modular role system (custom extension)
    │   ├── README.mdc
    │   ├── documentation-writer.mdc
    │   ├── frontend-developer.mdc
    │   ├── backend-developer.mdc
    │   ├── software-architect.mdc
    │   ├── code-reviewer.mdc
    │   ├── qa-engineer.mdc
    │   ├── security-analyst.mdc
    │   ├── performance-engineer.mdc
    │   └── database-administrator.mdc
    └── quick-reference.mdc   # ✅ Commands
```

### ℹ️ About the Generated Files

- **`.cursor/rules/main.mdc`**: Main entry point with project context
- **`AGENTS.md`**: Simple markdown alternative (recommended for basic setups)
- **`.cursor/rules/*.mdc`**: Official format with MDC frontmatter metadata
- **MDC Frontmatter**: Each `.mdc` file includes:
  ```yaml
  ---
  description: Context-aware description for intelligent application
  globs:       # Optional file patterns for targeted application
  alwaysApply: false  # Whether to apply automatically
  ---
  ```

### 7️⃣ Verify Generated Files

```bash
# Check main file
cat .cursor/rules/main.mdc

# Check rules
ls .cursor/rules/

# Check all content
tree .cursor/
```

### 8️⃣ Test It

Ask Cursor to do something:
```
@cursor Create a new React component following project patterns
```

Watch Cursor:
1. Announce its role (🎭 Frontend Developer)
2. Reference `.cursor/rules/architecture.md`
3. Follow `.cursor/rules/code-style.md`
4. Apply your project's patterns!

### 9️⃣ Commit to Git

```bash
# Add all generated files
git add .cursor/ AGENTS.md

# Commit
git commit -m "chore: Add cursor rules"

# Push
git push
```

### 🔟 Clean Up (Optional)

```bash
# Remove generator folder (you don't need it anymore)
rm -rf cursor-rules-generator
```

---

## ✅ Success Checklist

After completion, verify:

- [ ] `.cursor/rules/main.mdc` file exists as main entry point
- [ ] `AGENTS.md` file exists (if you opted for it)
- [ ] `.cursor/` directory created
- [ ] `.cursor/rules/` contains 5-6 `.mdc` files with frontmatter
- [ ] `.cursor/prompts/README.mdc` and individual role files exist
- [ ] `.cursor/quick-reference.mdc` exists
- [ ] Each `.mdc` file has frontmatter with `description`, `globs`, `alwaysApply`
- [ ] Cursor announces role when you ask it to code
- [ ] All files committed to git
- [ ] `cursor-rules-generator/` folder removed

---

## 🎯 What to Do Next

### Customize Rules (Optional)
```bash
# Edit specific rules (note the .mdc extension)
code .cursor/rules/code-style.mdc
code .cursor/rules/git-workflow.mdc

# Edit simple alternative
code AGENTS.md
```

**Tip:** You can customize the MDC frontmatter to control rule application:
- Set `alwaysApply: true` to apply rule to all files
- Add `globs: ["*.ts", "*.tsx"]` to apply only to TypeScript files
- Update `description` to improve AI context understanding

### Share with Team
```bash
# Team members just pull and get the rules
git pull

# Or share specific files
cp .cursor/rules/code-style.md ~/team-standards/
```

### Extend Rules
```bash
# Add custom rule files
touch .cursor/rules/deployment.md
touch .cursor/rules/monitoring.md

# Update main.mdc to reference them
```

---

## 🆘 Troubleshooting

### Issue: Cursor didn't generate files
**Solution:** Make sure you attached the folder with `@cursor-rules-generator`

### Issue: Analysis seems incomplete
**Solution:** Ensure you have dependency files (package.json, requirements.txt, etc.) in project root

### Issue: Generated rules don't match project
**Solution:** Review analysis report. You may need to specify details or choose different option (A/B/C)

### Issue: Want to regenerate
**Solution:** 
```bash
rm -rf .cursor/ AGENTS.md
# Re-run generation prompt
```

---

## 📚 Learn More

- **[README.md](README.md)** - Project overview
- **[docs/USER_GUIDE.md](docs/USER_GUIDE.md)** - Complete user guide
- **[docs/STRUCTURE_EXAMPLE.md](docs/STRUCTURE_EXAMPLE.md)** - Visual examples
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** - What's new in v2.0

---

## 💬 Questions?

- Check [README.md](README.md)
- Review [STRUCTURE_EXAMPLE.md](docs/STRUCTURE_EXAMPLE.md)
- Open an issue on GitHub

---

## 👨‍💻 Author

**Ankit Agarwal**
- 📧 Email: [ankitagarwalpro@gmail.com](mailto:ankitagarwalpro@gmail.com)
- 🐙 GitHub: [@ankitpro](https://github.com/ankitpro)

---

**That's it! You now have production-quality cursor rules! 🎉**

Start coding and watch Cursor follow your project's patterns automatically.

