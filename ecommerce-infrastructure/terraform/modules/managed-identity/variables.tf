variable "name" { type = string }
variable "location" { type = string }
variable "resource_group_name" { type = string }
variable "aks_oidc_issuer" { type = string }
variable "namespace" { type = string default = "ecommerce" }
variable "service_account_name" { type = string default = "ecommerce-sa" }
variable "tags" { type = map(string) default = {} }
