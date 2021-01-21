/**
 * Created by szg on 11/04/2017.
 */
import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {QuestionBase} from "../shared/question/question-base";
import {Utils} from "../shared/utils";
import {CHECKMAP} from "../shared/config";

@Injectable()
export class QuestionValidService {
  constructor() {
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};
    let needConfirm:boolean = false;
    // questions.forEach(question => {
    //   group[question.key] = question.required&&question.show ? new FormControl(question.value || '', Validators.required)
    //     : new FormControl(question.value || '');
    // });

    questions.forEach(question => {
      if (question["valideCheck"]&&question.show) {
        if(question["key"]=="confirmPassword"){
          needConfirm = true;
        }
        let result = Utils.paserArray(question["valideCheck"], CHECKMAP);
        group[question.key] = question.show ? new FormControl(question.value, Validators.compose(result)) : new FormControl(question.value || '');
      }
    });
    if(needConfirm){
      return new FormGroup(group,CHECKMAP["mismatchedPasswords"]);
    }else{
      return  new FormGroup(group);
    }
  }
}
