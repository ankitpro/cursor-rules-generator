import { Template } from "../../types.js";

export const githubActionsTemplate: Template = {
  id: "github-actions-cicd",
  name: "GitHub Actions CI/CD",
  description: "Continuous Integration and Deployment with GitHub Actions",
  category: "specialized",
  tags: ["github-actions", "ci-cd", "devops", "automation"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# GitHub Actions CI/CD

## Tech Stack
- GitHub Actions for CI/CD
- Automated testing
- Docker image building
- Deployment automation

## Code Philosophy
- Automate everything
- Fast feedback loops
- Security scanning
- Parallel execution
`,
    
    codeStyleRules: `# GitHub Actions Code Style

## Project Structure
\`\`\`
.github/
├── workflows/
│   ├── ci.yml
│   ├── deploy-prod.yml
│   ├── deploy-staging.yml
│   └── security-scan.yml
└── actions/
    └── custom-action/
\`\`\`

## CI Workflow Pattern
\`\`\`yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Check formatting
        run: npm run format:check

  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: matrix.node-version == 18
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      
      - name: Build application
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/
\`\`\`

## Deployment Workflow
\`\`\`yaml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/\${{ github.repository }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to production
        run: |
          # Your deployment commands here
          echo "Deploying \${{ github.ref_name }}"
\`\`\`

## Best Practices
- Use latest action versions
- Cache dependencies
- Parallel job execution
- Secrets management
- Branch protection rules
- Required status checks
`,
    
    securityRules: `# GitHub Actions Security

## Secret Management
- Use GitHub Secrets for sensitive data
- Never log secrets
- Use environment protection rules
- Rotate secrets regularly

## OIDC for Cloud
\`\`\`yaml
permissions:
  id-token: write
  contents: read

- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789:role/GitHubActions
    aws-region: us-east-1
\`\`\`

## Security Scanning
\`\`\`yaml
- name: Run Trivy scan
  uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs'
    scan-ref: '.'
    severity: 'CRITICAL,HIGH'
\`\`\`
`,
  },
};

export default githubActionsTemplate;

