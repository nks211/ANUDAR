package com.ssafy.anudar.controller;

import com.ssafy.anudar.dto.ExhibitionDto;
import com.ssafy.anudar.dto.request.ExhibitionRegistRequest;
import com.ssafy.anudar.model.Exhibition;
import com.ssafy.anudar.service.ExhibitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exhibit")
public class ExhibitionController {

    private final ExhibitionService exhibitionService;

    @PostMapping("/regist")
    public ResponseEntity<ExhibitionDto> regist(Authentication authentication, @RequestBody ExhibitionRegistRequest req) {
        ExhibitionDto exhibitionDto = exhibitionService
                .saveExhibition(req.getName(), req.getDetail(), req.getStart_time(), req.getEnd_time(), authentication.getName(), req.getDocent_start(), req.getDocent_end());
        return new ResponseEntity<>(exhibitionDto, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Exhibition>> list() {
        List<Exhibition> exhibitions = exhibitionService.getAllExhibitions();
        return new ResponseEntity<>(exhibitions, HttpStatus.OK);
    }
}