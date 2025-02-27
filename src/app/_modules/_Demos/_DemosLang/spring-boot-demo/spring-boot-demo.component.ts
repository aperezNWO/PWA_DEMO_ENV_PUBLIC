import { Component,Injectable           } from '@angular/core';
import { BaseComponent } from 'src/app/_components/basecomponent';
import { ENV_LIST_SPRING_BOOT_DEMO } from 'src/app/_models/common/common';
import { AuthService } from 'src/app/_services/authService/auth.service';
import { BaseService } from 'src/app/_services/baseService/base.service';
import { ConfigService } from 'src/app/_services/ConfigService/config.service';

@Component({
  selector: 'app-spring-boot-demo',
  templateUrl: './spring-boot-demo.component.html',
  styleUrl: './spring-boot-demo.component.css'
})
export class SpringBootDemoComponent  extends BaseComponent {

 //
 constructor(public _service       : BaseService,
             public _authService   : AuthService,
             public _configService : ConfigService
)
  {
    //
    super(_service, _authService, _configService, ENV_LIST_SPRING_BOOT_DEMO);
  }
}
