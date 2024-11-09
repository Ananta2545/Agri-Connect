// VideoCallPage.js
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './VideoCallPage.scss'

const socket = io('http://localhost:8000');

const VideoCallPage = ({ appointmentId, isExpert }) => {
  const [stream, setStream] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const initMedia = async () => {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userStream);
      videoRef.current.srcObject = userStream;
    };

    initMedia();

    socket.on('call-started', () => setCallStarted(true));
    socket.on('signal', async (data) => {
      if (peerConnection.current) {
        const remoteDesc = new RTCSessionDescription(data.signalData);
        await peerConnection.current.setRemoteDescription(remoteDesc);
        if (remoteDesc.type === 'offer') {
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.emit('signal', { appointmentId, signalData: answer });
        }
      }
    });

    return () => {
      socket.off('call-started');
      socket.off('signal');
    };
  }, [appointmentId]);

  const startCall = () => {
    peerConnection.current = new RTCPeerConnection();
    stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('signal', { appointmentId, signalData: event.candidate });
      }
    };

    peerConnection.current.createOffer().then((offer) => {
      peerConnection.current.setLocalDescription(offer);
      socket.emit('signal', { appointmentId, signalData: offer });
    });

    socket.emit('start-call', { appointmentId });
    setCallStarted(true);
  };

  const joinCall = () => socket.emit('join-call', { appointmentId });

  return (
    <div className="video-call-page">
      <h1>Video Call for Appointment {appointmentId}</h1>
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline muted className="local-video" />
        <video ref={remoteVideoRef} autoPlay playsInline className="remote-video" />
      </div>
      {isExpert && !callStarted ? (
        <button onClick={startCall}>Start Video Call</button>
      ) : (
        <button onClick={joinCall}>Join Video Call</button>
      )}
    </div>
  );
};

export default VideoCallPage;
