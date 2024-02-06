package com.ssafy.anudar.service;


<<<<<<< HEAD
=======
import com.ssafy.anudar.dto.ExhibitionDetailDto;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.dto.WorkDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.*;
import com.ssafy.anudar.repository.DocentRepository;
import com.ssafy.anudar.repository.ExhibitionRepository;
import com.ssafy.anudar.repository.LikeExhibitionRepository;
import com.ssafy.anudar.repository.UserRepository;
import com.ssafy.anudar.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
<<<<<<< HEAD
=======
import java.util.stream.Collectors;
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b

@Service
@Transactional
@RequiredArgsConstructor
public class ExhibitionService {

    private final ExhibitionRepository exhibitionRepository;
    private final UserRepository userRepository;
    private final DocentRepository docentRepository;
    private final WorkRepository workRepository;
    private final LikeExhibitionRepository likeExhibitionRepository;

    @Transactional
    public ExhibitionDto saveExhibition (String name, String detail, String start_time, String end_time, String image, String username,
                                         String docent_start, String docent_end,
                                         List<String> works_title, List<String> works_detail, List<Integer> works_price, List<String> works_image) {
        // 날짜 String 형태 포맷
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        // 사용자 ID로 사용자 정보를 조회
        User user = userRepository.findByUsername(username).orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        // 작가로 설정
        user.setRole(UserRole.AUTHOR);
        userRepository.save(user);

        // 전시회 저장
        Exhibition exhibition = new Exhibition(name, detail, LocalDateTime.parse(start_time,formatter), LocalDateTime.parse(end_time,formatter), image, user);
        exhibitionRepository.save(exhibition);

        // 도슨트 저장
        Docent docent = new Docent(LocalDateTime.parse(docent_start,formatter), LocalDateTime.parse(docent_end,formatter), exhibition);
        docentRepository.save(docent);

        // 작품들 저장
        for(int i=0;i<works_title.size();i++){
            Work work = new Work(works_title.get(i), works_detail.get(i), works_price.get(i), works_image.get(i), user, exhibition);
            WorkDto.fromEntity(workRepository.save(work));
        }

<<<<<<< HEAD
        // 도슨트 url 저장
        exhibition.setDocent_url("https://anudar.com/docent/" + exhibition.getId());  // 도슨트 URL을 직접 저장하도록 수정

=======
>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
        return ExhibitionDto.fromEntity(exhibition);
    }

    // 전시회 전체 조회
<<<<<<< HEAD
    public List<Exhibition> getAllExhibitions() { return exhibitionRepository.findAll(); }

    // 전시회 상세 조회
    public Optional<Exhibition> getExhibitionById(Long exhibition_id) {
        return exhibitionRepository.findById(exhibition_id);
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
=======
    public List<ExhibitionDto> getAllExhibitions() {
        return exhibitionRepository.findAll()
                .stream()
                .map(ExhibitionDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 전시회 상세 조회
    public ExhibitionDetailDto getExhibitionById(Long exhibition_id) {
        Exhibition exhibition = exhibitionRepository.findById(exhibition_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.EXHIBIT_NOT_FOUND));
        return ExhibitionDetailDto.fromEntity(exhibition);
    }

    // 전시회 찜하기
    @Transactional
    public void likeExhibition(String username, Long exhibition_id){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));

        Exhibition exhibition = exhibitionRepository.findById(exhibition_id)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.EXHIBIT_NOT_FOUND));

        Optional<LikeExhibition> likeExhibition = likeExhibitionRepository.findByUserAndExhibition(user, exhibition);

        if(likeExhibition.isPresent()) { // 좋아요가 이미 존재 -> 취소
            likeExhibitionRepository.delete(likeExhibition.get());
        } else { // 좋아요가 없음 -> 생성
            likeExhibitionRepository.save(new LikeExhibition(user, exhibition));
        }

>>>>>>> 8fd1a240260cbd4309f53f54122a0ce2e689a39b
    }

}
