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
          'url': '/Features',
          'text': '[ANGULAR DEMO]',
        },
        {
          'url': '/',
          'text': '[CPP DEMO]',
        },
        {
          'url': '/',
          'text': '[NODE.JS DEMO]',
        },
        {
          'url': '/',
          'text': '[.NET CORE DEMO]',
        },
        {
          'url': '/',
          'text': '[SPRING BOOT DEMO]',
        },
        {
          'url': '/',
          'text': '[PYTHON / DJANGO]',
        }
      ]
}
