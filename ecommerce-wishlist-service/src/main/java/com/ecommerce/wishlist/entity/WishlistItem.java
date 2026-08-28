package com.ecommerce.wishlist.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist_items", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "product_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WishlistItem {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name = "user_id", nullable = false) private String userId;
    @Column(name = "product_id", nullable = false) private String productId;
    private String productName;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}
