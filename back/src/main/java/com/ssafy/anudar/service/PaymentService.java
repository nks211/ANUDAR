package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.PaymentApproveDto;
import com.ssafy.anudar.dto.PaymentReadyDto;
import com.ssafy.anudar.dto.request.PaymentApproveRequestDto;
import com.ssafy.anudar.dto.request.PaymentReadyRequestDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Payment;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.PaymentRepository;
import com.ssafy.anudar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service
@Transactional

public class PaymentService {

    @Value("${pay.secret-key}")
    private String secretKey;
    private final RestTemplate restTemplate;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    private final String kakaoPayReadyUrl = "https://open-api.kakaopay.com/online/v1/payment/ready";
    private final String kakaoPayApproveUrl = "https://open-api.kakaopay.com/online/v1/payment/approve";

    public PaymentService(RestTemplateBuilder restTemplateBuilder, PaymentRepository paymentRepository, UserRepository userRepository) {
        this.restTemplate = restTemplateBuilder.build();
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
    }


    // 결제 준비
    public PaymentReadyDto preparePayment(String username, PaymentReadyRequestDto requestDto) {

//        requestDto.setApproval_url("http://localhost:8080/approval");
//        requestDto.setCancel_url("http://localhost:8080/cancel");
//        requestDto.setFail_url("http://localhost:8080/fail");

        // 사용자 정보 가져오기
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // 결제 정보 생성 및 저장
        Payment payment = new Payment();
        payment.setCid(requestDto.getCid());
        payment.setPartner_order_id(requestDto.getPartner_order_id());
        payment.setPartner_user_id(requestDto.getPartner_user_id());
        payment.setTotal_amount(Math.toIntExact(requestDto.getTotal_amount()));
        payment.setUser(user);
        paymentRepository.save(payment);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_JSON + ";charset=UTF-8");
        headers.add("Authorization", "SECRET_KEY " + secretKey);

        HttpEntity<PaymentReadyRequestDto> request = new HttpEntity<>(requestDto, headers);

        ResponseEntity<PaymentReadyDto> response = restTemplate.postForEntity(kakaoPayReadyUrl, request, PaymentReadyDto.class);

        return response.getBody();
    }

    // 결제 승인
    public PaymentApproveDto approvePayment(String username, PaymentApproveRequestDto requestDto) {

        // 사용자 정보 가져오기
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // 결제 승인 요청에 필요한 정보를 설정
        Map<String, Object> requestMap = new HashMap<>();
        requestMap.put("cid", requestDto.getCid()); // 가맹점 코드, 테스트 코드 또는 실제 발급받은 코드 사용
        requestMap.put("tid", requestDto.getTid()); // 결제 준비 응답에서 받은 tid
        requestMap.put("partner_order_id", requestDto.getPartner_order_id()); // 가맹점 주문번호
        requestMap.put("partner_user_id", requestDto.getPartner_user_id()); // 가맹점 회원 id
        requestMap.put("pg_token", requestDto.getPg_token()); // 사용자 결제 수단 선택 후 받은 pg_token

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_JSON + ";charset=UTF-8");
        headers.add("Authorization", "SECRET_KEY " + secretKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestMap, headers);
        ResponseEntity<PaymentApproveDto> response = restTemplate.postForEntity(kakaoPayApproveUrl, request, PaymentApproveDto.class);


        if (response.getStatusCode().is2xxSuccessful()) {
            Optional<Payment> paymentInfoOpt = paymentRepository.findFirstByPartnerOrderId(requestDto.getPartner_order_id());
            if (paymentInfoOpt.isPresent()) {
                Payment paymentInfo = paymentInfoOpt.get();
                Long totalAmount = Long.valueOf(paymentInfo.getTotal_amount());

                // 사용자 엔터티를 통해 사용자 포인트 정보 업데이트
//                User user = paymentInfo.getUser();

                // 사용자 포인트 업데이트 메소드 호출
                user.addPoints(totalAmount);

                // 사용자 정보 저장
                userRepository.save(user);

                return response.getBody();
            } else {
                throw new BadRequestException(ExceptionStatus.PAYMENT_NOT_FOUND);
            }
        }
        return null; // 결제 승인에 실패했거나, 결제 정보를 찾을 수 없는 경우
    }
}
