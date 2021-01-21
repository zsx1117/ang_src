/**
 * Created by szg on 12/04/2017.
 */
import {Injectable} from "@angular/core";

import {MOCKFORMDATA, MOCKLOGINDATA} from "../mock/mock-form-data";
import {DropdownQuestion} from "../shared/question/question-dropdown";
import {QuestionBase} from "../shared/question/question-base";
import {CapchaQuestion} from "../shared/question/question-captcha";
import {DataTimeQuestion} from "../shared/question/question-datetime";
import {TextboxQuestion} from "../shared/question/question-textbox";
import {serverUrl} from "../shared/config";
import {HttpService}from "./httpservice"
import {ToggleQuestion} from "../shared/question/question-toggle";
@Injectable()
export class QuestionQuestService {

  constructor(public http: HttpService) {
    this.http = http;
  }



  solveData(data){
    //data = MOCKFORMDATA;
    //data = MOCKLOGINDATA;
    let questions:QuestionBase<any>[] = [];
    for(let i in data){
      switch (data[i]["controlType"]){
        case "dropdown":
          questions.push(new DropdownQuestion(data[i]));
          break;
        case "captcha":
          questions.push(new CapchaQuestion(data[i]));
          break;
        case "dataTime":
          questions.push(new DataTimeQuestion(data[i]));
          break;
        case "textbox":
          questions.push(new TextboxQuestion(data[i]));
          break;
        case "toggle":
          questions.push(new ToggleQuestion(data[i]));
          break;
        default:
          console.log(data[i]["controlType"]);
      }
    }
    return questions.sort((a, b) => a.order - b.order);
  }


  getFormData(form:string){
    return new Promise(resolve=>{
      this.http.get(serverUrl.url+"/getFormFields?form="+form).subscribe(
        (data)=>{
          console.log(JSON.parse(data["_body"]));
          resolve(JSON.parse(data["_body"])["fields"]);
        },err=>{resolve(err);}
      )
    });
  }


}
