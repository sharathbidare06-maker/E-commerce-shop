package com.ecommerce.cart.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CartSummaryResponse {
    private String userId;
    private List<CartItemResponse> items;
    private BigDecimal total;
    private Integer itemCount;
}
