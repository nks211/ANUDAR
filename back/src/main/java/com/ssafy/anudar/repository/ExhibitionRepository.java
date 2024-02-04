package com.ssafy.anudar.repository;

import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {
}
