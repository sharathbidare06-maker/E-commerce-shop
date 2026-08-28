package com.ecommerce.review.service;

import com.ecommerce.review.entity.Review;
import com.ecommerce.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository repository;
    public List<Review> getForProduct(String productId) { return repository.findByProductIdOrderByCreatedAtDesc(productId); }
    public Review add(Review review) { return repository.save(review); }
}
