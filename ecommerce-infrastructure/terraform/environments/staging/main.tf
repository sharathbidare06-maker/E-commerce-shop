module "resource_group" {
  source   = "../../modules/resource-group"
  name     = "ecommerce-staging-rg"
  location = "East US"
  tags = {
    Environment = "staging"
    Project     = "ecommerce"
    ManagedBy   = "terraform"
  }
}

module "log_analytics" {
  source              = "../../modules/log-analytics"
  name                = "ecommerce-staging-law"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
}

module "virtual_network" {
  source              = "../../modules/virtual-network"
  name                = "ecommerce-staging-vnet"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  address_space       = ["10.1.0.0/16"]
  aks_subnet_prefix   = "10.1.1.0/24"
  appgw_subnet_prefix = "10.1.2.0/24"
}

module "acr" {
  source             = "../../modules/acr"
  name               = "ecommercestagingacr"
  location           = module.resource_group.location
  resource_group_name = module.resource_group.name
  sku                = "Standard"
  aks_principal_id   = module.aks.principal_id
}

module "aks" {
  source              = "../../modules/aks"
  name                = "ecommerce-staging-aks"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  dns_prefix          = "ecommerce-staging"
  subnet_id           = module.virtual_network.aks_subnet_id
  log_analytics_id    = module.log_analytics.id
  node_count          = 3
  vm_size             = "Standard_DS3_v2"
  workload_node_count = 3
  workload_vm_size    = "Standard_DS4_v2"
}

module "keyvault" {
  source              = "../../modules/keyvault"
  name                = "ecommerce-staging-kv"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  tenant_id           = var.tenant_id
  aks_principal_id    = module.aks.principal_id
}

module "application_gateway" {
  source              = "../../modules/application-gateway"
  name                = "ecommerce-staging-appgw"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  subnet_id           = module.virtual_network.appgw_subnet_id
}

module "monitor" {
  source              = "../../modules/monitor"
  name                = "ecommerce-staging-monitor"
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  alert_email         = var.alert_email
}
