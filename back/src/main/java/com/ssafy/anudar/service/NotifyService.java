package com.ssafy.anudar.service;

import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.Notifytype;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.NotifyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NotifyService {
    private final NotifyRepository notifyRepository;

    public void createdNotifications(User user, Notifytype notifytype, String link){
        String content = generateContent(notifytype, link);
        Notify notify = Notify.from(link, content, LocalDateTime.now(), false, user);
            notify.setNotifytype(notifytype);
            notifyRepository.save(notify);
    }

    // 읽지 않은 알람 조회
    public List<Notify> getUnreadNotifications(User user){
        return notifyRepository.findByUserAndChecked(user, false);
    }


    // 알림 읽음 처리
    public void markNotificationAsRead(Long notificationId) {
        Notify notify = notifyRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 알림이 존재하지 않습니다."));

        notify.read();
    }

    // 알람 삭제
    public void deleteNotification(Long notificationsId){
        notifyRepository.deleteById(notificationsId);
    }

    // 알람 생성(넘겨 오는 Notify의 타입에 따라 다르게 생성해줌..)
    private String generateContent(Notifytype notifytype, String link){
        switch(notifytype){
            case AUTION_CREATED:
                return "경매가 시작되었습니다. 확인해보세요" + link;
            case DOCENT_CREATED:
                return "도습트가 시작되었습니다. 확인해보세요" + link;
            case FOLLOWER_CREATED:
                return "새로운 팔로워가 생겼습니다. 확인해보세요" ;
            default:
                return "새로운 알림이 도착했습니다. 확인해보세요" + link;
        }
    }
}