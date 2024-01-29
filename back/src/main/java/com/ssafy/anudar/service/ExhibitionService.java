package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.repository.ExhibitionRepository;
import com.ssafy.anudar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ExhibitionService {

    private final ExhibitionRepository exhibitionRepository;
    private final UserRepository userRepository;
    @Transactional
    public ExhibitionDto saveExhibition (String name, String detail, String start_time, String end_time, String username) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 사용자 ID로 사용자 정보를 조회
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        // 전시회 저장
        Exhibition exhibition = new Exhibition(name, detail, LocalDateTime.parse(start_time,formatter), LocalDateTime.parse(end_time,formatter), user);

        // 저장
        exhibitionRepository.save(exhibition);

        // 전시회에 도슨트 URL 설정
        String docent_url = exhibition.setDocentUrl(exhibition.getId());

        // 재저장..
        exhibitionRepository.save(exhibition);


        return ExhibitionDto.fromEntity(exhibitionRepository.save(exhibition));
    }

    public List<Exhibition> getAllExhibitions() {
        return exhibitionRepository.findAll();
    }
}
