package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
            "AND e.start_time <= :auctionTime " +
            "ORDER BY w.bid")
    List<Work> findAllPrevAuctionWorks(LocalDateTime auctionTime);

    @Query("SELECT w FROM Work w JOIN w.exhibition e " +
            "WHERE w.bid >= 1 " +
            "AND e.start_time <= :nextAuction AND e.start_time > :prevAuction " +
            "ORDER BY w.bid"
    )
    List<Work> findAuctionWorks(LocalDateTime prevAuction, LocalDateTime nextAuction);
}
