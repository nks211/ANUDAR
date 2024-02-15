package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    Optional<Work> findById(Long id);

    List<Work> findAllByUser(User user);

    List<Work> findAllByExhibition(Exhibition exhibition);

    @Query("SELECT w FROM Work w JOIN w.exhibition e " +
            "WHERE w.bid >= 1 " +
            "AND YEAR(e.start_time) = YEAR(:currentAuction) " +
            "AND MONTH(e.start_time) = MONTH(:currentAuction) " +
            "ORDER BY w.bid DESC LIMIT 20")
    List<Work> findTop20AuctionWorks(LocalDateTime currentAuction);

    @Query("SELECT w FROM Work w JOIN w.exhibition e " +
            "WHERE w.is_carousel = true " +
            "AND e.id = :exhibitionId")
    List<Work> findCarousel(Long exhibitionId);

}
