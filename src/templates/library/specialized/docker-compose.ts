import { Template } from "../../types.js";

export const dockerComposeTemplate: Template = {
  id: "docker-compose-dev",
  name: "Docker Compose Development",
  description: "Multi-container development with Docker Compose",
  category: "specialized",
  tags: ["docker", "docker-compose", "containers", "devops"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Docker Compose Development

## Tech Stack
- Docker for containerization
- Docker Compose for orchestration
- Multi-service architecture
- Development environment

## Code Philosophy
- Container-first development
- Service isolation
- Easy local setup
- Production parity
`,
    
    codeStyleRules: `# Docker Compose Code Style

## Project Structure
\`\`\`
project/
├── docker-compose.yml
├── docker-compose.prod.yml
├── docker-compose.override.yml
├── services/
│   ├── api/
│   │   └── Dockerfile
│   ├── web/
│   │   └── Dockerfile
│   └── worker/
│       └── Dockerfile
└── .env.example
\`\`\`

## Compose File Pattern
\`\`\`yaml
version: '3.8'

services:
  web:
    build:
      context: ./services/web
      dockerfile: Dockerfile
      target: development
    ports:
      - "3000:3000"
    volumes:
      - ./services/web:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - API_URL=http://api:4000
    depends_on:
      - api
      - postgres
    networks:
      - app-network

  api:
    build: ./services/api
    ports:
      - "4000:4000"
    volumes:
      - ./services/api:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge
\`\`\`

## Dockerfile Pattern
\`\`\`dockerfile
# Multi-stage build
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS production
COPY . .
CMD ["npm", "start"]
\`\`\`

## Best Practices
- Use .dockerignore
- Multi-stage builds for smaller images
- Health checks for dependencies
- Named volumes for persistence
- Environment variable files
- Network isolation
`,
  },
};

export default dockerComposeTemplate;

