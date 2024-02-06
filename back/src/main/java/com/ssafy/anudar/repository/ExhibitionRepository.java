package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Exhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {

    @Query("SELECT e FROM Exhibition e WHERE e.start_time <= :now AND e.end_time >= :now")
    List<Exhibition> findExhibitionsByCurrentTime(LocalDateTime now);

}
