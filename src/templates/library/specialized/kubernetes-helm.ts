import { Template } from "../../types.js";

export const kubernetesHelmTemplate: Template = {
  id: "kubernetes-helm",
  name: "Kubernetes + Helm",
  description: "Kubernetes deployments and Helm chart development",
  category: "specialized",
  tags: ["kubernetes", "k8s", "helm", "devops", "containers"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Kubernetes + Helm

## Tech Stack
- Kubernetes for orchestration
- Helm for package management
- YAML for manifests
- Container-first architecture

## Code Philosophy
- Declarative configuration
- GitOps principles
- High availability
- Rolling updates
`,
    
    codeStyleRules: `# Kubernetes Code Style

## Project Structure
\`\`\`
k8s/
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   └── secret.yaml
├── overlays/
│   ├── dev/
│   ├── staging/
│   └── prod/
└── helm/
    └── my-app/
        ├── Chart.yaml
        ├── values.yaml
        ├── values-dev.yaml
        ├── values-prod.yaml
        └── templates/
\`\`\`

## Deployment Pattern
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
  labels:
    app: myapp
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
        version: v1
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
\`\`\`

## Service Pattern
\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
\`\`\`

## Helm Chart Pattern
\`\`\`yaml
# Chart.yaml
apiVersion: v2
name: myapp
description: My application Helm chart
type: application
version: 1.0.0
appVersion: "1.0.0"

# values.yaml
replicaCount: 3

image:
  repository: myapp
  pullPolicy: IfNotPresent
  tag: "latest"

service:
  type: ClusterIP
  port: 80

resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
\`\`\`

## Best Practices
- Always set resource requests and limits
- Use namespaces for isolation
- Implement health checks (liveness/readiness)
- Use ConfigMaps for configuration
- Use Secrets for sensitive data
- Enable RBAC
- Use NetworkPolicies for security
`,
    
    securityRules: `# Kubernetes Security

## RBAC
\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: app-role
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
\`\`\`

## Network Policies
\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-network-policy
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 8080
\`\`\`

## Security Best Practices
- Never run containers as root
- Use Pod Security Standards
- Scan images for vulnerabilities
- Keep secrets encrypted at rest
- Use service mesh for mTLS
`,
  },
};

export default kubernetesHelmTemplate;

