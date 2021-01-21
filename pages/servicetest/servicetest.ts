/**
 * Created by szg on 14/04/2017.
 */

import {OnInit, Component, ViewChild} from "@angular/core";
import {HttpService} from "../../service/httpservice";
import {FormConfigService} from "../../service/form-config-service";
import {QuestionQuestService} from "../../service/question-request-service";
import {ProductService} from "../../service/product-service";
import {Observable} from "rxjs";
import {serverUrl} from "../../shared/config";
import {$localstorage} from "../../service/$localstorage";


@Component({
  selector:"test-page",
  templateUrl:"servicetest.html",
  providers:[FormConfigService,QuestionQuestService,ProductService]

})
export class serviceTest implements OnInit {
  @ViewChild('button') button;
  click$:Observable<any>;
  dbIndex=0;
  constructor(public http: HttpService,private formConfigService:FormConfigService,private questionQuestService:QuestionQuestService,private productService:ProductService,private $localstorage:$localstorage){
    this.http = http;
  }
  ngOnInit(){
    this.$localstorage.setObject("a",{"n":3});
    console.log(this.$localstorage.getObject("a"));
    // this.click$ = Observable.fromEvent(this.button.nativeElement,"click");
    // let result = this.click$.map(()=>1).switchMap(this.testHttpGet).map(this.createTodoItem).do((value)=>{
    //   console.log(value);
    // });
    // // let result = this.click$.map(()=>1).switchMap(this.mockHttp).map(this.createTodoItem).do((value)=>{
    // //   console.log(value);
    // // });
    // result.subscribe((value)=>{},error=>console.log(error));
  //  this.questionQuestService.getFormData("Signup").then((data)=>{
  //    console.log(data);
  //  }).catch(err=>console.log(err));

    // this.productService.getByPage(1,6).then(data=>{
    //   console.log(data);
    // }).catch(err=>console.log(err));
    //
    // this.productService.getProductAmount().then(data=>{
    //   console.log("number");
    //   console.log(data);
    // }).catch(err=>console.log(err));
    //
    // this.productService.getPartProducts().then(data =>{
    //   console.log(data);
    // }).catch(err=>console.log(err));
  }

  createTodoItem = (value,error)=>{
    console.log(value);
    console.log(error);
    return value;
  };

  mockHttp = () => {
    let value = "1";
    return Observable.create(observer => {
      let status = 'pending';
      const timmer = setTimeout(() => {
        const result = {
          _id: ++this.dbIndex, value,
          isDone: false
        };
        localStorage.setItem(""+result._id, result?"1":"0");
        status = 'done';
        observer.next(result);
        observer.complete();
      }, 800);
      return () => {
        clearTimeout(timmer);
        if (status === 'pending') {
          console.warn('post canceled')
        }
      }
    })
  }


  testHttpGet = ()=>{
    return Observable.create(observer=>{
      let status = 'pending';
      let request = this.http.get(serverUrl.url + '/products').subscribe(
        data => {
          console.log(JSON.parse(data["_body"]));
          status = 'done';
          observer.next(JSON.parse(data["_body"]));
          observer.complete();
        }, err => {
          status = 'error';
          console.log(err);
          observer.complete();
        });
        return ()=>{
          if(status=="pending"){
            request.unsubscribe();
            console.log("Cancel request");
          }
        }
    });
  }



}
