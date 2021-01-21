/**
 * Created by szg on 10/04/2017.
 */
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup }        from '@angular/forms';
import {QuestionBase} from "../../question/question-base";
import {CHECKERRORSHOWMAP} from "../../config";
import {ClassSetModel} from "../../../model/ClassSetModel";
import {Content} from "ionic-angular";

@Component({
  selector: 'df-question',
  templateUrl: 'dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit{
  @Input() question: QuestionBase<any>;
  @Input() submitAttempt:boolean;
  @Input() form: FormGroup;
  @Input() classSet : ClassSetModel;


 ngOnInit(){
 }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  errorMessage(check:string){
    return CHECKERRORSHOWMAP[check];
  }



}
