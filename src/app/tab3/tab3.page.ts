import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  answer: number;
  expression = '';
  restEqual = false;

  constructor() {}

  addSymbol(symbol: string, symInsetion = false) {
    if (this.restEqual && !symInsetion) {
      this.expression = symbol;
    } else {
      this.expression += symbol;
    }
    this.restEqual = false;
  }

  evalExpression() {
    try {
      const resultado = Function(`return ` + this.expression)();
      this.answer = resultado;
      this.expression = resultado.toString();
    } catch (error) {
      this.answer = null;
      this.expression = 'Syntax error';
    }
    this.restEqual = true;
  }

  clearExpression() {
    if (this.expression === '' && !(this.answer === null)){
      this.answer = null;
    }
    this.expression = '';
  }

  deleteLastChar() {
    this.expression = this.expression.slice(0, -1);
  }
}
