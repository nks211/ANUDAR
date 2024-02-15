package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment p WHERE p.partner_order_id = :partner_order_id")
    Optional<Payment> findFirstByPartnerOrderId(String partner_order_id);


}
