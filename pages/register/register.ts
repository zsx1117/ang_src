/**
 * Created by szg on 13/04/2017.
 */
import {Component, OnInit, ViewChild, ElementRef, SimpleChanges} from '@angular/core';
import {NavController, Loading, AlertController, LoadingController, NavParams, Content} from 'ionic-angular';


import {FacebookService} from "../../service/facebook-service";
import {GoogleLoginService} from "../../service/googleLogin-service";
import {QuestionQuestService} from "../../service/question-request-service";
import {ClassSetModel} from "../../model/ClassSetModel";
import {UserInfo} from "../../model/UserInfo";
import {Utils} from "../../shared/utils";
import {HttpService} from "../../service/httpservice";
import {AuthService} from "../../service/auth-service";
import {waitMailPage} from "../waitmail/waitmail";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {MainPage} from "../main/main";
import {DEFAULT_BACKGROUND_IMAGE, CodeFormMap} from "../../shared/config";
import {TwitterService} from "../../service/twitter-service";
import {ShareVariableService} from "../../service/share-variable-service";
import {Observable} from "rxjs";
import {MOCKFORMDATA} from "../../mock/mock-form-data";

@Component({
  selector: 'register-page',
  templateUrl: 'register.html',
  providers:[FacebookService,GoogleLoginService,QuestionQuestService,TwitterService]
})

export class register implements OnInit {

  @ViewChild(Content) content: Content;
  contentClass:string="register";
  questions: any[];
  overHeight:boolean=true;
  classSet:ClassSetModel;
  loading: Loading;
  userInfo:UserInfo;
  token:string;
  showLoad:any;
  disLoad:any;
  defaultBackground:string = DEFAULT_BACKGROUND_IMAGE;
  backgroundImg = "";
  accessToken:string;
  secret:string;
  listForHeight:any;
  formInstance:any


  constructor(public http: HttpService,private shareVariableService:ShareVariableService,private authService: AuthService,private googleLoginService:GoogleLoginService,private facebookService: FacebookService, public navCtrl: NavController, private alertCtrl: AlertController,private loadingCtrl: LoadingController,public navParams:NavParams,private questionQuestService:QuestionQuestService,private twitterService:TwitterService) {
    this.questions = questionQuestService.solveData(MOCKFORMDATA);
    //this.questions = questionQuestService.solveData(this.shareVariableService.getQuestionArray()[CodeFormMap["register"]]);
    this.classSet = new ClassSetModel("register-dropBox","register-dateBox","","register-captcha","register-submit-position","register-buttom","register-list","","");
  }

  setList(list:Object){
    this.listForHeight = list;
  }
  setForm(form:Object){
    this.formInstance = form;
  }


  ngOnInit() {

    if (this.navParams.data.hasOwnProperty("userInfo")) {
      this.userInfo = Utils.clone(this.navParams.data["userInfo"]);
      if(this.navParams.data["token"]){
        this.token = this.navParams.data["token"];
      }else{
        this.accessToken = this.navParams.data["accessToken"];
        this.secret = this.navParams.data["secret"];
      }


      for (let i in this.questions){
        this.questions[i]["value"] = this.userInfo[this.questions[i]["key"]];
        if (this.questions[i]["type"] == "password"){
          this.questions[i]["show"] = false;
        }
      }
    } else {
      this.userInfo = new UserInfo(null, null);
    }
  }

  ionViewWillLeave(){
    if(this.loading) {
      this.loading.dismiss().catch(err=>console.log(err));
    }
    this.showLoad.unsubscribe();
    this.disLoad.unsubscribe();
  }

  ionViewWillEnter(){
    // this.formInstance.valueChanges.subscribe((values)=>{
    //   console.log(values);
    //   console.log(this.formInstance.controls);
    // });

    let contentHeight = this.content.contentHeight;
    let formHeight = this.listForHeight.nativeElement.offsetHeight;
    this.overHeight = formHeight+100>=contentHeight;
    if(this.overHeight){
      this.contentClass = "register";
    }else{
      this.contentClass = "register no-scroll";
    }
  }




  ionViewDidEnter(){

    let contentHeight = this.content.contentHeight;
    let formHeight = this.listForHeight.nativeElement.offsetHeight;
    this.overHeight = formHeight+100>=contentHeight;
    if(this.overHeight){
      this.contentClass = "register";
    }else{
      this.contentClass = "register no-scroll";
    }


    this.showLoad=this.http.loadPushObservable.subscribe((data)=>{
      if(data){
        this.showLoading();
      }
    });
    this.disLoad=this.http.dismissObservable.subscribe((data)=>{
      if(data&&this.loading){
        this.loading.dismiss();
      }
    });
  }

  errorMessageAlert(message:string){
    let alert = this.alertCtrl.create({
      title: 'Register failed',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    console.log("Show loading");
  }

  dataOperation(data:any){
    if (data["status"] === 404) {
      this.errorMessageAlert("404");
    } else  if(data["_body"]&&JSON.parse(data["_body"])["message"]){
      this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
      console.log(data["message"]);
    } else {
      let userInfo = Utils.clone(this.userInfo);
      for (let i in userInfo) {
        if (userInfo.hasOwnProperty(i)) {
          if (data["user"][i]) {
            userInfo[i] = data["user"][i];
          }
        } else {
          console.log(i);
        }
      }
      userInfo["isConnect"] = 1;
      this.authService.addOrUpdateUser(userInfo);
      this.authService.saveToken(data["token"]);
      let token = localStorage.getItem("token");
      this.navCtrl.setRoot(MainPage, userInfo);
    }
  }

  //
  // submitRegistration(): void {
  //   if (this.registrationForm.valid) {
  //     if(this.token){
  //       if(this.navParams.data["chose"]=="g"){
  //         this.googleLoginService.checkGoogle(this.userInfo,this.token).then(
  //           (data)=>{
  //             this.dataOperation(data);
  //           }
  //         ).catch(errorHandler);
  //       }else{
  //         this.facebookService.checkFb(this.userInfo, this.token).then(
  //           (data)=>{
  //             this.dataOperation(data);
  //           }
  //         ).catch(errorHandler);
  //       }
  //     }else{
  //       this.authService.registerAuthenticate(this.userInfo).then(
  //         (data) => {
  //           if(data["status"]===404){
  //             this.errorMessageAlert("404");
  //           }else
  //           if(data["_body"]&&JSON.parse(data["_body"])["message"]){
  //             this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
  //             console.log(data["message"]);
  //           }else{
  //             console.log(data);
  //             let userInfo = Utils.clone(this.userInfo);//todo:set userInfo
  //             for (let i in userInfo) {
  //               if (userInfo.hasOwnProperty(i)) {
  //                 if(data["user"][i]){
  //                   userInfo[i] = data["user"][i];
  //                 }
  //               } else {
  //                 console.log(i);
  //               }
  //             }
  //             this.authService.addOrUpdateUser(userInfo);
  //             this.navCtrl.push(waitMailPage,userInfo);
  //           }
  //         }
  //       ).catch((err) => {
  //         console.error(err)
  //       });
  //     }
  //   }
  //   else {
  //     console.log("failed");
  //   }
  // }



  submitForm(formInfo:Object){
    for(let i in formInfo){
      this.userInfo[i] = formInfo[i];
    }
    delete this.userInfo["password"];
    delete this.userInfo["confirmPassword"];
    delete this.userInfo["captcha"];

    if(this.token||this.accessToken){
      switch (this.navParams.data["chose"]){
        case "Google":
          this.googleLoginService.checkGoogle(this.userInfo,this.token).then(
            (data)=>{
              this.dataOperation(data);
            }
          ).catch(errorHandler);
          break;
        case "Facebook":
          this.facebookService.checkFb(this.userInfo, this.token).then(
            (data)=>{
              this.dataOperation(data);
            }
          ).catch(errorHandler);
          break;
        case "Twitter":
          this.twitterService.checkAndAddTwitter(this.userInfo, this.accessToken,this.secret).then(
            (data)=>{
              this.dataOperation(data);
            }
          ).catch(errorHandler);
          break;
        default:
          console.log("error");
      }
    }else{
      this.authService.registerAuthenticate(this.userInfo).then(
        (data) => {
          if(data["status"]===404){
            this.errorMessageAlert("404");
          }else
          if(data["_body"]&&JSON.parse(data["_body"])["message"]){
            this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
            console.log(data["message"]);
          }else{
            console.log(data);
            let userInfo = Utils.clone(this.userInfo);//todo:set userInfo
            for (let i in userInfo) {
              if (userInfo.hasOwnProperty(i)) {
                if(data["user"][i]){
                  userInfo[i] = data["user"][i];
                }
              } else {
                console.log(i);
              }
            }
            this.authService.addOrUpdateUser(userInfo);
            this.navCtrl.push(waitMailPage,userInfo);
          }
        }
      ).catch((err) => {
        console.error(err)
      });
    }
  }
}
