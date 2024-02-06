package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.ExhibitionReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExhibitionReviewRepository extends JpaRepository<ExhibitionReview, Long> {

<<<<<<< HEAD
    List<ExhibitionReview> findAllByExhibition(Optional<Exhibition> exhibition);
=======
    List<ExhibitionReview> findAllByExhibition(Exhibition exhibition);
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
}
