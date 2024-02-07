package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.PayApproveResDto;
import com.ssafy.anudar.dto.PayInfoDto;
import com.ssafy.anudar.dto.PayReadyResDto;
import com.ssafy.anudar.dto.request.MakePayRequest;
import com.ssafy.anudar.dto.request.PayRequest;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j

public class KakaoPayService {

    private final MakePayRequest makePayRequest;
    private final UserRepository  userRepository;

    @Value("${pay.admin-key}")
    private String adminKey;

    /** 카카오페이 결제를 시작하기 위해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호를 받는 단계 입니다...
     어드민 키를 헤더에 담아 파라미터 값들과 함께 POST로 요청합니다.
     */
    @Transactional
    public PayReadyResDto getRedirectUrl(PayInfoDto payInfoDto) throws Exception{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
//
        Long id = user.getId();

        HttpHeaders headers = new HttpHeaders();

        /** 요청 헤더 **/
        String auth = "KakaoAK " + adminKey;
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization",auth);

        /** 요청 Body */
        PayRequest payRequest = makePayRequest.getReadyRequest(id ,payInfoDto);

        /** Header와 Body 합쳐서 RestTemplate로 보내기 위한 밑작업 */
        HttpEntity<MultiValueMap<String, String>> urlRequest = new HttpEntity<>(payRequest.getMap(), headers);

        /** RestTemplate로 Response 받아와서 DTO로 변환후 return */
        RestTemplate rt = new RestTemplate();
        PayReadyResDto payReadyResDto = rt.postForObject(payRequest.getUrl(), urlRequest, PayReadyResDto.class);

        user.updateTid(payReadyResDto.getTid());

        return payReadyResDto;
    }

    @Transactional
    public PayApproveResDto getApprove(String pgToken, Long Id) throws Exception{

        User user = userRepository.findById(Id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        String tid = user.getTid();

        HttpHeaders headers = new HttpHeaders();
        String auth = "KakaoAK " + adminKey;

        /** 요청 헤더 */
        headers.set("Content-type","application/x-www-form-urlencoded;charset=utf-8");
        headers.set("Authorization",auth);

        /** 요청 Body */
        PayRequest payRequest = makePayRequest.getApproveRequest(tid, Id, pgToken);


        /** Header와 Body 합쳐서 RestTemplate로 보내기 위한 밑작업 */
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(payRequest.getMap(), headers);

        // 요청 보내기
        RestTemplate rt = new RestTemplate();
        PayApproveResDto payApproveResDto = rt.postForObject(payRequest.getUrl(), requestEntity, PayApproveResDto.class);


        return payApproveResDto;
    }
}
