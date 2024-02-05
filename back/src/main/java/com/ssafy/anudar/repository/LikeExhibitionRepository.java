package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.LikeExhibition;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeExhibitionRepository extends JpaRepository<LikeExhibition, Long> {
    Optional<LikeExhibition> findByUserAndExhibition(User user, Exhibition exhibition);

    List<LikeExhibition> findAllByUser(User user);
}
