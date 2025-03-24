import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  recognition         : any;
  isListening         : boolean   = false;
  transcript          : string    = '';
  error               : string    = '';
  constructor() { 

        // Initialize the SpeechRecognition object
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          this.recognition = new SpeechRecognition();
          this.recognition.lang = 'es-CO'; // Set language
          this.recognition.interimResults = false; // Only final results
          this.recognition.maxAlternatives = 1;
    
          // Event handlers
          this.recognition.onresult = (event: any) => {
            //
            this.transcript = event.results[0][0].transcript;
            //console.log('Transcript:', this.transcript);
          };
    
          this.recognition.onerror = (event: any) => {
            this.error = event.error;
            this.isListening = false;
            console.error('Error:', this.error);
          };
          //
          this.recognition.onend = () => {
            //
          };
        } else {
          console.info('Speech Recognition API is not supported in your browser.');
        }
  }

  //
  startListening() {
    //
    if (this.recognition) {
      //console.log('listening started');
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition) {
      //console.log('listening ended');
      //
      this.isListening = false;
      this.recognition.stop()
    }
  }
  //
  speakText():string {
    if (this.transcript) {
      //
      const utterance = new SpeechSynthesisUtterance(this.transcript);
      utterance.lang = 'es-CO';
      window.speechSynthesis.speak(utterance);
      //
    } else {
      alert('No text to speak!');
    }
    return this.transcript;
  }
  //
  speakTextCustom(_transcript:string, lang : string = '') {
      //
      setTimeout(() => {
        //
        //console.log("speaking text : " + _transcript);
        //
        const utterance = new SpeechSynthesisUtterance(_transcript);
        utterance.lang  = (lang=='')?  'es-CO' : lang;
        speechSynthesis.speak(utterance);
      }, 1000); // Delay by 1 second     
  }
}
