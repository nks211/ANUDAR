package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Docent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DocentRepository extends JpaRepository <Docent, Long> {
    Optional<Docent> findByExhibitionId(Long exhibition_id);
}
