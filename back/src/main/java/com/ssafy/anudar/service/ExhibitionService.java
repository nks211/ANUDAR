package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.DocentDto;
import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.dto.LikeExhibitionDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Docent;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.LikeExhibition;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.DocentRepository;
import com.ssafy.anudar.repository.ExhibitionRepository;
import com.ssafy.anudar.repository.LikeExhibitionRepository;
import com.ssafy.anudar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ExhibitionService {

    private final ExhibitionRepository exhibitionRepository;
    private final UserRepository userRepository;
    private final DocentRepository docentRepository;
    private final LikeExhibitionRepository likeExhibitionRepository;

    @Transactional
    public ExhibitionDto saveExhibition(String name, String detail, String start_time, String end_time, String username, String docent_start, String docent_end) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        // 사용자 ID로 사용자 정보를 조회
        User user = userRepository.findByUsername(username).orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));


        
        // 전시회 저장
        Exhibition exhibition = new Exhibition(name, detail, LocalDateTime.parse(start_time,formatter), LocalDateTime.parse(end_time,formatter), user);
        exhibitionRepository.save(exhibition);

        // 도슨트 저장
        Docent docent = new Docent(LocalDateTime.parse(docent_start,formatter), LocalDateTime.parse(docent_end,formatter), exhibition);
        docentRepository.save(docent);

        // 도슨트 url 저장
        exhibition.setDocent_url("https://anudar.com/docent/" + exhibition.getId());  // 도슨트 URL을 직접 저장하도록 수정

        return ExhibitionDto.fromEntity(exhibition);
    }

    // 전시회 전체 조회
    public List<Exhibition> getAllExhibitions() {
        return exhibitionRepository.findAll();
    }

    // 전시회 상세 조회
    public Optional<Exhibition> getExhibitionById(Long exhibitionId) {
        return exhibitionRepository.findById(exhibitionId);
    }

    // 전시회 찜하기
    public void likeExhibition(String username, String exhibition_id){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // exhibition_id를 Long으로 변환
        Long exhibitionId = Long.valueOf(exhibition_id);

        Exhibition exhibition = exhibitionRepository.findById(exhibitionId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.EXHIBIT_NOT_FOUND));

        if(!exhibition.getUser().getUsername().equals(username)){
            likeExhibitionRepository.findByUserAndExhibition(user, exhibition)
                    .orElseGet(() -> {
                        // 없으면 찜 생성해주기
                        LikeExhibition likeExhibition = new LikeExhibition(user, exhibition);
                        likeExhibitionRepository.save(likeExhibition);
                        return likeExhibition;
                    });
        }
    }

    // 전시회 찜 취소하기
    public void unlikeExhibition(String username, String exhibition_id) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        // exhibition_id를 Long으로 변환
        Long exhibitionId = Long.valueOf(exhibition_id);

        Exhibition exhibition = exhibitionRepository.findById(exhibitionId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.EXHIBIT_NOT_FOUND));

        // 현재 로그인한 사용자의 찜인지 확인
        LikeExhibition likeExhibition = likeExhibitionRepository.findByUserAndExhibition(user, exhibition)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.LIKE_NOT_FOUND));

        // 찜 삭제하기
        likeExhibitionRepository.delete(likeExhibition);
    }

}
