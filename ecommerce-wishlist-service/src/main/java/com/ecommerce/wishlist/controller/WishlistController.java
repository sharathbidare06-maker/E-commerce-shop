package com.ecommerce.wishlist.controller;

import com.ecommerce.wishlist.entity.WishlistItem;
import com.ecommerce.wishlist.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController @RequestMapping("/api/wishlist") @RequiredArgsConstructor
public class WishlistController {
    private final WishlistService service;
    @GetMapping public List<WishlistItem> get(@RequestParam String userId) { return service.getForUser(userId); }
    @PostMapping public ResponseEntity<WishlistItem> add(@RequestBody Map<String, String> body) { return ResponseEntity.status(HttpStatus.CREATED).body(service.add(body.get("userId"), body.get("productId"), body.get("productName"))); }
    @DeleteMapping public ResponseEntity<Void> remove(@RequestParam String userId, @RequestParam String productId) { service.remove(userId, productId); return ResponseEntity.noContent().build(); }
    @GetMapping("/health") public String health() { return "Wishlist Service is UP"; }
}
