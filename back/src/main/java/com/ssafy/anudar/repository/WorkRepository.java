package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
}
