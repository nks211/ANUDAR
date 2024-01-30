package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Docent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocentRepository extends JpaRepository <Docent, Long> {

}
