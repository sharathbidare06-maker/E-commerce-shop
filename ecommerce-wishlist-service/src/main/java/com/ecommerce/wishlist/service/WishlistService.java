package com.ecommerce.wishlist.service;

import com.ecommerce.wishlist.entity.WishlistItem;
import com.ecommerce.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository repository;
    public List<WishlistItem> getForUser(String userId) { return repository.findByUserIdOrderByCreatedAtDesc(userId); }
    public WishlistItem add(String userId, String productId, String productName) {
        return repository.findByUserIdAndProductId(userId, productId).orElseGet(() -> repository.save(WishlistItem.builder().userId(userId).productId(productId).productName(productName).build()));
    }
    public void remove(String userId, String productId) { repository.findByUserIdAndProductId(userId, productId).ifPresent(repository::delete); }
}
