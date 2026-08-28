package com.ecommerce.review.repository;

import com.ecommerce.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByProductIdOrderByCreatedAtDesc(String productId);
}
