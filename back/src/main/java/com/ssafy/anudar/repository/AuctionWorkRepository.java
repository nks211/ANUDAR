package com.ssafy.anudar.repository;

import com.ssafy.anudar.dto.AuctionDto;
import com.ssafy.anudar.model.SuccessWork;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionWorkRepository extends JpaRepository<SuccessWork, Long> {
    List<SuccessWork> findByUser(User user);

    List<SuccessWork> findAllByUser(User user);

}
