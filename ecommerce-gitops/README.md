# GitOps Repository (ArgoCD)

## Structure
- `bootstrap/` - ArgoCD bootstrap manifests
- `apps/` - Individual ArgoCD Application manifests

## Setup
```bash
# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Apply root application
kubectl apply -f bootstrap/root-application.yaml
```

## GitOps Flow
1. CI pipeline builds and pushes images to ACR
2. CI updates image tags in ecommerce-kubernetes repo
3. ArgoCD detects changes and syncs to AKS
4. Microservices are deployed automatically
