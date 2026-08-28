package com.ecommerce.notification.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponse {
    private String id;
    private String userId;
    private String type;
    private String subject;
    private String content;
    private String status;
    private String recipientEmail;
    private LocalDateTime createdAt;
}
