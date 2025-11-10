# ⚡ Quick Start Guide

Get production-quality cursor rules in 5 minutes!

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

Scan my repository and generate comprehensive .cursorrules based on my actual codebase.
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
├── .cursorrules              # ✅ Main file
└── .cursor/
    ├── rules/                # ✅ Detailed rules
    │   ├── architecture.md
    │   ├── code-style.md
    │   ├── git-workflow.md
    │   ├── testing.md
    │   ├── security.md
    │   └── performance.md
    ├── prompts/
    │   └── system-prompts.md # ✅ Role system
    └── quick-reference.md    # ✅ Commands
```

### 7️⃣ Verify Generated Files

```bash
# Check main file
cat .cursorrules

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
git add .cursorrules .cursor/

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

- [ ] `.cursorrules` file exists at project root
- [ ] `.cursor/` directory created
- [ ] `.cursor/rules/` contains 5-6 markdown files
- [ ] `.cursor/prompts/system-prompts.md` exists
- [ ] `.cursor/quick-reference.md` exists
- [ ] Cursor announces role when you ask it to code
- [ ] All files committed to git
- [ ] `cursor-rules-generator/` folder removed

---

## 🎯 What to Do Next

### Customize Rules (Optional)
```bash
# Edit specific rules
code .cursor/rules/code-style.md
code .cursor/rules/git-workflow.md
```

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

# Update main .cursorrules to reference them
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
rm -rf .cursorrules .cursor/
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

**That's it! You now have production-quality cursor rules! 🎉**

Start coding and watch Cursor follow your project's patterns automatically.

