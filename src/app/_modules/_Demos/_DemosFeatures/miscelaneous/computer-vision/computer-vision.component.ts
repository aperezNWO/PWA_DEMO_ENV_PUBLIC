
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,    } from '@angular/core';
import { ActivatedRoute                                              } from '@angular/router';
import { _languageName                                               } from 'src/app/_models/entity.model';
import { BackendService                                              } from 'src/app/_services/BackendService/backend.service';
import { ComputerVisionService                                       } from 'src/app/_services/__AI/ComputerVisionService/Computer-Vision.service';
import { SpeechService                                               } from 'src/app/_services/__Utils/SpeechService/speech.service';
import { ConfigService                                               } from 'src/app/_services/__Utils/ConfigService/config.service';
import { PAGE_MISELANEOUS_COMPUTER_VISION, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND            } from 'src/app/_models/common';
import { NgxSignaturePadComponent                                                         } from '@eve-sama/ngx-signature-pad/lib/ngx-signature-pad.component';
import { NgxSignatureOptions                                                              } from '@eve-sama/ngx-signature-pad/lib/types/ngx-signature-pad';
import { BaseReferenceComponent                                                           } from 'src/app/_components/base-reference/base-reference.component';

//
declare var cv: any; // Declare cv as a global variable

//
@Component({   
  selector     : 'computer-vision',
  templateUrl  : './computer-vision.component.html',
  styleUrl     : './computer-vision.component.css',
  providers    : [
    { 
      provide  : PAGE_TITLE_LOG, 
      useValue : PAGE_MISELANEOUS_COMPUTER_VISION 
    },
  ]
})
export class ComputerVisionComponent extends BaseReferenceComponent implements AfterViewInit , OnInit {
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
  titleEngineList         : string | null = "[ENGINES]";;
  hiddenCanvasContainer   : boolean = false;
  hiddenCameraContainer   : boolean = false;
  cameraContainerHidden   : boolean = false;  
  capturedImageHidden     : boolean = true;
  captureButtonDisabled   : boolean = false;
  saveImageButtonDisabled : boolean = true;
  selectedIndex           : number  = 1;
  selectedIndexEngines    : number  = 1;
  ////////////////////////////////////////////////////////////////
  detectedShapes          : string[] = [];
  //
  constructor(public          computervisionService   : ComputerVisionService,
              public override configService           : ConfigService,
              public override backendService          : BackendService,
              public override route                   : ActivatedRoute,
              public override speechService           : SpeechService,
  )
  {
      //
      super(configService,
            backendService,
            route,
            speechService,
            PAGE_TITLE_NO_SOUND);
  }
  //
  ngOnInit(): void {

    //
    ///this.loadOpenCv();
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
  //
  queryParams():void{
    //
    this.route.queryParams.subscribe(params => {
    //-----------------------------------------------------------------------------
    this.__sourceList = new Array();
    this.__sourceList.push( new _languageName(0,"(SELECT OPTION ...)"      ,false ,""));        
    this.__sourceList.push( new _languageName(1,"(FROM  CANVAS)"           ,true  ,""));        
    this.__sourceList.push( new _languageName(2,"(FROM  CAMERA)"           ,false ,""));        
    //-----------------------------------------------------------------------------
    this.__engineList = new Array();
    this.__engineList.push( new _languageName(0,"(SELECT OPTION ...)"      , false , ""    ));        
    this.__engineList.push( new _languageName(1,"(OPENCV / javascript)"    , true  , "JS"  ));        
    this.__engineList.push( new _languageName(2,"(OPENCV / C++)"           , false , "CPP" ));        
    //-----------------------------------------------------------------------------
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
  }
  selectionChangeEngines() {
    //
    this.selectedIndexEngines = this._engineList.nativeElement.options.selectedIndex;
    //
    console.log("selected index " + this.selectedIndexEngines);
  }
  /** The begin event of sign */
  onBeginSign(): void { }
 
  /** The end event of sign */
  onEndSign(): void { }
  //
  saveSignature():void {
     //
     if (this.selectedIndex == 0)
     {
        //
        this.status_message.set("Please select the option [CAPTURE ORIGIN]");
        //
        return;
     }
     //
     this.status_message.set("[..parsing...]");
     //
     this.selectionChangeEngines();
     //   
     switch (this.selectedIndexEngines)
     {
        case 1 : //opencv / javascrpt
            this.OpenCv_js_DetectShapes(this.signature?.toDataURL() as string);
        break;      
        case 2 : // opencv / c++
            //
            this.OpenCv_CPP_DetectShapes(this.signature?.toDataURL() as string);
         break;
        default:
          //
          this.status_message.set("Please select the option [ENGINE]");
          break;
     }
  }
  // Trigger a click event on the anchor
  clearSignature():void{
     // PNG
     this.signature?.clear();
     //
     this.status_message.set("") ;
     //
     this.statusButton = "[save]";
  }
  ////////////////////////////////////////////////////
  
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
       this.status_message.set("[..parsing...]") ;    
       //
       this.selectionChangeEngines();
       //   
       switch (this.selectedIndexEngines)
       {
          case 1 : // OPENCV / JAVASCRIPT
              if (this.capturedImage) {
                  //
                  this.OpenCv_js_DetectShapes(this.capturedImage);
                  //
                  this.statusButton            = '[save]';
                  this.statusButtonSaveImage   = '[save image]';
                  this.captureButtonStatus     = '[start capture]';
                  this.captureButtonDisabled   = false;
              }
          break;
          case 2 : // OPENCV / C++
              //
              if (this.capturedImage)
              {
                  //
                  this.computervisionService._OpenCv_CPP_uploadBase64Image(this.capturedImage).subscribe(
                    (response) => {
                      //
                      this.status_message.set(JSON.parse(JSON.stringify(response))['message']);
                      //
                      this.statusButton            = '[save]';
                      this.statusButtonSaveImage   = '[save image]';
                      this.captureButtonStatus     = '[start capture]';
                      this.captureButtonDisabled   = false;
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
          break;
          default : //
              this.status_message.set("Please select the option [ENGINE]") ;
          break;
       }
  }
  //
  dataURLToBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
  }
  //
  async flipCamera() : Promise<void> {
    //
    this.isFrontCamera = !this.isFrontCamera;
    this.stopCamera();
    await this.startCamera();
  }
  ///////////////////////////////////////////////////////
  OpenCv_js_DetectShapes(capturedImage : string): void {
    //
    const img  = new Image();
    img.onload = () => {
      //
      const shapes        = this.computervisionService._OpenCv_js_detectShapes(img);
      this.detectedShapes = shapes;
      //
      this.status_message.set("Detected Shapes : " + this.detectedShapes.toString()) ;
    };
    img.src = capturedImage;
  }
  //
  OpenCv_CPP_DetectShapes(arg0: string) {
    //
    this.computervisionService._OpenCv_CPP_uploadBase64Image(this.signature?.toDataURL() as string).subscribe(
              (response) => {
                //
                this.status_message.set(JSON.parse(JSON.stringify(response))['message']);
                //
                this.statusButton            = '[save]';
                this.statusButtonSaveImage   = '[save image]';
                this.captureButtonStatus     = '[start capture]';
                this.captureButtonDisabled   = false;
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
}


