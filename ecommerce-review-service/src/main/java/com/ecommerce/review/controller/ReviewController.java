package com.ecommerce.review.controller;

import com.ecommerce.review.entity.Review;
import com.ecommerce.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/reviews") @RequiredArgsConstructor
public class ReviewController {
    private final ReviewService service;
    @GetMapping("/product/{productId}") public List<Review> get(@PathVariable String productId) { return service.getForProduct(productId); }
    @PostMapping public ResponseEntity<Review> add(@Valid @RequestBody Review review) { return ResponseEntity.status(HttpStatus.CREATED).body(service.add(review)); }
    @GetMapping("/health") public String health() { return "Review Service is UP"; }
}
