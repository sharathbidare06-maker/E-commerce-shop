resource "azurerm_monitor_action_group" "critical" {
  name                = "${var.name}-critical"
  resource_group_name = var.resource_group_name
  short_name          = "critical"

  email_receiver {
    name                    = "admin"
    email_address           = var.alert_email
    use_common_alert_schema = true
  }
}

resource "azurerm_application_insights" "main" {
  name                = var.name
  resource_group_name = var.resource_group_name
  location            = var.location
  application_type    = "web"
  tags                = var.tags
}
