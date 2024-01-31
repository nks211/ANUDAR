package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    Auction findFirstByOrderByIdAsc();
}
