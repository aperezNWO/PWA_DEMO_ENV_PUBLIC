import { Component, Injectable,         } from '@angular/core';
import { BaseComponent                  } from '../../../../_components/basecomponent';
import { ENV_LIST_CPP_DEMO              } from '../../../../_models/common/common';
import { AuthService                    } from 'src/app/_services/authService/auth.service';
import { BaseService                    } from 'src/app/_services/baseService/base.service';
import { ConfigService                  } from 'src/app/_services/ConfigService/config.service';
 
//
@Component({
  selector: 'app-cpp-demo',
  templateUrl: './cpp-demo.component.html',
  styleUrl: './cpp-demo.component.css'
})
export class CppDemoComponent extends BaseComponent {
    //
    constructor(public _service       : BaseService,
                public _authService   : AuthService,
				        public _configService : ConfigService
			         )
    {
		//
		super(_service, _authService, _configService, ENV_LIST_CPP_DEMO);
    }
}

