import { AfterViewInit, Component, ElementRef, OnInit, ViewChild    } from '@angular/core';
import { ActivatedRoute                                             } from '@angular/router';
import { BackendService                                             } from 'src/app/_services/BackendService/backend.service';
import { _languageName                                              } from 'src/app/_models/entity.model';
import { BaseReferenceComponent                                     } from 'src/app/_components/base-reference/base-reference.component';
import { SpeechService                                              } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                                              } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_MISCELANEOUS_OCR, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND } from 'src/app/_models/common';
import { OCRService                                                 } from 'src/app/_services/__AI/OCRService/ocr.service';
import { NgxSignaturePadComponent                                   } from '@eve-sama/ngx-signature-pad/lib/ngx-signature-pad.component';
import { NgxSignatureOptions                                        } from '@eve-sama/ngx-signature-pad/lib/types/ngx-signature-pad';

@Component({
  selector    : 'app-ocr-photo-capture',
  templateUrl : './ocr-photo-capture.component.html',
  styleUrl    : './ocr-photo-capture.component.css',
  providers   : [
    { 
      provide : PAGE_TITLE_LOG, 
      useValue: PAGE_MISCELANEOUS_OCR 
    },
  ]
})
export class OcrPhotoCaptureComponent extends BaseReferenceComponent implements AfterViewInit , OnInit {
  /** Catch object, call functions via instance object */
  @ViewChild('signature') signature: NgxSignaturePadComponent | undefined;
  /** You can see more introduction in the below about NgxSignatureOptions */
  public options: NgxSignatureOptions = {
    backgroundColor: '#F4F5F5',
    width : 100,
    height: 100,
    css: {
      'border-radius': '16px'
    }
  };
  //
  public statusButton          : string = '[save]';
  public statusButtonSaveImage : string = '[save image]';
  public captureButtonStatus   : string = '[capture image]';
  ///////////////////////////////////////////////////////////////
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  videoStyle                                         : string | null = "width: 150px;height:150px; transform : scaleX(1);"; 
  @ViewChild('canvas') canvas!                       : ElementRef<HTMLCanvasElement>;
  @ViewChild('_sourceList')    _sourceList           : any;
  __sourceList                                       : any;
  @ViewChild('_engineList')    _engineList           : any;
  __engineList                                       : any;
  //
  private videoStream                                : MediaStream | null = null;
  private isFrontCamera                              : boolean = true;
  //
  capturedImage           : string | null = null;
  tituloListadOrigen      : string | null = "[CAPTURE ORIGIN]";
  titleEngineList         : string | null = "[OCR ENGINES]";;
  hiddenCanvasContainer   : boolean = false;
  hiddenCameraContainer   : boolean = false;
  cameraContainerHidden   : boolean = false;  
  capturedImageHidden     : boolean = true;
  captureButtonDisabled   : boolean = false;
  saveImageButtonDisabled : boolean = true;
  selectedIndex           : number  = 1;
  selectedIndexEngines    : number  = 1;
  
  //
  constructor(public override configService  : ConfigService,
              public override backendService : BackendService,
              public override route          : ActivatedRoute,
              public override speechService  : SpeechService,
              public          ocrService     : OCRService,
  )
  {
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_TITLE_NO_SOUND)
  }
  //
  ngOnInit(): void {
    //-----------------------------------------------------------------------------
    this.hiddenCanvasContainer = false;
    this.hiddenCameraContainer = true;
    //
    this.startCamera();
    //
    this.queryParams();
  }
  //  
  ngAfterViewInit() {
      //
  }
  //
  ngOnDestroy(): void {
    this.stopCamera();
  }
  //
  queryParams():void{
    //
    this.route.queryParams.subscribe(params => {
    //-----------------------------------------------------------------------------
    this.__sourceList = new Array();
    this.__sourceList.push( new _languageName(0,"(CHOOSE OPTION...)"   ,false,""));        
    this.__sourceList.push( new _languageName(1,"(FROM CANVAS)"        ,true ,""));        
    this.__sourceList.push( new _languageName(2,"(FROM CAMERA)"        ,false,""));        
    //-----------------------------------------------------------------------------
    this.__engineList = new Array();
    this.__engineList.push( new _languageName(0,"(CHOOSE OPCION...)"                           ,false,  ""   ));        
    this.__engineList.push( new _languageName(1,"(TESSERACT / javascript)"                     ,true,   "JS" ));        
    this.__engineList.push( new _languageName(2,"(TESSERACT / C++) "                           ,false,  "CPP"));  
        //
        let langName = params['langName'] ? params['langName'] : "" ;
        //
        if (langName !== '')
        {   
            //
            for (var index = 1; index < this.__engineList.length; index++) {
                //
                if (this.__engineList[index]._shortName  == langName)
                  this.__engineList[index]._selected = true;        
            }

        } else {
          //
          this.__engineList[1]._selected = true; // C#
        }
    });
  }
  //
  selectionChange() {
    //
    this.selectedIndex           = this._sourceList.nativeElement.options.selectedIndex;
    //
    switch (this.selectedIndex) 
    {
        case 1 : 
          this.hiddenCanvasContainer = false;
          this.hiddenCameraContainer = true;
        break;
        case 2 :
          this.hiddenCanvasContainer = true;
          this.hiddenCameraContainer = false;         
        break;
    }
    //
    this.status_message.set("");
    //
  }
  selectionChangeEngines() {
    //
    this.selectedIndexEngines = this._engineList.nativeElement.options.selectedIndex;
  }
  /** The begin event of sign */
  onBeginSign(): void { }
 
  /** The end event of sign */
  onEndSign(): void { }
  //
  saveSignature():void {

     //
     if (this.selectedIndex == 0) {
            this.status_message.set("Please choose the option    [CAPTURE ORIGIN]");
            return;
     }

     //
     this.status_message.set("[...parsing...]");
     //
     let base64ImageString : string  = this.signature?.toDataURL()!;
     //
     this.selectionChangeEngines();
     //   
     switch (this.selectedIndexEngines)
     {
        case 1 :  //TESSERACT / JAVASCRIPT
          // data:image/png;base64,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
          // //console.log('Data URL:', base64ImageString);
          //
          this.uploadImageNodeJs(base64ImageString);
        break;    
        case 2 : // TESSERACT / C++
          this.uploadImageCPP(base64ImageString);
        break;      
        default:
          //
          this.status_message.set("Please choose the option [OCR ENGINE]");
        break;
     }
  }
  // Trigger a click event on the anchor
  clearSignature():void{
     //
     //console.log("clearing signature...");
     // PNG
     this.signature?.clear();
     //
     this.status_message.set("");
     //
     this.statusButton = "[save]";
  }
  //
  uploadImageNodeJs(base64ImageString : string):void {
    // Replace 'yourBase64ImageString' with the actual base64 image string
    //const base64ImageString = 'yourBase64ImageString';
    this.statusButton          = '[...parsing...]';
    this.statusButtonSaveImage = '[...parsing...]';

    this.capturedImageHidden     = false;
    this.captureButtonDisabled   = true;
    this.saveImageButtonDisabled = true;

    //
    this.ocrService.uploadBase64ImageNodeJs(base64ImageString).subscribe(
      (response) => {
        //
        //console.log('Image uploaded correctly:', response);
        this.status_message.set(JSON.parse(JSON.stringify(response))['message']);
        //
        this.statusButton            = '[save]';
        this.statusButtonSaveImage   = '[save image]';
        this.captureButtonStatus     = '[start capture]';
        this.captureButtonDisabled   = false;
        this.saveImageButtonDisabled = true;
      },
      (error) => {
        //
        console.error('Error uploading image:', error);
        //
        this.status_message.set(error);
        //
        this.statusButton = '[save]';
      }
    );
  }
  //
  uploadImageCPP(base64ImageString : string):void {
    // Replace 'yourBase64ImageString' with the actual base64 image string
    //const base64ImageString = 'yourBase64ImageString';
    this.statusButton          = '[...parsing...]';
    this.statusButtonSaveImage = '[...parsing...]';
    //
    this.capturedImageHidden     = false;
    this.captureButtonDisabled   = true;
    this.saveImageButtonDisabled = true;

    //
    this.ocrService.uploadBase64ImageCPP(base64ImageString).subscribe(
      (response) => {
        //
        //console.log('Image uploaded correctly:', response);
        this.status_message.set(JSON.parse(JSON.stringify(response))['message']);
        //
        this.statusButton            = '[save]';
        this.statusButtonSaveImage   = '[save image]';
        this.captureButtonStatus     = '[start capture]';
        this.captureButtonDisabled   = false;
        this.saveImageButtonDisabled = true;
      },
      (error: string) => {
        //
        console.error('Error uploading image:', error);
        //
        this.status_message.set(error);
        //
        this.statusButton = '[save]';
      }
    );
  }
  ////////////////////////////////////////////////////
  //
  async startCamera(): Promise<void> {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: this.isFrontCamera ? 'user' : 'environment' },
      });
      if (this.videoStream) {
        this.videoElement.nativeElement.srcObject = this.videoStream;
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }
  //
  stopCamera(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.videoStream = null;
    }
  }
  //
  capturePhoto() {
    if (this.captureButtonStatus == '[capture image]')
    {
        //
        this.cameraContainerHidden   = true;
        this.capturedImageHidden     = false;
        this.captureButtonDisabled   = true;
        this.saveImageButtonDisabled = false;
        //
        const video   = this.videoElement.nativeElement;
        const canvas  = this.canvas.nativeElement;
        const context = canvas.getContext('2d');
        //
        if (context) {

          canvas.width  = video.videoWidth / 4;
          canvas.height = video.videoHeight / 4;

          //console.log("width: " + canvas.width + " height: " + canvas.height);

          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          this.capturedImage = canvas.toDataURL('image/png');
        }
    } else 
    {
      this.cameraContainerHidden   = false;
      this.capturedImageHidden     = true;
      this.captureButtonStatus     = '[capture image]';
    }
  }
  //
  saveImage() {
       //
       if (this.selectedIndex == 0) {
                this.status_message.set("Please choose the option [CAPTURE ORIGIN]");
                return;
       }
       //
       this.status_message.set("[..parsing...]");
       //
       this.selectionChangeEngines();
       //   
       switch (this.selectedIndexEngines)
       {
          case 1 : // tesseract / javascript
              if (this.capturedImage) {
                //
                this.uploadImageNodeJs(this.capturedImage)
              }
          break;
          case 2 : // tesseract / C++
              if (this.capturedImage) {
                //
                this.uploadImageCPP(this.capturedImage)
              }        
          break;
          default : //
              this.status_message.set("Pleae choose the option [OCR ENGINE]");
          break;
       }
  }
  //
  dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const byteArray  = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
  }
  //
  async flipCamera() : Promise<void> {
    //
    //console.log('flippling camera');
    //
    this.isFrontCamera = !this.isFrontCamera;
    this.stopCamera();
    await this.startCamera();
  }
}
