package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.ExhibitionReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExhibitionReviewRepository extends JpaRepository<ExhibitionReview, Long> {

}
