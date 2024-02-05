package com.ssafy.anudar.service;


import com.ssafy.anudar.dto.NotifyDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.NotifyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotifyService {

    @Autowired
    private NotifyRepository notifyRepository;

    // 특정 사용자의 알림 조회
    public List<NotifyDto> getNotifiesByUserId(Long userId){
        List<Notify> notifies = notifyRepository.findByReceiverId(userId);
        return notifies.stream().map(NotifyDto::fromEntity).collect(Collectors.toList());
    }

    // 알림 읽음 처리
    public NotifyDto markAsRead(Authentication authentication, Long notifyId){
        String currentUsername = authentication.getName(); // 현재 인증된 사용자의 이름(또는 ID)
        Notify notify = notifyRepository.findById(notifyId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.NOTIFICATION_NOT_FOUND));

        // 현재 사용자가 알림의 수신자와 일치하는지 확인
        if (!notify.getReceiver().getUsername().equals(currentUsername)) {
            throw new BadRequestException(ExceptionStatus.UNAUTHORIZED);
        }

        notify.setIsRead(true);
        notify = notifyRepository.save(notify);
        return NotifyDto.fromEntity(notify);
    }

    // 알림 삭제
    public void deleteNotify(Authentication authentication, Long notifyId) {
        Notify notify = notifyRepository.findById(notifyId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.NOTIFICATION_NOT_FOUND));
        String currentUsername = authentication.getName(); // 현재 인증된 사용자의 이름(또는 ID)

        // 현재 사용자가 알림의 수신자와 일치하는지 확인
        if (!notify.getReceiver().getUsername().equalsIgnoreCase(currentUsername)) {
            throw new BadRequestException(ExceptionStatus.UNAUTHORIZED);
        }
        // 사용자의 알림 리스트에서도 해당 알림 삭제
        User user = notify.getReceiver();
        user.getNotifies().remove(notify);

        notifyRepository.deleteById(notifyId);
    }
}