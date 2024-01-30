package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.AuctionVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionVideoRepository extends JpaRepository<AuctionVideo, Long> {
}
