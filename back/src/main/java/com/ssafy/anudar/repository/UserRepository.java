package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findAll();

    // 작가 여부, 활성화 여부
    List<User> findByIsAuthorAndEnable(Boolean isAuthor, Boolean enable);

    // 활성화 여부
    List<User> findByEnable(Boolean enable);
}
