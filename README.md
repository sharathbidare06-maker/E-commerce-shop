# Enterprise E-Commerce Microservices Platform (Azure)

A production-ready, cloud-native e-commerce platform built with microservices architecture, deployed on Microsoft Azure using AKS, Terraform, ArgoCD, and GitHub Actions.

## Architecture Overview

```
React Frontend
      |
      v
Azure Application Gateway (WAF)
      |
      v
API Gateway (Spring Cloud Gateway)
      |
      +----------------------------+
      |            |               |
      v            v               v
 User Service   Product Service   Cart Service
      |            |               |
      +------------+---------------+
                   |
                   v
             Order Service
                   |
                   v
            Payment Service
                   |
                   v
        Notification Service
                   |
                   v
Azure Database for PostgreSQL
 (Separate DB per service)
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Cloud | Microsoft Azure |
| Orchestration | Azure Kubernetes Service (AKS) |
| Registry | Azure Container Registry (ACR) |
| Database | Azure Database for PostgreSQL |
| Secrets | Azure Key Vault |
| Gateway | Azure Application Gateway + AGIC |
| Monitoring | Azure Monitor, Application Insights, Log Analytics |
| Observability | Prometheus, Grafana |
| IaC | Terraform |
| GitOps | ArgoCD |
| CI/CD | GitHub Actions |
| Security | Trivy, SonarQube, Azure RBAC, Managed Identity |

## Repository Structure

```
ecommerce-project/
├── ecommerce-frontend/          # React SPA
├── ecommerce-user-service/      # User management microservice
├── ecommerce-product-service/   # Product catalog microservice
├── ecommerce-cart-service/      # Shopping cart microservice
├── ecommerce-order-service/     # Order processing microservice
├── ecommerce-payment-service/   # Payment processing microservice
├── ecommerce-notification-service/ # Email/SMS notifications
├── ecommerce-api-gateway/       # Spring Cloud Gateway
├── ecommerce-local/             # Local Docker Compose setup
├── ecommerce-infrastructure/    # Terraform modules for Azure
├── ecommerce-kubernetes/        # K8s manifests & Helm charts
└── ecommerce-gitops/            # ArgoCD application manifests
```

## Quick Start

### Local Development
```bash
cd ecommerce-local
docker-compose up -d
```

### Azure Deployment
```bash
cd ecommerce-infrastructure/terraform/environments/dev
terraform init
terraform plan
terraform apply
```

## CI/CD Pipeline

1. Developer pushes code to GitHub
2. GitHub Actions triggers build
3. Unit tests & SonarQube analysis
4. Docker build & Trivy vulnerability scan
5. Push image to Azure Container Registry
6. Update GitOps repository
7. ArgoCD syncs to AKS

## Security

- Azure Key Vault for secrets management
- Managed Identity for AKS pod authentication
- Azure RBAC for fine-grained access control
- Network Policies for intra-cluster security
- Non-root container execution
- Trivy image scanning in CI/CD
- HTTPS/TLS termination at Application Gateway
- JWT authentication between services

## Monitoring

- Azure Monitor & Application Insights for APM
- Prometheus for metrics collection
- Grafana for visualization dashboards
- Log Analytics for centralized logging
- Custom JVM metrics via Micrometer

## License

MIT License - Enterprise Portfolio Project
