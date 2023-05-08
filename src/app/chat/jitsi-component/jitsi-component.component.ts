import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import * as CryptoJS from 'crypto-js';

declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-jitsi-component',
  templateUrl: './jitsi-component.component.html',
  styleUrls: ['./jitsi-component.component.css']
})
export class JitsiComponentComponent implements OnInit, AfterViewInit{
  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = true;

  constructor(
      private router: Router,private route: ActivatedRoute
      ) { }

  ngOnInit(): void {
    
    // Set your room name
      
      this.route.paramMap.subscribe(params => {
        this.room = hash(params.get('id'), params.get('recipient'));
        //this.isVideoMuted = params.get('video');
        this.user = {
            name: params.get('id') // Set your username
            
        }
 });

  }

  ngAfterViewInit(): void {
      this.options = {
          roomName: this.room,
          width: 900,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

       // Event handlers
      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
  }


  handleClose = () => {
    console.log("handleClose");
}

handleParticipantLeft = async (participant:any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
}

handleParticipantJoined = async (participant:any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant:any) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['/chat/displaychat']);
}

handleMuteStatus = (audio:any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video:any) => {
    console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); // get all participants
        }, 500)
    });
}

executeCommand(command: string) {
  this.api.executeCommand(command);;
  if(command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
}


}


/*
function generateRandomString(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (i < 2) {
        result += '-';
      }
    }
    return result;
  } //generate room name 

*/
 
  function hash(sender: any, recipient: any): string {
    // Concaténer l'expéditeur et le destinataire avec un séparateur "-"
    const sortedNames = [sender, recipient].sort();
    const str:any = sortedNames;
    // Calculer le hachage SHA-256 de la chaîne concaténée
    const hash = CryptoJS.SHA256(str);
    // Renvoyer le hachage sous forme de chaîne de caractères hexadécimale
    return hash.toString();
  }

  