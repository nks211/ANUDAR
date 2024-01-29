package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.DocentDto;
import com.ssafy.anudar.model.Docent;
import com.ssafy.anudar.repository.DocentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class DocentService {

    private final DocentRepository docentRepository;

    public void createDocent(DocentDto docentDTO){
        // DTO를 엔티티로 변환
        Docent docent = Docent.builder()
                .startTime(docentDTO.getStartTime())
                .endTime(docentDTO.getEndTime())
                .video(docentDTO.getVideo())
                .build();

        // 엔티티 저장
        docentRepository.save(docent);
    }

    public DocentDto getDocentById(Long docentId){
        // 엔티티 조회
        Docent docent = docentRepository.findById(docentId)
                .orElseThrow(() -> new NoSuchElementException("Docent not found"));

        // 엔티티를 DTO로 변환하여 반환하기
        return DocentDto.builder()
                .startTime(docent.getStartTime())
                .endTime(docent.getEndTime())
                .video(docent.getVideo())
                .exhibitionId(docent.getExhibition().getId())
                .build();
    }
}
