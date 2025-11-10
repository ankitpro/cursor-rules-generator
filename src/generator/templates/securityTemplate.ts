import { AnalysisResult } from "../../types.js";

export function generateSecurityRules(
  analysis: AnalysisResult,
  approach: string
): string {
  return `# Security Best Practices

## Environment Variables

${generateEnvironmentSecurity(analysis)}

## Authentication & Authorization

- Use industry-standard authentication (JWT, OAuth 2.0)
- Never store passwords in plain text
- Implement rate limiting on authentication endpoints
- Use HTTPS in production
- Validate tokens on every protected request

## Input Validation

- Validate all user inputs
- Sanitize data before database queries
- Use parameterized queries to prevent SQL injection
- Validate file uploads (type, size, content)
- Implement proper error handling without exposing sensitive data

## API Security

- Use API keys/tokens for authentication
- Implement CORS properly
- Rate limit all public endpoints
- Log security events
- Never expose internal error details to users

## Data Protection

- Never log sensitive data (passwords, tokens, PII)
- Use environment variables for secrets
- Never commit secrets to version control
- Encrypt sensitive data at rest
- Use secure session management

## Dependencies

- Keep dependencies updated
- Audit dependencies regularly
- Use lock files (package-lock.json, poetry.lock)
- Review security advisories

${generateSecurityChecklist(analysis)}

---
**Generated based on:** ${approach}
`;
}

function generateEnvironmentSecurity(analysis: AnalysisResult): string {
  const lines: string[] = [];

  if (analysis.environment.hasEnvFile) {
    lines.push(`**Environment Files Detected:** ${analysis.environment.envFiles.join(", ")}`);
    lines.push(`**Variables:** ${analysis.environment.variables.length} defined`);
    
    if (analysis.environment.hasSecrets) {
      lines.push("\n⚠️ **Secrets detected** - Ensure these are never committed to version control");
    }
  } else {
    lines.push("⚠️ **No .env.example found** - Create one to document required variables");
  }

  return lines.join("\n");
}

function generateSecurityChecklist(analysis: AnalysisResult): string {
  return `## Security Checklist

Before deployment:
- [ ] All secrets in environment variables
- [ ] No sensitive data in version control
- [ ] Dependencies audited and updated
- [ ] HTTPS enabled
- [ ] Input validation implemented
- [ ] Authentication/authorization working
- [ ] Rate limiting configured
- [ ] Error messages don't expose internals
- [ ] Security headers configured
- [ ] Logs don't contain sensitive data`;
}

