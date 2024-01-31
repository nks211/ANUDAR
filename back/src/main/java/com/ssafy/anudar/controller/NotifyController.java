package com.ssafy.anudar.controller;

import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.service.NotifyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
@RequestMapping("/notify")
public class NotifyController {

    private final NotifyService notifyService;

    public NotifyController(NotifyService notifyService) {
        this.notifyService = notifyService;
    }

    // SSE를 통한 클라이언트 구독
    @GetMapping(value = "/subscribe/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribeToNotifications(@PathVariable Long id) {
        return notifyService.subscribe(id);
    }

    // 특정 사용자에게 알림 데이터 전송
    @PostMapping("/{id}/notifications")
    public ResponseEntity<String> sendNotificationData(@PathVariable Long id) {
        try {
            // 특정 사용자에게 알림 데이터 전송
            notifyService.notify(id, "data");
            return ResponseEntity.ok("Notification data sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send notification data.");
        }
    }
}
