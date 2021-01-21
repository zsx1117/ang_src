/**
 * Created by szg on 13/04/2017.
 */
export class ClassSetModel{

  dropdownClass:string;
  dataTimeClass:string;
  textboxClass:string;
  captchaClass:string;
  submitPosition:string;
  submitClass:string;
  listClass:string;
  listPositionClass:string;
  inputLabelClass:string;


  constructor(dropdownClass: string, dataTimeClass: string, textboxClass: string, captchaClass: string, submitPosition: string, submitClass: string, listClass: string, listPositionClass:string,inputLabelClass:string) {
    this.dropdownClass = dropdownClass;
    this.dataTimeClass = dataTimeClass;
    this.textboxClass = textboxClass;
    this.captchaClass = captchaClass;
    this.submitPosition = submitPosition;
    this.submitClass = submitClass;
    this.listClass = listClass;
    this.listPositionClass = listPositionClass;
    this.inputLabelClass = inputLabelClass;
  }
}
