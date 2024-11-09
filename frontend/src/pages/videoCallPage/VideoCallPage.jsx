// VideoCallRoom.jsx

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

  // Set up socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    // Join the call when component mounts
    newSocket.emit('join-call', { appointmentId, role });

    // Listen for incoming video call signals
    newSocket.on('join-call', handleJoinCall);

    return () => newSocket.disconnect();
  }, [appointmentId, role]);

  // Request media stream (camera, microphone)
  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  // Handle the join call event
  const handleJoinCall = (data) => {
    if (data.role !== role) return;

    // Set up the peer connection
    const pc = new RTCPeerConnection();

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          to: data.role === 'farmer' ? 'expert' : 'farmer',
          candidate: event.candidate,
          appointmentId
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

    // Send an offer if the current user is the "farmer"
    if (role === 'farmer') {
      makeOffer(pc);
    }
  };

  // Create an offer for the peer connection
  const makeOffer = async (pc) => {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit('video-call-offer', {
      offer,
      appointmentId,
      role: 'expert'
    });
  };

  // Mute/unmute audio
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

  // Turn video off/on
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

  // Disconnect the call
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
            muted
            autoPlay
            playsInline
            ref={(ref) => ref && (ref.srcObject = localStream)}
          />
          <video
            className="remote-video"
            autoPlay
            playsInline
            ref={(ref) => ref && (ref.srcObject = remoteStream)}
          />
        </div>
        <div className="controls">
          <button onClick={toggleMute} className="control-button">
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button onClick={toggleVideo} className="control-button">
            {isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
          </button>
          <button onClick={disconnectCall} className="control-button disconnect">
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallRoom;
