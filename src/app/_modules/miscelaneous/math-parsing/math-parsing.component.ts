import { Component } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-math-parsing',
  templateUrl: './math-parsing.component.html',
  styleUrl: './math-parsing.component.css'
})
export class MathParsingComponent {
  expression: string = '(x + y)';
  variables: string = '{"x": 3, "y": 4}';
  result: string | null = null;
  error: boolean = false;

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
      this.result = typeof result === 'number' ? 
        math.format(result, { precision: 14 }) : 
        result.toString();
      
      this.error = false;
    } catch (err: any) {
      this.result = `Error: ${err.message}`;
      this.error = true;
    }
  }

  clear() {
    this.expression = '';
    this.variables = '';
    this.result = null;
    this.error = false;
  }

  tryExample(example: { expression: string, variables: string }) {
    this.expression = example.expression;
    this.variables = example.variables;
    this.evaluate();
  }
}

