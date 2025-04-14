import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VideoCallService } from '../services/video-call-service.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('peerVideo') peerVideo!: ElementRef;
  peerId: string = '';
  myPeerId: string = ''; // ✅ Store My Peer ID
  myStream!: MediaStream;
  currentCall: any; // ✅ Store current call for screen sharing

  constructor(private videoCallService: VideoCallService) {}

  async ngOnInit() {
    // ✅ Initialize PeerJS & Get Assigned Peer ID
    const peer = this.videoCallService.initPeer();

    // ✅ Retrieve and display Peer ID after connection is established
    peer.on('open', (id) => {
      this.myPeerId = id;
      console.log('Generated Peer ID:', id);
    });

    // ✅ Connect WebSocket for signaling
    this.videoCallService.connectWebSocket();

    // ✅ Get user camera and mic
    this.myStream = await this.videoCallService.getUserMedia();
    this.myVideo.nativeElement.srcObject = this.myStream;

    // ✅ Handle Incoming Calls
    this.videoCallService.handleIncomingCalls((remoteStream) => {
      this.peerVideo.nativeElement.srcObject = remoteStream;
    });
  }

  /** ✅ Make a call to another Peer */
  callUser() {
    if (this.peerId) {
      const call = this.videoCallService.callUser(this.peerId, this.myStream);
      this.currentCall = call; // ✅ Store the call object

      call?.on('stream', (peerStream) => {
        this.peerVideo.nativeElement.srcObject = peerStream;
      });
    } else {
      alert('Please enter a Peer ID to call.');
    }
  }

  /** ✅ Share Screen with Peer */
  async shareScreen() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      // ✅ Update local video preview to screen share
      this.myVideo.nativeElement.srcObject = screenStream;

      // ✅ Ensure we have an active call
      if (this.currentCall) {
        const sender = this.currentCall.peerConnection
          .getSenders()
          .find((sender: RTCRtpSender) => sender.track && sender.track.kind === 'video');

        if (sender && screenStream.getVideoTracks().length > 0) {
          sender.replaceTrack(screenStream.getVideoTracks()[0]);
        }
      }

      // ✅ Handle stopping screen share (revert back to webcam)
      screenStream.getVideoTracks()[0].onended = async () => {
        this.myStream = await this.videoCallService.getUserMedia();
        this.myVideo.nativeElement.srcObject = this.myStream;

        if (this.currentCall) {
          const sender = this.currentCall.peerConnection
            .getSenders()
            .find((sender: RTCRtpSender) => sender.track && sender.track.kind === 'video');

          if (sender && this.myStream.getVideoTracks().length > 0) {
            sender.replaceTrack(this.myStream.getVideoTracks()[0]);
          }
        }
      };
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  }
}
