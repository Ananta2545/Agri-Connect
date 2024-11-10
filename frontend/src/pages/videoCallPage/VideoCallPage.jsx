import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './VideoCallPage.scss';

const VideoCallRoom = ({ appointmentId, role }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('https://weather-xgyu.onrender.com');
    setSocket(newSocket);

    newSocket.emit('join-call', { appointmentId, role });

    // Listen for incoming offer (from farmer)
    newSocket.on('video-call-offer', handleOffer);

    // Listen for incoming answer (from expert)
    newSocket.on('video-call-answer', handleAnswer);

    // Listen for incoming ICE candidates
    newSocket.on('ice-candidate', handleIceCandidate);

    return () => newSocket.disconnect();
  }, [appointmentId, role]);

  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const handleJoinCall = (data) => {
    if (data.role !== role) return;
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          to: data.role === 'farmer' ? 'expert' : 'farmer',
          candidate: event.candidate,
          appointmentId,
        });
      }
    };
    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
    if (localStream) {
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    }
    setPeerConnection(pc);
    if (role === 'farmer') makeOffer(pc);
  };

  const makeOffer = async (pc) => {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('video-call-offer', {
      offer,
      appointmentId,
      role: 'expert',
    });
  };

  const handleOffer = async (offerData) => {
    const { offer } = offerData;
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('video-call-answer', {
      answer,
      appointmentId,
      role: 'farmer',
    });
  };

  const handleAnswer = (answerData) => {
    const { answer } = answerData;
    peerConnection.setRemoteDescription(answer);
  };

  const handleIceCandidate = (candidateData) => {
    const { candidate } = candidateData;
    peerConnection.addIceCandidate(candidate);
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.kind === 'audio') {
          track.enabled = !track.enabled;
          setIsMuted(!isMuted);
        }
      });
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        if (track.kind === 'video') {
          track.enabled = !track.enabled;
          setIsVideoOff(!isVideoOff);
        }
      });
    }
  };

  const disconnectCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
    socket.emit('disconnect-call', { appointmentId, role });
  };

  useEffect(() => {
    if (!localStream) {
      getUserMedia();
    }
  }, [localStream]);

  return (
    <div className="video-call-room">
      <h1>{role === 'farmer' ? 'Farmer' : 'Expert'} Video Call</h1>
      <div className="video-container">
        <div className="video-box">
          <video
            className="local-video"
            autoPlay
            playsInline
            muted={isMuted}
            ref={(ref) => {
              if (ref && localStream) {
                ref.srcObject = localStream;
              }
            }}
          />
        </div>
        <div className="video-box">
          <video
            className="remote-video"
            autoPlay
            playsInline
            ref={(ref) => {
              if (ref && remoteStream) {
                ref.srcObject = remoteStream;
              }
            }}
          />
        </div>
      </div>
      <div className="controls">
        <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
        <button onClick={toggleVideo}>{isVideoOff ? 'Turn Video On' : 'Turn Video Off'}</button>
        <button onClick={disconnectCall}>Disconnect</button>
      </div>
    </div>
  );
};

export default VideoCallRoom;
