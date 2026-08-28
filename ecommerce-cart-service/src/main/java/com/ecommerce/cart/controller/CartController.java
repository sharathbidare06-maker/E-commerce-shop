package com.ecommerce.cart.controller;

import com.ecommerce.cart.dto.CartItemRequest;
import com.ecommerce.cart.dto.CartItemResponse;
import com.ecommerce.cart.dto.CartSummaryResponse;
import com.ecommerce.cart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/items")
    public ResponseEntity<CartItemResponse> addItem(@Valid @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(cartService.addItem(request));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItemResponse>> getCart(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @GetMapping("/{userId}/summary")
    public ResponseEntity<CartSummaryResponse> getSummary(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartSummary(userId));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartItemResponse> updateQuantity(@PathVariable String itemId, @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(itemId, quantity));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable String itemId) {
        cartService.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Cart Service is UP");
    }
}
