import { Component, Injectable } from "@angular/core";
import { BaseComponent } from "src/app/_components/basecomponent";
import { ENV_LIST_ANGULAR_DEMO } from "src/app/_models/common/common";
import { AuthService } from "src/app/_services/authService/auth.service";
import { BaseService } from "src/app/_services/baseService/base.service";
import { ConfigService } from "src/app/_services/ConfigService/config.service";


//
@Component({
  selector: 'app-feature-pages',
  templateUrl: './feature-pages.component.html',
  styleUrl: './feature-pages.component.css'
})
export class FeaturePagesComponent  extends BaseComponent {
  //
  constructor(public _service: _BaseService,
    public _authService: AuthService,
    public _configService: ConfigService
  ) {
    //
    super(_service, _authService, _configService, ENV_LIST_ANGULAR_DEMO);
  }
}

@Injectable({
  providedIn: 'root'
})
class _BaseService extends BaseService {

}

