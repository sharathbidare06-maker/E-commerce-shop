variable "name" { type = string }
variable "location" { type = string }
variable "resource_group_name" { type = string }
variable "delegated_subnet_id" { type = string }
variable "private_dns_zone_id" { type = string }
variable "admin_username" { type = string }
variable "admin_password" { type = string }
variable "storage_mb" { type = number default = 32768 }
variable "sku_name" { type = string default = "B_Standard_B1ms" }
variable "databases" { type = list(string) }
variable "tags" { type = map(string) default = {} }
