package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {

    @Query("SELECT a FROM Auction a WHERE a.start_time >= :now ORDER BY a.start_time ASC")
    Optional<Auction> findNextAuction(LocalDateTime now);

    @Query("SELECT a FROM Auction a WHERE a.start_time < :now ORDER BY a.start_time DESC")
    Optional<Auction> findPreviusAuction(LocalDateTime now);

}
