package com.ssafy.anudar.controller;

import com.ssafy.anudar.S3.S3Service;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin(allowedHeaders = "*", originPatterns = "*")
@RequestMapping("/")
@RestController
public class OpenviduController {

    private final S3Service s3Service;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // params에 sessionId 받아와서 커스텀 sessionId 설정해주기
        SessionProperties properties;
        if(params.containsKey("sessionId")) {
            properties = new SessionProperties.Builder()
                    .customSessionId((String) params.get("sessionId"))
                    .build();
        } else {
            properties = SessionProperties.fromJson(params).build();
        }
        Session session = openvidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @PostMapping("/sessions/{sessionId}/recording")
    public ResponseEntity<?> startRecording(@PathVariable("sessionId") String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        RecordingProperties properties = new RecordingProperties.Builder()
                .outputMode(Recording.OutputMode.INDIVIDUAL)
                .build();
        openvidu.startRecording(sessionId, properties);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // *** 도슨트 아이디로 파일 찾기 ***
    @GetMapping("/sessions/{sessionId}/recordings/{filename}")
    public ResponseEntity<String> getSessionRecordings(@PathVariable("sessionId") String sessionId, @PathVariable("filename") String filename) {
        return new ResponseEntity<>(s3Service.uploadVideo(sessionId, filename), HttpStatus.OK);
    }

    @DeleteMapping("/sessions/{sessionId}/recordings")
    public ResponseEntity<Void> stopRecording(@PathVariable("sessionId") String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        openvidu.stopRecording(sessionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<Void> closeSession(@PathVariable("sessionId") String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        openvidu.getActiveSession(sessionId).close();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/sessions/{sessionId}/connections/{connectionId}")
    public ResponseEntity<Void> closeConnection(@PathVariable("sessionId") String sessionId,
                                                @PathVariable("connectionId") String connectionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Connection connection = session.getActiveConnections().stream()
                .filter(c -> c.getConnectionId().equals(connectionId))
                .findFirst()
                .orElse(null);
        if (connection == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        session.forceDisconnect(connection);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
