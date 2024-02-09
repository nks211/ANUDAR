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

      // 만약 나의 myUserName이 'host'일 경우 주요 비디오 스트림으로 설정합니다.
      // 녹화를 시작합니다.
      if (myUserName === 'host') {
        handleMainVideoStream(publisher);
      }

      await mySession.publish(publisher);

      setSession(mySession);
      setPublisher(publisher);
    } catch (error) {
      console.log('There was an error connecting to the session:', error.code, error.message);
    }

  }

  const leaveSession = () => {
    if (myUserName === 'host') {
      axios.delete(APPLICATION_SERVER_URL + 'api/sessions/' + MysessionId + '/recordings')
      axios.delete(APPLICATION_SERVER_URL + 'api/sessions/' + MysessionId)
    }

    if (session) {
      session.disconnect();
    }

    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

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
          {mainStreamManager !== undefined ? (
            <div>
              <h2>도슨트 입니당</h2>
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : (<div>도슨트가 없어요</div>)}

          <div>
            {publisher !== undefined ? (
              <div>
                <h2>publisher</h2>
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub) => (
              <div key={sub.stream.streamId}>
                <span>{sub.id}</span>
                <h2>subscribers</h2>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      )
        : (<div>세션이 없어요.</div>)}
    </div>
  )

}
export default WebCam;