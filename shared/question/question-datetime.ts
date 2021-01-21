/**
 * Created by szg on 11/04/2017.
 */
import {QuestionBase} from "./question-base";
export class DataTimeQuestion extends QuestionBase<string> {
  controlType = "dataTime";
  displayFormat:string;
  max:string;


  constructor(options: {} = {}) {
    super(options);
    this.value = options["value"]?new Date(options["value"]).toISOString():null;
    this.max = options['max'] || new Date().toISOString();
    this.displayFormat = options['displayFormat'] || "MMM DD YYYY";
  }


}
