package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    Optional<Work> findById(Long id);

<<<<<<< HEAD
    List<Work> findAllByUser(Optional<User> user);

    List<Work> findAllByExhibition(Optional<Exhibition> exhibition);
=======
    List<Work> findAllByUser(User user);

    List<Work> findAllByExhibition(Exhibition exhibition);
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
}
