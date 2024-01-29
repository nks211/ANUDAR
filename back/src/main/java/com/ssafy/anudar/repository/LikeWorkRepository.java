package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.LikeWork;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeWorkRepository extends JpaRepository<LikeWork, Long> {
    Optional<LikeWork> findByUserAndWork(User user, Work work);
}
