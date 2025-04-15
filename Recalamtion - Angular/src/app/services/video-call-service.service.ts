import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoCallService {
  peer!: Peer;
  myStream!: MediaStream;
  socket!: WebSocket;
  myPeerId: string = ''; // ✅ Store assigned Peer ID

  constructor() {}

  /** ✅ Initialize PeerJS & Retrieve Peer ID */
  initPeer(userId?: string): Peer {
    // ✅ Pass userId only if it exists, otherwise don't pass anything
    this.peer = userId ? new Peer(userId, this.getPeerOptions()) : new Peer(this.getPeerOptions());

    // ✅ Listen for PeerJS Open Event (Retrieves Peer ID)
    this.peer.on('open', (id) => {
      console.log('My Peer ID:', id);
      this.myPeerId = id;
    });

    return this.peer;
  }

  /** ✅ Get PeerJS Options */
  private getPeerOptions() {
    return {
      host: 'localhost', // ✅ Backend is running locally
      port: 9000, // ✅ Matches backend port
      path: '/peerjs',
      secure: false,
    };
  }

  /** ✅ Get User Camera + Microphone */
  async getUserMedia(): Promise<MediaStream> {
    try {
      this.myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return this.myStream;
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      throw error;
    }
  }

  /** ✅ Connect to WebSocket Signaling Server */
  connectWebSocket(): void {
    this.socket = new WebSocket(environment.wsUrl);

    this.socket.onopen = () => {
      console.log('Connected to WebSocket signaling server');
    };

    this.socket.onmessage = (message) => {
      console.log('WebSocket Message Received:', message.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  /** ✅ Call Another User */
  callUser(peerId: string, stream: MediaStream) {
    if (!this.peer) {
      console.error('PeerJS instance not initialized');
      return;
    }
    const call = this.peer.call(peerId, stream);
    return call;
  }

  /** ✅ Handle Incoming Calls */
  handleIncomingCalls(setRemoteStream: (stream: MediaStream) => void) {
    this.peer.on('call', (call) => {
      if (this.myStream) {
        call.answer(this.myStream); // ✅ Answer with our stream
      }

      call.on('stream', (remoteStream) => {
        console.log('Received remote stream');
        setRemoteStream(remoteStream);
      });

      call.on('error', (err) => {
        console.error('Call error:', err);
      });
    });
  }

  /** ✅ Send WebRTC Signaling Message */
  sendSignal(signal: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(signal));
    }
  }
}
