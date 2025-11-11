import { Template } from "../../types.js";

export const terraformAwsTemplate: Template = {
  id: "terraform-aws-iac",
  name: "Terraform + AWS Infrastructure",
  description: "Infrastructure as Code with Terraform for AWS deployments",
  category: "specialized",
  tags: ["terraform", "aws", "iac", "devops", "cloud"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Terraform + AWS Infrastructure as Code

## Tech Stack
- Terraform for IaC
- AWS as cloud provider
- Modular infrastructure design
- State management

## Code Philosophy
- Reusable modules
- Environment separation
- State file security
- Version-controlled infrastructure
`,
    
    codeStyleRules: `# Terraform Code Style

## Project Structure
\`\`\`
terraform/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── terraform.tfvars
│   ├── staging/
│   └── prod/
├── modules/
│   ├── vpc/
│   ├── ec2/
│   ├── rds/
│   └── s3/
└── global/
    └── iam/
\`\`\`

## Module Pattern
\`\`\`hcl
# modules/vpc/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(
    var.common_tags,
    {
      Name = "\${var.environment}-vpc"
    }
  )
}

# modules/vpc/variables.tf
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "common_tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default     = {}
}

# modules/vpc/outputs.tf
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}
\`\`\`

## Naming Conventions
- Resources: \`resource_type.descriptive_name\`
- Variables: snake_case
- Outputs: snake_case
- Tags: PascalCase keys

## Best Practices

### State Management
\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "env/prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
\`\`\`

### Version Constraints
\`\`\`hcl
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
\`\`\`

### Variable Validation
\`\`\`hcl
variable "environment" {
  type        = string
  description = "Environment name"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}
\`\`\`

### Data Sources
\`\`\`hcl
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}
\`\`\`

### Locals for DRY
\`\`\`hcl
locals {
  common_tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Project     = var.project_name
  }

  name_prefix = "\${var.project_name}-\${var.environment}"
}
\`\`\`
`,
    
    securityRules: `# Terraform Security

## State File Security
- Never commit state files to git
- Use remote backend (S3 with encryption)
- Enable state locking (DynamoDB)
- Restrict backend access with IAM

## Secrets Management
- Never hardcode credentials
- Use AWS Secrets Manager or Parameter Store
- Environment variables for sensitive data
- Use data sources for dynamic secrets

## IAM Best Practices
\`\`\`hcl
# Least privilege principle
resource "aws_iam_role_policy" "app" {
  name = "app-policy"
  role = aws_iam_role.app.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource = "\${aws_s3_bucket.app.arn}/*"
      }
    ]
  })
}
\`\`\`

## Resource Tagging
- Tag all resources for cost tracking
- Include Owner, Environment, ManagedBy
- Use consistent tag keys
`,
  },
};

export default terraformAwsTemplate;

