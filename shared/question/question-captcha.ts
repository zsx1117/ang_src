/**
 * Created by szg on 12/04/2017.
 */
import {QuestionBase} from "./question-base";

export class CapchaQuestion extends QuestionBase<string>{
  controlType="captcha";

  constructor(options: {} = {}) {
    super(options);
  }
}
