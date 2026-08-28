output "id" { value = azurerm_kubernetes_cluster.main.id }
output "name" { value = azurerm_kubernetes_cluster.main.name }
output "principal_id" { value = azurerm_kubernetes_cluster.main.identity[0].principal_id }
output "kube_config" { value = azurerm_kubernetes_cluster.main.kube_config_raw sensitive = true }
