# Azure Infrastructure (Terraform)

## Structure
- `modules/` - Reusable Terraform modules
- `environments/` - Environment-specific configurations (dev, staging, prod)

## Modules
| Module | Description |
|--------|-------------|
| resource-group | Azure Resource Group |
| virtual-network | VNet + Subnets |
| aks | Azure Kubernetes Service |
| acr | Azure Container Registry |
| postgresql | Azure Database for PostgreSQL |
| keyvault | Azure Key Vault |
| application-gateway | WAF-enabled App Gateway |
| monitor | Azure Monitor + App Insights |
| log-analytics | Log Analytics Workspace |
| managed-identity | User-assigned managed identity |

## Usage
```bash
cd environments/dev
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

## Backend Setup (One-time)
```bash
az group create -n tfstate-rg -l eastus
az storage account create -n ecomtfstate123 -g tfstate-rg -l eastus --sku Standard_LRS
az storage container create -n tfstate --account-name ecomtfstate123
```
