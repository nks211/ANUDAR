package com.ssafy.anudar.service;

import com.ssafy.anudar.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

public class EventNotifyService {
    private final NotifyService notifyService;

    public EventNotifyService(NotifyService notifyService){
        this.notifyService = notifyService;
    }

    // 팔로우 시 만들어지는 알림
    public void notifyFollow(User follower, User following){
        Notify notify = Notify.builder()
                .receiver(following)
                .notifytype(Notify.NotifyType.FOLLOW)
                .content("새로운 팔로워 : " + follower.getUsername())
                .isRead(false)
                .build();

        notifyService.notify(following.getId(), notify);
    }

    // 방명록 작성 시 보내지는 알람
    public void notifyReview(User commenter, ExhibitionReview exhibitionReview){
        Notify notify = Notify.builder()
                .receiver(commenter)
                .notifytype(Notify.NotifyType.REVIEW)
                .content("새로운 방명록이 달렸습니다")
                .isRead(false)
                .build();

        notifyService.notify(commenter.getId(), notify);
    }

    // 경매 30분전 알람
    public void notifyAuction(User admin, Auction auction) {
        // 경매 시작 30분 전 알림 생성 로직 구현


        Notify notify = Notify.builder()
                .receiver(admin)
                .notifytype(Notify.NotifyType.AUTION)
                .content("경매 시작 30분 전입니다")
                .isRead(false)
                .build();

        notifyService.notify(admin.getId(), notify);
    }

    public void notifyDocent(User author, Docent docent) {
        // 도슨트 시작 30분 전 알림 생성 로직 구현


        Notify notify = Notify.builder()
                .receiver(author)
                .notifytype(Notify.NotifyType.DOCENT)
                .content("도슨트 시작 30분 전입니다")
                .isRead(false)
                .build();

        notifyService.notify(author.getId(), notify);
    }
}
