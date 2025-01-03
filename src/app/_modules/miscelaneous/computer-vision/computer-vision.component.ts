
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,Renderer2    } from '@angular/core';
import { NgxSignaturePadComponent } from '@eve-sama/ngx-signature-pad/lib/ngx-signature-pad.component';
import { NgxSignatureOptions      } from '@eve-sama/ngx-signature-pad/lib/types/ngx-signature-pad';
import { _languageName            } from 'src/app/_models/entityInfo.model';
import { ShapeDetectionService    } from 'src/app/_services/ShapeDetection/shape-detection.service';
declare var cv: any; // Declare cv as a global variable
@Component({
  selector: 'computer-vision',
  templateUrl: './computer-vision.component.html',
  styleUrl: './computer-vision.component.css'
})
export class ComputerVisionComponent implements AfterViewInit , OnInit {
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
  public status                : string = '';
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
  tituloListadOrigen      : string | null = "[ORIGEN CAPTURA]";
  titleEngineList         : string | null = "[ENGINES]";;
  hiddenCanvasContainer   : boolean = false;
  hiddenCameraContainer   : boolean = false;
  cameraContainerHidden   : boolean = false;  
  capturedImageHidden     : boolean = true;
  captureButtonDisabled   : boolean = false;
  saveImageButtonDisabled : boolean = true;
  selectedIndex           : number  = 0;
  selectedIndexEngines    : number  = 0;
  ////////////////////////////////////////////////////////////////
  detectedShapes: string[] = [];
  //
  constructor(public shapeDetectionService : ShapeDetectionService)
  {

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
  }
  /*
    //  
    loadOpenCv() {
      const script = document.createElement('script');
      script.src = 'assets/opencv.js'; // Path to your local opencv.js
      script.async = true;
      script.onload = () => {
        console.log('OpenCV.js loaded');
      };
      document.body.appendChild(script);
    }
  */

  ngAfterViewInit() {
    //-----------------------------------------------------------------------------
    this.__sourceList = new Array();
    this.__sourceList.push( new _languageName(0,"(SELECCIONE OPCION..)" ,false));        
    this.__sourceList.push( new _languageName(1,"(DESDE CANVAS)"        ,true));        
    this.__sourceList.push( new _languageName(2,"(DESDE CAMARA)"        ,false));        
    //-----------------------------------------------------------------------------
    this.__engineList = new Array();
    this.__engineList.push( new _languageName(0,"(SELECCIONE OPCION..)"                    ,false));        
    this.__engineList.push( new _languageName(1,"(CV / OPENCV - javascript)"               ,true));        
    //this.__engineList.push( new _languageName(2,"(COMPUTER VISION / OPENCV - javascript) "   ,false));        
    //this.__sourceList.push( new _languageName(2,"(COMPUTER VISION / TENSORFLOW)"  ,false));        
    //-----------------------------------------------------------------------------
  }
  //
  ngOnDestroy(): void {
    this.stopCamera();
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
    this.status = "";
    //
    console.log(`Selected Source : ${this.selectedIndex}`);
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
     console.log("Saving signature..., option : " + this.selectedIndexEngines);
     //
     this.selectionChangeEngines();
     //   
     switch (this.selectedIndexEngines)
     {
        case 1 : // CV  / OPENCV
              this.detectShapes(this.signature?.toDataURL() as string);
        break;      
        default:
          //
          this.status = "Favor seleccione la opción [ENGINE]";
          break;
     }
  }
  // Trigger a click event on the anchor
  clearSignature():void{
     //
     console.log("clearing signature...");
     // PNG
     this.signature?.clear();
     //
     this.status = "";
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

          console.log("width: " + canvas.width + " height: " + canvas.height);

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
       this.selectionChangeEngines();
       //   
       switch (this.selectedIndexEngines)
       {
          case 1 : // ocr / tesseract
              if (this.capturedImage) {
                //
                //this.uploadImage(this.capturedImage)
                this.detectShapes(this.capturedImage);
                //
                this.statusButton            = '[save]';
                this.statusButtonSaveImage   = '[save image]';
                this.captureButtonStatus     = '[start capture]';
                this.captureButtonDisabled   = false;
              }
          break;
          default : //
              this.status = "Favor seleccione la opción [ENGINE]";
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
    console.log('flippling camera');
    //
    this.isFrontCamera = !this.isFrontCamera;
    this.stopCamera();
    await this.startCamera();
  }
  ///////////////////////////////////////////////////////
  detectShapes(capturedImage : string): void {

    const img = new Image();
    img.onload = () => {
      console.log("loading  shape detection service ...")
      //
      const shapes        = this.shapeDetectionService.detectShapes(img);
      this.detectedShapes = shapes;
      //
      this.status     = this.detectedShapes.toString();
      //
      const utterance = new SpeechSynthesisUtterance(this.status);
      speechSynthesis.speak(utterance);

    };
    img.src = capturedImage;
  }




}


