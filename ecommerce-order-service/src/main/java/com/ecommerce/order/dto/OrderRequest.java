package com.ecommerce.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {
    @NotBlank(message = "User ID is required")
    private String userId;

    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderItemRequest> items;

    @NotNull(message = "Total amount is required")
    private BigDecimal totalAmount;
}
