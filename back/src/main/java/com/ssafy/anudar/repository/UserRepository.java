package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.UserRole;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    List<User> findByRole(UserRole role);
    Optional<User> findByNickname(String nickname);

    void deleteById(Long id);

//    // 사용자 이름으로 포인트 업데이트
//    @Modifying
//    @Query("UPDATE User u SET u.userPoints = :points WHERE u.username = :username")
//    void updatePointsByUsername(String username, Long points);

}
