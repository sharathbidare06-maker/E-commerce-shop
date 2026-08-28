package com.ecommerce.cart.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class CartItemResponse {
    private String id;
    private String userId;
    private String productId;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}
