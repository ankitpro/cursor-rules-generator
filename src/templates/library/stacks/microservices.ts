import { Template } from "../../types.js";

export const microservicesTemplate: Template = {
  id: "microservices-architecture",
  name: "Microservices Architecture",
  description: "Microservices patterns, API contracts, and distributed systems best practices",
  category: "stack",
  tags: ["microservices", "distributed", "api", "architecture"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Microservices Architecture

## Code Philosophy
- Service independence
- API-first design
- Failure resilience
- Distributed tracing

## Patterns
- API Gateway
- Service Discovery
- Circuit Breaker
- Event-Driven Communication
`,
    architectureRules: `# Microservices Architecture

## Service Structure
\`\`\`
services/
├── api-gateway/          # Entry point
├── auth-service/         # Authentication
├── user-service/         # User management
├── order-service/        # Orders
└── notification-service/ # Notifications
\`\`\`

## API Contracts
- Use OpenAPI/Swagger for documentation
- Version your APIs (/v1/, /v2/)
- Maintain backward compatibility
- Use semantic versioning

## Communication Patterns

### Synchronous (REST/gRPC)
\`\`\`typescript
// For immediate responses
const user = await userService.getUser(userId);
\`\`\`

### Asynchronous (Message Queue)
\`\`\`typescript
// For events and background tasks
await eventBus.publish('user.created', { userId, email });
\`\`\`

## Service Independence
- Each service has its own database
- No shared databases between services
- Services communicate only via APIs/events
- Independent deployment

## Error Handling
\`\`\`typescript
// Circuit breaker pattern
const user = await circuitBreaker.execute(
  () => userService.getUser(userId),
  { fallback: () => getCachedUser(userId) }
);
\`\`\`

## Observability
- Distributed tracing (Jaeger/Zipkin)
- Centralized logging (ELK stack)
- Metrics (Prometheus)
- Health checks for each service
`,
    codeStyleRules: `# Microservices Code Style

## Service Template
\`\`\`typescript
// Each service follows this structure
src/
├── api/              # API routes
├── services/         # Business logic
├── repositories/     # Data access
├── models/           # Data models
├── events/           # Event handlers
└── config/           # Configuration
\`\`\`

## Health Check
\`\`\`typescript
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date(),
    service: 'user-service',
    version: process.env.VERSION,
    dependencies: {
      database: await checkDatabase(),
      cache: await checkCache(),
    }
  };
  res.json(health);
});
\`\`\`
`,
  },
};

export default microservicesTemplate;

