import { Component } from '@angular/core';

@Component({
  selector: 'app-demos-lang-web',
  templateUrl: './demos-lang-web.component.html',
  styleUrl: './demos-lang-web.component.css'
})
export class DemosLangWebComponent {
      //
      pages = [
        {
          'url': '/AngularDemo',
          'text': '[ANGULAR DEMO]',
        },
        {
          'url': '/CppDemo',
          'text': '[CPP DEMO]',
        },
        {
          'url': '/NetCoreDemo',
          'text': '[.NET CORE DEMO]',
        },
        {
          'url': '/NodeJsDemo',
          'text': '[NODE.JS DEMO]',
        },
        {
          'url': '/SpringBootDemo',
          'text': '[SPRING BOOT DEMO]',
        },
        {
          'url': '/DjangoDemo',
          'text': '[PYTHON / DJANGO]',
        }
      ]
}
