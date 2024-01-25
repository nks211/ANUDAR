package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Notify;
import com.ssafy.anudar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotifyRepository extends JpaRepository<Notify, Long> {
    List<Notify> findByUserAndChecked(User user, boolean checked);

    List<Notify> findByUserAndCheckedOrderByCreatedDesc(User user, boolean checked);


}




