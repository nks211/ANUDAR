package com.ssafy.anudar.controller;

import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.Notifytype;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.NotifyRepository;
import com.ssafy.anudar.service.NotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequiredArgsConstructor
@RequestMapping("/notifies")
public class NotifyController {
    private final NotifyRepository notifyRepository;
    private final NotifyService notifyService;

    // 알림 전체 조회
    @GetMapping("/list")
    public String listNotifications(@AuthenticationPrincipal User user, Model model) {
        List<Notify> notifies = notifyService.getUnreadNotifications(user);
        model.addAttribute("notifications, notifications");
        return "notification/list";
    }

    // 알림 읽음 처리
    @GetMapping("/read/{notificationId}")
    public String markNotificationAsRead(@PathVariable Long notificationId) {
        notifyService.markNotificationAsRead(notificationId);
        return "redirect:/notifies/list";
    }

    // 알림 삭제
    @GetMapping("/delete/{notificationId}")
    public String deleteNotification(@PathVariable Long notificationId) {
        notifyService.deleteNotification(notificationId);
        return "redirect:/notifies/list";
    }
}

