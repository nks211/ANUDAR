import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import axios from 'axios';

const APPLICATION_SERVER_URL = 'https://i10d105.p.ssafy.io/';

function AuctionCam({ sessionId, username }) {
    const [session, setSession] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        joinSession();
        return () => {
            leaveSession();
        }
    }, [])

    const joinSession = async () => {
        const OV = new OpenVidu();
        const mySession = OV.initSession();

        mySession.on('streamCreated', (event) => {
            if (event.stream.connection.connectionId !== mySession.connection.connectionId) {
                const subscriber = mySession.subscribe(event.stream, undefined);
                setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
                // 스트림의 username이 'admin'일 때 메인 스트림으로 해주기
                const name = JSON.parse(event.stream.connection.data).clientData
                if (name === 'admin') {
                    console.log("경매사 입장")
                    handleMainVideoStream(subscriber);
                }
            }
        })

        mySession.on('streamDestroyed', (event) => {
            setSubscribers((prevSubscribers) =>
                prevSubscribers.filter((sub) => sub.stream.streamId !== event.stream.streamId)
            );
        });

        try {
            const token = await getToken();
            await mySession.connect(token, { clientData: username });

            const publisher = OV.initPublisher(undefined, {
                publishAudio: true,
                publishVideo: true,
            });

            await mySession.publish(publisher);

            setSession(mySession);
            setPublisher(publisher);

            if (username === 'admin') {
                handleMainVideoStream(publisher);
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


    const getToken = async () => {
        const id = await createSession(sessionId);
        const token = await createToken(id);
        return token;
    };

    const createSession = async (MysessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { sessionId: MysessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    };

    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', { username: username }, {
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
        <>
            {session !== undefined} ? (
            {mainStreamManager !== undefined ? (
                <div>
                    <UserVideoComponent streamManager={mainStreamManager} />
                </div>
            ) : (<div>경매사가 없어요</div>)} )
            : (<div>세션이 없어요</div>)
        </>
    )

}
export default AuctionCam;