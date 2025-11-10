# Publishing to NPM

This guide explains how to publish the package to NPM so users can use it via `npx`.

## Prerequisites

1. **NPM Account**: Create an account at https://www.npmjs.com/
2. **NPM CLI**: Ensure npm is installed (`npm --version`)
3. **Login**: Run `npm login` and enter your credentials

## Publishing Steps

### 1. Build the Package

```bash
npm install
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` folder.

### 2. Verify Package Contents

```bash
npm pack --dry-run
```

This shows what files will be included in the package. Should include:
- `dist/` directory
- `package.json`
- `README.md`
- `LICENSE`

### 3. Test Locally (Optional but Recommended)

```bash
# Link the package globally
npm link

# Test in another project
cd /path/to/test/project
cursor-rules-mcp
```

### 4. Publish to NPM

```bash
# First time publishing
npm publish --access public

# For updates, bump version first:
npm version patch  # for bug fixes (2.0.0 -> 2.0.1)
npm version minor  # for new features (2.0.0 -> 2.1.0)
npm version major  # for breaking changes (2.0.0 -> 3.0.0)

# Then publish
npm publish
```

### 5. Verify Publication

```bash
# Check if published successfully
npm view cursor-rules-generator-mcp

# Test installation
npx cursor-rules-generator-mcp@latest
```

## Using the Published Package

Once published, users can use it immediately:

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

## Updating the Package

1. Make your changes
2. Build: `npm run build`
3. Test locally
4. Bump version: `npm version <patch|minor|major>`
5. Publish: `npm publish`
6. Git commit and push: `git push && git push --tags`

## Troubleshooting

### Package name already exists
If `cursor-rules-generator-mcp` is taken, use a scoped package:
```json
{
  "name": "@ankitpro/cursor-rules-generator-mcp"
}
```

Then publish with:
```bash
npm publish --access public
```

### Authentication issues
```bash
npm logout
npm login
```

### Version conflicts
Make sure to bump version before each publish:
```bash
npm version patch
```

## Best Practices

1. **Test before publishing**: Always test with `npm pack --dry-run`
2. **Semantic versioning**: Follow semver (major.minor.patch)
3. **Changelog**: Update CHANGELOG.md for each release
4. **Git tags**: Version bumps create git tags automatically
5. **README**: Keep README.md updated with latest usage examples

## Automation (Optional)

Consider setting up GitHub Actions to automatically publish on release:

```yaml
# .github/workflows/publish.yml
name: Publish to NPM
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your NPM token to GitHub repository secrets as `NPM_TOKEN`.

---

## 👨‍💻 Author

**Ankit Agarwal**
- 📧 Email: [ankitagarwalpro@gmail.com](mailto:ankitagarwalpro@gmail.com)
- 🐙 GitHub: [@ankitpro](https://github.com/ankitpro)

