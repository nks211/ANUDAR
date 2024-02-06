package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findByRole(UserRole role);

    Optional<User> findByNickname(String nickname);

    void deleteById(Long id);
}
