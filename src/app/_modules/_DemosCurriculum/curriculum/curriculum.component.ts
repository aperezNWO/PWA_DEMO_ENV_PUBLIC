/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {

}
*/

import { Component, Injectable } from "@angular/core";
import { BaseComponent } from "src/app/_components/basecomponent";
import { ENV_LIST_ANGULAR_EDU } from "src/app/_models/common/common";
import { AuthService } from "src/app/_services/authService/auth.service";
import { BaseService } from "src/app/_services/baseService/base.service";
import { ConfigService } from "src/app/_services/ConfigService/config.service";

//
@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent extends BaseComponent {
  //
  constructor(public _service: _BaseService,
    public _authService: AuthService,
    public _configService: ConfigService
  ) {
    //
    super(_service, _authService, _configService, ENV_LIST_ANGULAR_EDU);
  }
}

@Injectable({
  providedIn: 'root'
})
class _BaseService extends BaseService {

}
