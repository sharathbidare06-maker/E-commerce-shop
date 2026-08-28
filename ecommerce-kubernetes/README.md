# Kubernetes Manifests

## Structure
- `base/` - Base cluster resources (namespace, configmap, serviceaccount)
- `services/` - Per-service manifests (deployment, service, hpa, pdb, networkpolicy)
- `helm/` - Helm chart for templated deployments

## Deployment
```bash
# Apply base resources
kubectl apply -k base/

# Apply all services
kubectl apply -k services/user-service/
kubectl apply -k services/product-service/
# ... etc

# Or use Helm
helm install ecommerce ./helm -n ecommerce
```

## Security Features
- Non-root containers
- Network Policies
- Pod Disruption Budgets
- HPA for auto-scaling
- Service Accounts with Workload Identity
