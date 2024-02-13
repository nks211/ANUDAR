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

        log.info("사용자 이름 : " + params.get("username"));

        if(params.get("username").equals("host")) { // username이 host일 때 녹화시작
            log.info("호스트 녹화 시작합니다");
            startRecording(sessionId);
        }

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    private void startRecording(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        RecordingProperties properties = new RecordingProperties.Builder()
                .outputMode(Recording.OutputMode.INDIVIDUAL)
                .build();
        log.info("sessionId : "+sessionId);
        openvidu.startRecording(sessionId, properties);
        log.info("녹화를 시작합니다.");
    }

    // *** 도슨트 아이디로 파일 찾기 ***
    @GetMapping("/sessions/{sessionId}/recordings/{filename}")
    public ResponseEntity<String> getSessionRecordings(@PathVariable("sessionId") String sessionId, @PathVariable("filename") String filename) throws OpenViduJavaClientException, OpenViduHttpException {
//        List<Recording> recordings = openvidu.listRecordings();
//        // 세션 ID에 해당하는 녹화 파일을 찾음
//        List<Recording> sessionRecordings = getSessionRecordingsById(sessionId, recordings);
        return new ResponseEntity<>(s3Service.uploadVideo(sessionId, filename), HttpStatus.OK);
    }

    private List<Recording> getSessionRecordingsById(String sessionId, List<Recording> recordings) {
        List<Recording> sessionRecordings = new ArrayList<>();
        for (Recording recording : recordings) {
            if (sessionId.equals(recording.getSessionId())) {
                sessionRecordings.add(recording);
            }
        }
        return sessionRecordings;
    }

    @DeleteMapping("/sessions/{sessionId}/recordings")
    public ResponseEntity<Void> stopRecording(@PathVariable("sessionId") String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // 해당 세션의 녹화를 중지합니다.
        openvidu.stopRecording(sessionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<Void> closeSession(@PathVariable("sessionId") String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // 해당 세션을 종료합니다.
        openvidu.getActiveSession(sessionId).close();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/sessions/{sessionId}/connections/{connectionId}")
    public ResponseEntity<Void> closeConnection(@PathVariable("sessionId") String sessionId,
                                                @PathVariable("connectionId") String connectionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        // 해당 세션에서 해당 Connection을 찾아 종료합니다.
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
