package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionWorkRepository extends JpaRepository<AuctionWorkDto, Long> {
    List<AuctionWorkDto> findByUser(User user);

    List<AuctionWorkDto> findAllByUser(User user);

}
