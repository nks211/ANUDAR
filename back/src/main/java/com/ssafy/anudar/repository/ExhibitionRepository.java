package com.ssafy.anudar.repository;

<<<<<<< HEAD
import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
=======
import com.ssafy.anudar.model.Exhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b

@Repository
public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {
}
