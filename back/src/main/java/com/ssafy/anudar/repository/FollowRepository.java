package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Follow;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    // 유저 두명을 param으로 받아서 삭제
    @Modifying
    @Transactional
    @Query("DELETE FROM Follow f WHERE f.toUser = :to_user AND f.fromUser = :from_user")
    void deleteByToUserAndFromUser(@Param("to_user") User toUser, @Param("from_user") User fromUser);
}
