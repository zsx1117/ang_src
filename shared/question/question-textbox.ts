

import {QuestionBase} from "./question-base";
export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;
  maxlength:number;
  minlength:number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.maxlength = options['maxlength'] || null;
    this.minlength = options['minlength'] || null;
  }
}
