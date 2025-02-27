import { Component, Injectable                                    } from '@angular/core';
import { BaseComponent } from 'src/app/_components/basecomponent';
import { ENV_LIST_NETCORE_DEMO } from 'src/app/_models/common/common';
import { AuthService } from 'src/app/_services/authService/auth.service';
import { BaseService } from 'src/app/_services/baseService/base.service';
import { ConfigService } from 'src/app/_services/ConfigService/config.service';

@Component({
  selector: 'app-netcoredemo',
  templateUrl: './netcoredemo.component.html',
  styleUrl: './netcoredemo.component.css'
})
export class NetcoredemoComponent extends BaseComponent {
    //
    constructor(public _service       : BaseService,
                public _authService   : AuthService,
                public _configService : ConfigService)
    {
        //
        super(_service,_authService,_configService, ENV_LIST_NETCORE_DEMO)
    }
}

