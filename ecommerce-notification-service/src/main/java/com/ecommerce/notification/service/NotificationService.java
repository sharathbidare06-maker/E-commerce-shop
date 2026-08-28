package com.ecommerce.notification.service;

import com.ecommerce.notification.dto.NotificationRequest;
import com.ecommerce.notification.dto.NotificationResponse;
import com.ecommerce.notification.entity.Notification;
import com.ecommerce.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final JavaMailSender mailSender;

    public NotificationResponse sendNotification(NotificationRequest request) {
        Notification notification = Notification.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .subject(request.getSubject())
                .content(request.getContent())
                .recipientEmail(request.getRecipientEmail())
                .build();

        notification = notificationRepository.save(notification);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(request.getRecipientEmail());
            message.setSubject(request.getSubject());
            message.setText(request.getContent());
            mailSender.send(message);
            notification.setStatus("SENT");
            log.info("Email sent to: {}", request.getRecipientEmail());
        } catch (Exception e) {
            notification.setStatus("FAILED");
            log.error("Failed to send email: {}", e.getMessage());
        }

        return mapToResponse(notificationRepository.save(notification));
    }

    public List<NotificationResponse> getUserNotifications(String userId) {
        return notificationRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<NotificationResponse> getPendingNotifications() {
        return notificationRepository.findByStatus("PENDING").stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private NotificationResponse mapToResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .userId(notification.getUserId())
                .type(notification.getType())
                .subject(notification.getSubject())
                .content(notification.getContent())
                .status(notification.getStatus())
                .recipientEmail(notification.getRecipientEmail())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
