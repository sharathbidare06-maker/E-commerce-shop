resource "azurerm_user_assigned_identity" "aks" {
  name                = "${var.name}-aks-identity"
  resource_group_name = var.resource_group_name
  location            = var.location
  tags                = var.tags
}

resource "azurerm_federated_identity_credential" "aks_workload" {
  name                = "${var.name}-federated-cred"
  resource_group_name = var.resource_group_name
  audience            = ["api://AzureADTokenExchange"]
  issuer              = var.aks_oidc_issuer
  parent_id           = azurerm_user_assigned_identity.aks.id
  subject             = "system:serviceaccount:${var.namespace}:${var.service_account_name}"
}
