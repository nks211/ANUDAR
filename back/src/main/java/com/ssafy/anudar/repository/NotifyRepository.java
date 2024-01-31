package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// NotifyRepository : 알림 객체를 저장하고 관리 함
// EmitterRepository : SSE 연결을 관리하는 SseEmitter 객체와 이벤트 캐시를 웹 형태로 저장하고 관리
@Repository
public interface NotifyRepository extends JpaRepository<Notify, Long> {

}




