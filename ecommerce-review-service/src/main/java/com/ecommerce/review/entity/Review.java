package com.ecommerce.review.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "reviews")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private String id;
    @Column(nullable = false) private String productId;
    @Column(nullable = false) private String userId;
    private String userName;
    @Min(1) @Max(5) @Column(nullable = false) private Integer rating;
    @Column(length = 2000, nullable = false) private String comment;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}
