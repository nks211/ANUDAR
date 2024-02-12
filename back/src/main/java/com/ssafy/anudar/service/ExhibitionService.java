package com.ssafy.anudar.service;


import com.ssafy.anudar.dto.ExhibitionDetailDto;
import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.dto.request.WorkRegistRequest;
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
import java.util.List;
import java.util.Optional;

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
                                         List<WorkRegistRequest> works) {
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

        for (WorkRegistRequest work : works) {
            workRepository.save(new Work(work.getTitle(), work.getDetail(), work.getPrice(), work.getImage(), user, exhibition));
        }

        return ExhibitionDto.fromEntity(exhibition);
    }

    // 전시회 전체 조회
    public List<ExhibitionDto> getAllExhibitions() {
        return exhibitionRepository.findAll()
                .stream()
                .map(ExhibitionDto::fromEntity)
                .toList();
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

    }

    // 현재 시간 기준으로 진행중인 전시가져오기
    public List<ExhibitionDto> getCurrentExhibitions () {
        return exhibitionRepository.findExhibitionsByCurrentTime(LocalDateTime.now())
                .stream().map(ExhibitionDto::fromEntity)
                .toList();
    }

    // 도슨트 비디오 정보 저장
    @Transactional
    public void saveDocentVideo(Long docentId, String video) {
        Docent docent = docentRepository.findById(docentId)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.DOCENT_NOT_FOUND));
        if(docent.getVideo() == null) {
            docent.setVideo(video);
        }
    }

    // 도슨트 비디오 정보 가져오기
    public String getDocentVideo(Long docentId) {
        Docent docent = docentRepository.findById(docentId)
                .orElseThrow(()->new BadRequestException(ExceptionStatus.DOCENT_NOT_FOUND));
        if(docent.getVideo() == null)
            throw new BadRequestException(ExceptionStatus.RECORD_NOT_FOUND);
        return docent.getVideo();
    }

}
