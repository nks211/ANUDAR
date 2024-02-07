package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionWorkRepository extends JpaRepository<AuctionWork, Long> {
    List<AuctionWork> findByUser(User user);

    List<AuctionWork> findAllByUser(User user);

}
