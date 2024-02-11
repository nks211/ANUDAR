import React, { Component, useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';
import './WebCam.css'

const APPLICATION_SERVER_URL = 'https://i10d105.p.ssafy.io/';
const hostStreamId = "";

function WebCam({ MysessionId, myUserName }) {
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    joinSession();
    return () => {
      console.log("leaveSession 호출")
      leaveSession();
    };
  }, []);

  const joinSession = async () => {
    console.log("joinSession  호출! sessionId는 " + MysessionId)
    const OV = new OpenVidu();
    const mySession = OV.initSession();

    mySession.on('streamCreated', (event) => {
      if (event.stream.connection.connectionId !== mySession.connection.connectionId) {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
        // 스트림의 username이 'host'일 때 메인 스트림으로 해주기
        if(event.stream.connection.data.split('%')[0] === 'host'){
          handleMainVideoStream(subscriber);
          hostStreamId=event.stream.streamId
        }
      }
    });

    mySession.on('streamDestroyed', (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((sub) => sub.stream.streamId !== event.stream.streamId)
      );
    });

    try {
      const token = await getToken();
      await mySession.connect(token, { clientData: myUserName });

      const publisher = OV.initPublisher(undefined, {
        publishAudio: true,
        publishVideo: true,
      });

      await mySession.publish(publisher);

      setSession(mySession);
      setPublisher(publisher);

      // 만약 나의 myUserName이 'host'일 경우 주요 비디오 스트림으로 설정합니다.
      // 녹화를 시작합니다.
      if (myUserName === 'host') {
        handleMainVideoStream(publisher);
        startRecording(MysessionId);
      }
    } catch (error) {
      console.log('There was an error connecting to the session:', error.code, error.message);
    }

  }

  const leaveSession = () => {

    if (session) {
      session.disconnect();
    }

    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const startRecording = async (sessionId) => {
    await axios.post(APPLICATION_SERVER_URL + 'api/sessions/recording/' + sessionId);
  }

  const getToken = async () => {
    const sessionId = await createSession(MysessionId);
    const token = await createToken(sessionId);
    return token;
  };

  const createSession = async (MysessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { sessionId: MysessionId }, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data;
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {username : myUserName}, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data;
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  return (
    <div>
      {session !== undefined ? (
        <div>

          <div className="stream-container">
            {publisher && (
              <div className="stream-item" key={publisher.stream.streamId}>
                <UserVideoComponent user='user' streamManager={publisher} />
              </div>
            )}
            {subscribers.map(sub => (
              <div className="stream-item" key={sub.stream.streamId}>
                <UserVideoComponent user='user' streamManager={sub} />
              </div>
            ))}
          </div>

          {mainStreamManager !== undefined ? (
            <div>
              <h2>도슨트 입니당</h2>
              <UserVideoComponent user='docent' streamManager={mainStreamManager} />
            </div>
          ) : (<div>도슨트가 없어요</div>)}
        </div>
      )
        : (<div>세션이 없어요.</div>)}
    </div>
  )

}
export default WebCam;