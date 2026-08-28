package com.ecommerce.wishlist.repository;

import com.ecommerce.wishlist.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<WishlistItem, String> {
    List<WishlistItem> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<WishlistItem> findByUserIdAndProductId(String userId, String productId);
}
