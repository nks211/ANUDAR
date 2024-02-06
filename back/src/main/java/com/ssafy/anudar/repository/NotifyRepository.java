package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Notify;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotifyRepository extends JpaRepository<Notify, Long> {
    // 사용자 ID에 따른 알림 조회
    List<Notify> findByReceiverId(Long userId);
}




