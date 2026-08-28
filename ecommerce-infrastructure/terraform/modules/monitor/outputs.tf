output "app_insights_id" { value = azurerm_application_insights.main.id }
output "app_insights_key" { value = azurerm_application_insights.main.instrumentation_key sensitive = true }
