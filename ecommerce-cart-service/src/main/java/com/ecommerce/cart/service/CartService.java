package com.ecommerce.cart.service;

import com.ecommerce.cart.dto.CartItemRequest;
import com.ecommerce.cart.dto.CartItemResponse;
import com.ecommerce.cart.dto.CartSummaryResponse;
import com.ecommerce.cart.entity.CartItem;
import com.ecommerce.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

    public CartItemResponse addItem(CartItemRequest request) {
        var existing = cartRepository.findByUserIdAndProductId(request.getUserId(), request.getProductId());
        if (existing.isPresent()) {
            var item = existing.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            return mapToResponse(cartRepository.save(item));
        }
        CartItem item = CartItem.builder()
                .userId(request.getUserId())
                .productId(request.getProductId())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .build();
        return mapToResponse(cartRepository.save(item));
    }

    public List<CartItemResponse> getCartItems(String userId) {
        return cartRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CartSummaryResponse getCartSummary(String userId) {
        var items = getCartItems(userId);
        var total = items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return CartSummaryResponse.builder()
                .userId(userId)
                .items(items)
                .total(total)
                .itemCount(items.size())
                .build();
    }

    public CartItemResponse updateQuantity(String itemId, Integer quantity) {
        CartItem item = cartRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        item.setQuantity(quantity);
        return mapToResponse(cartRepository.save(item));
    }

    public void removeItem(String itemId) {
        cartRepository.deleteById(itemId);
    }

    public void clearCart(String userId) {
        cartRepository.deleteByUserId(userId);
    }

    private CartItemResponse mapToResponse(CartItem item) {
        return CartItemResponse.builder()
                .id(item.getId())
                .userId(item.getUserId())
                .productId(item.getProductId())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .subtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .build();
    }
}
