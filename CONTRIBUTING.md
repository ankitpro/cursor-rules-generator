# Contributing to Cursor Rules Generator

First off, thank you for considering contributing to Cursor Rules Generator! 🎉

This document provides guidelines for contributing to the project. Following these guidelines helps maintain code quality and ensures smooth collaboration.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Style Guide](#style-guide)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Recognition](#recognition)

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone. We expect all contributors to:

- **Be respectful** - Treat everyone with respect and consideration
- **Be collaborative** - Work together towards the common goal
- **Be constructive** - Provide helpful feedback and suggestions
- **Be professional** - Maintain professionalism in all interactions
- **Be inclusive** - Welcome diverse perspectives and experiences

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory remarks
- Personal or political attacks
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

---

## 💡 How Can I Contribute?

### 1. Reporting Bugs 🐛

Found a bug? Help us improve by reporting it!

**Before submitting:**
- Check if the issue already exists
- Verify it's actually a bug and not expected behavior
- Test with the latest version

**When submitting, include:**
- Clear, descriptive title
- Steps to reproduce
- Expected behavior vs. actual behavior
- Screenshots (if applicable)
- Environment details (OS, Cursor version, etc.)
- Sample code or repository (if possible)

**Template:**
```markdown
**Bug Description:**
[Clear description of the bug]

**Steps to Reproduce:**
1. Copy folder to project
2. Run prompt: [exact prompt used]
3. Observe error at [specific step]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- OS: [e.g., macOS 14.0, Windows 11, Ubuntu 22.04]
- Cursor Version: [e.g., 0.40.0]
- Project Type: [e.g., React + Node.js, Python FastAPI]

**Additional Context:**
[Any other relevant information]
```

### 2. Suggesting Enhancements ✨

Have an idea to improve the project?

**Before suggesting:**
- Check if it's already been suggested
- Consider if it fits the project's scope and goals
- Think about backwards compatibility

**When suggesting, include:**
- Clear description of the enhancement
- Use case and benefits
- Potential implementation approach
- Any drawbacks or considerations

### 3. Contributing Code 💻

Want to write code? Awesome!

**What we need:**
- 🌍 Support for new languages/frameworks
- 📐 New rule templates
- 🧪 Additional tests
- 📚 Documentation improvements
- 🐛 Bug fixes
- ⚡ Performance optimizations

---

## 🛠️ Development Setup

### Prerequisites

- Git installed
- Cursor IDE installed
- Text editor (VS Code, Sublime, etc.)
- Basic understanding of:
  - Markdown
  - Git workflow
  - Command line operations

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cursor-rules-generator.git
   cd cursor-rules-generator
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-description
   ```

4. **Make your changes**
   - Edit files as needed
   - Test thoroughly
   - Update documentation

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add support for Kotlin projects"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template

---

## 📐 Contribution Guidelines

### Documentation Contributions

When contributing to documentation:

1. **Be Clear and Concise**
   - Use simple, straightforward language
   - Avoid jargon where possible
   - Provide examples

2. **Follow Existing Structure**
   - Match the tone and style of existing docs
   - Use consistent formatting
   - Keep sections organized

3. **Include Examples**
   - Show before/after comparisons
   - Provide code snippets
   - Use real-world scenarios

4. **Update All Relevant Files**
   - If changing README, update related docs
   - Keep examples consistent across files
   - Update version numbers if needed

### Template Contributions

When adding new language/framework support to `CURSOR_RULES_GENERATOR.md`:

1. **Research Best Practices**
   - Study official style guides
   - Review popular projects in that language
   - Understand community conventions

2. **Follow Template Structure**
   - Use existing language templates as reference
   - Include all standard sections
   - Maintain consistent formatting

3. **Provide Comprehensive Examples**
   - Show naming conventions
   - Include code style examples
   - Demonstrate common patterns

4. **Test with Real Projects**
   - Generate rules for actual projects
   - Verify all patterns work correctly
   - Get feedback from language experts

### Code Quality Standards

1. **No Hardcoded Values**
   - Use placeholders for project-specific values
   - Document what should be detected automatically

2. **Error Handling**
   - Consider edge cases
   - Provide helpful error messages
   - Fail gracefully

3. **Documentation**
   - Comment complex logic
   - Update README for new features
   - Add examples where helpful

4. **Testing**
   - Test with multiple project types
   - Verify cross-platform compatibility
   - Check for edge cases

---

## 📝 Style Guide

### Markdown Formatting

```markdown
# Top Level Heading (Only one per document)

## Second Level Heading

### Third Level Heading

**Bold text** for emphasis
*Italic text* for subtle emphasis
`inline code` for commands, file names, code

- Bullet lists for unordered items
1. Numbered lists for sequential steps

> Blockquotes for important callouts

\```language
Code blocks with language specified
\```
```

### Writing Style

- **Use active voice** - "Generate rules" not "Rules are generated"
- **Be specific** - "Click the Generate button" not "Proceed to generation"
- **Use emoji sparingly** - Only for visual structure, not excessive decoration
- **Write for all levels** - Assume readers have varying expertise
- **Avoid assumptions** - Don't assume OS, tools, or prior knowledge

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
feat(templates): Add Rust language support
fix(generator): Fix detection of monorepo structures
docs(readme): Update installation instructions
refactor(templates): Simplify Python template structure
```

---

## 🧪 Testing Requirements

### Before Submitting

Test your changes with:

1. **Multiple Project Types**
   - Frontend only
   - Backend only
   - Full-stack
   - Monorepo
   - CLI tools

2. **Multiple Languages**
   - JavaScript/TypeScript
   - Python
   - At least one other language relevant to your changes

3. **Different Scenarios**
   - New project (minimal files)
   - Established project (complex structure)
   - Project without git
   - Project with custom patterns

### Test Checklist

- [ ] Changes work as intended
- [ ] No errors in generation process
- [ ] Generated files are valid markdown
- [ ] All placeholders properly filled
- [ ] Examples match project structure
- [ ] Works on multiple OSes (if possible)
- [ ] Documentation updated
- [ ] No broken links in documentation

---

## 🔄 Pull Request Process

### Before Creating PR

1. **Test Thoroughly**
   - Run through test checklist
   - Verify on multiple project types
   - Check for errors or warnings

2. **Update Documentation**
   - Update README if needed
   - Add examples for new features
   - Update CHANGELOG (if applicable)

3. **Clean Commit History**
   - Use meaningful commit messages
   - Squash fixup commits if needed
   - Keep commits logical and atomic

### PR Requirements

Your PR should include:

1. **Clear Title**
   ```
   feat: Add support for Go projects
   fix: Correct TypeScript detection logic
   docs: Improve quick start guide
   ```

2. **Detailed Description**
   - What changes were made
   - Why these changes were needed
   - How to test the changes
   - Any breaking changes
   - Screenshots (if UI-related)

3. **Reference Issues**
   ```markdown
   Closes #123
   Fixes #456
   Related to #789
   ```

### PR Template

```markdown
## Description
[Clear description of changes]

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing Done
- [ ] Tested with [project type]
- [ ] Tested with [language]
- [ ] Verified on [OS]
- [ ] All examples work correctly

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No breaking changes (or documented if present)
- [ ] Tested thoroughly
- [ ] Commit messages follow convention

## Additional Notes
[Any other relevant information]
```

### Review Process

1. **Automated Checks**
   - All checks must pass (when CI/CD is set up)

2. **Code Review**
   - At least one approval required
   - Address all feedback
   - Be responsive to questions

3. **Merge**
   - Maintainer will merge when approved
   - Thank you for your contribution! 🎉

---

## 🏆 Recognition

### Contributors

All contributors will be:
- Listed in the project's contributors
- Credited in release notes
- Acknowledged in the community

### Significant Contributions

Major contributions may receive:
- Feature attribution
- Maintainer status (if interested)
- Special recognition in announcements

---

## 📞 Questions?

### For Contributors

- 💬 GitHub Discussions
- 📝 GitHub Issues for specific questions
- 📚 Documentation in this repository

---

## 🙏 Thank You!

Your contributions help make this project better for everyone. Whether it's:
- 🐛 Reporting a bug
- 💡 Suggesting an enhancement
- 📝 Improving documentation
- 💻 Contributing code

**Every contribution matters!** Thank you for being part of this community. 🎊

---

**Remember:** The best contribution is the one that helps others. Whether big or small, your input is valued and appreciated!

---

**Version:** 1.0.0

