variable "tenant_id" {
  description = "Azure AD Tenant ID"
  type        = string
}

variable "alert_email" {
  description = "Email for alerts"
  type        = string
  default     = "admin@ecommerce.com"
}
