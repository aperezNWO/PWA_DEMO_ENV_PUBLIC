import { Component          } from '@angular/core';
import { FormBuilder        } from '@angular/forms';
import { ActivatedRoute     } from '@angular/router';
import { BackendService     } from 'src/app/_services/BackendService/backend.service';
import { CustomErrorHandler } from 'src/app/app.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  //
  public isListVisible            = false; // Initially hidden
  public toogleLisCaption: string = "[Ver Referencias]";
  //
  constructor(    public backendService       : BackendService, 
                  public formBuilder          : FormBuilder, 
                  public customErrorHandler   : CustomErrorHandler,
                  public route                : ActivatedRoute) 
  {
    
  }
  //
  toggleList() {
    this.isListVisible     = !this.isListVisible; // Toggle visibility
    this.toogleLisCaption  = !(this.isListVisible)? "[Ver Referencias]" : "[Ocultar Referencias]";
  }
}
