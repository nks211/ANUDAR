package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.AuctionWork;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionWorkRepository extends JpaRepository<AuctionWork, AuctionWork> {
    List<AuctionWork> findByUser(User user);
}
