variable "name" { type = string }
variable "location" { type = string }
variable "resource_group_name" { type = string }
variable "dns_prefix" { type = string }
variable "kubernetes_version" { type = string default = "1.28" }
variable "node_count" { type = number default = 2 }
variable "vm_size" { type = string default = "Standard_DS2_v2" }
variable "workload_node_count" { type = number default = 2 }
variable "workload_vm_size" { type = string default = "Standard_DS3_v2" }
variable "subnet_id" { type = string }
variable "log_analytics_id" { type = string }
variable "tags" { type = map(string) default = {} }
