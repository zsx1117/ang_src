/**
 * Created by szg on 11/04/2017.
 */
import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges}  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import {QuestionValidService} from "../../../service/question-valide.service";
import {QuestionBase} from "../../question/question-base";
import {ClassSetModel} from "../../../model/ClassSetModel";
import {Observable} from "rxjs";



@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [ QuestionValidService ]
})
export class DynamicFormComponent implements OnInit {
  @ViewChild('list') list: ElementRef;
  @ViewChild('myForm') myForm;
  @Input() overHeight:boolean;
  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitAttempt:boolean = false;
  @Input() classSet:  ClassSetModel = new ClassSetModel("","","","","","","","","");
  @Output() submitForm = new EventEmitter<Object>();
  @Output() sendList = new EventEmitter<Object>();
  @Output() sendForm = new EventEmitter<Object>();
  styleButton:Object;
  stylePosition:Object;
  form: FormGroup;
  constructor(private qcs: QuestionValidService) {

  }

  ngOnInit() {
    this.sendList.emit(this.list);
    this.overHeight = true//todo:fix position
    //this.sendForm.emit(this.myForm);
    this.form = this.qcs.toFormGroup(this.questions);
    this.sendForm.emit(this.form);
    this.stylePosition = this.overHeight? {"margin-top": "5%","text-align": "center" } : {"position":"absolute","bottom":"20px","left": "0","right": "0","text-align": "center"};
  }


  ngOnChanges(changes:SimpleChanges ) {
    //
    // if(changes["overHeight"]&&Object.keys(changes).length==1){
    // this.stylePosition = changes["overHeight"].currentValue ? {"margin-top": "5%","text-align": "center" } : {"position":"absolute","bottom":"20px","left": "0","right": "0","text-align": "center"};
  // }
  }
  onSubmit() {
    this.submitAttempt = true;
    if(this.form.valid){
      console.log(this.form.value);
      this.submitForm.emit(this.form.value);
    }else{
      console.log("Invalid form");
    }
  }
}
