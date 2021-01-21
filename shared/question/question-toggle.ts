/**
 * Created by szg on 18/04/2017.
 */
import {QuestionBase} from "./question-base";

export class ToggleQuestion extends QuestionBase<string>{
  controlType="toggle";
  color:string;
  constructor(options: {} = {}) {
    super(options);
    this.color = options['color']? options['color']:'dark';
  }
}
