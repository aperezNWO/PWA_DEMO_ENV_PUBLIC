import { Component                                      } from '@angular/core';
import { ActivatedRoute                                 } from '@angular/router';
import { PAGE_MISCELANEOUS_MATH_PARSING, PAGE_TITLE_LOG, PAGE_TITLE_NO_SOUND } from 'src/app/_models/common';
import { BackendService                                 } from 'src/app/_services/BackendService/backend.service';
import { ConfigService                                  } from 'src/app/_services/__Utils/ConfigService/config.service';
import { SpeechService                                  } from 'src/app/_services/__Utils/SpeechService/speech.service';
import * as math                                          from 'mathjs';
import { BaseReferenceComponent                         } from 'src/app/_components/base-reference/base-reference.component';

@Component({
  selector: 'app-math-parsing',
  templateUrl: './math-parsing.component.html',
  styleUrl: './math-parsing.component.css',
  providers   : [
    { 
      provide : PAGE_TITLE_LOG, 
      useValue: PAGE_MISCELANEOUS_MATH_PARSING 
    },
  ]
})
export class MathParsingComponent extends BaseReferenceComponent {
  ///////////////////////////////////////////////////////////////
  //  PROPIEDADES
  ///////////////////////////////////////////////////////////////
  expression: string = '(x + y)';
  variables : string = '{"x": 3, "y": 4}';
  error     : boolean = false;

  examples = [
    {
      expression: '2 * sin(45 deg) + sqrt(16)',
      variables: ''
    },
    {
      expression: 'x^2 + y^2',
      variables: '{"x": 3, "y": 4}'
    },
    {
      expression: 'derivative("x^2 + 2x", "x")',
      variables: ''
    },
    {
      expression: 'log(10) + ln(e)',
      variables: ''
    },
    {
      expression: 'round(2.7) + ceil(3.2)',
      variables: ''
    }
  ];
  ///////////////////////////////////////////////////////////////
  //  EVENT HANDLERS
  ///////////////////////////////////////////////////////////////
  //
  constructor(public override configService           : ConfigService,
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
  ///////////////////////////////////////////////////////////////
  //  METODOS COMUNES
  ///////////////////////////////////////////////////////////////
  
  evaluate() {
    try {
      let scope = {};
      
      // Parse variables if provided
      if (this.variables) {
        try {
          scope = JSON.parse(this.variables);
        } catch (e) {
          throw new Error('Invalid variables format. Use valid JSON.');
        }
      }

      // Evaluate the expression
      const result = math.evaluate(this.expression, scope);
      
      // Format the result
      this.status_message.set( (typeof result === 'number') ? 
        math.format(result, { precision: 14 }) : 
        result
      );
      
      this.error = false;
    } catch (err: any) {
      this.status_message.set( `Error: ${err.message}`);
      this.error = true;
    }
  }

  clear() {
    this.expression = '';
    this.variables = '';
    this.status_message.set('');
    this.error = false;
  }

  tryExample(example: { expression: string, variables: string }) {
    this.expression = example.expression;
    this.variables = example.variables;
    this.evaluate();
  }
  ///////////////////////////////////////////////////////////////
}

