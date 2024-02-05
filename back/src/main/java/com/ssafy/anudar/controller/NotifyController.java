package com.ssafy.anudar.controller;


import com.ssafy.anudar.dto.NotifyDto;
import com.ssafy.anudar.service.NotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/notifies")
public class NotifyController {

    @Autowired
    private final NotifyService notifyService;

    public NotifyController(NotifyService notifyService) {
        this.notifyService = notifyService;
    }

    // 사용자 ID에 따른 알람 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotifyDto>> getNotifiesByUserId(@PathVariable Long userId){
        List<NotifyDto> notifies = notifyService.getNotifiesByUserId(userId);
        return ResponseEntity.ok(notifies);
    }

    // 알림 읽음 처리
    @PutMapping("/{notifyId}/read")
    public ResponseEntity<NotifyDto> markAsRead(Authentication authentication, @PathVariable Long notifyId) {
        NotifyDto notifyDto = notifyService.markAsRead(authentication, notifyId);
        return ResponseEntity.ok(notifyDto);
    }

    // 알림 삭제
    @DeleteMapping("/{notifyId}")
    public ResponseEntity<String> deleteNotify(Authentication authentication, @PathVariable Long notifyId) {
        notifyService.deleteNotify(authentication, notifyId);
        return ResponseEntity.ok("Notify deleted successfully.");
    }

}
