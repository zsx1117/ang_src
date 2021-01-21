/**
 * Created by szg on 14/04/2017.
 */

import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {Content, AlertController, Loading, LoadingController, NavController} from "ionic-angular";

import {QuestionQuestService} from "../../service/question-request-service";
import {ClassSetModel} from "../../model/ClassSetModel";
import {backGroundUrlsConfig, DEFAULT_BACKGROUND_IMAGE, CodeFormMap} from "../../shared/config";
import {HttpService} from "../../service/httpservice";
import {UserInfo} from "../../model/UserInfo";
import {AuthService} from "../../service/auth-service";
import {MainPage} from "../main/main";
import {ShareVariableService} from "../../service/share-variable-service";
import {CartService} from "../../service/cart-service";
import {TranslateService} from "@ngx-translate/core";



@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  providers:[QuestionQuestService,CartService]
})

export class login implements OnInit {
  @ViewChild(Content) content: Content;
  questions: any[];
  loading: Loading;
  overHeight:boolean = false;
  classSet:ClassSetModel;
  backGroundUrls: string[] = backGroundUrlsConfig;
  contentClass : string = "no-scroll";
  defaultBackground:string = DEFAULT_BACKGROUND_IMAGE;
  showLoad:any;
  disLoad:any;
  backgroundImg:string;

  constructor(private translate:TranslateService,public http: HttpService,private shareVariableService:ShareVariableService,private questionQuestService:QuestionQuestService,private authService:AuthService, private navCtrl: NavController,private alertCtrl: AlertController, private loadingCtrl: LoadingController,private cartService:CartService){
    this.questions = questionQuestService.solveData(this.shareVariableService.getQuestionArray()[CodeFormMap["login"]]);
    this.classSet = new ClassSetModel("","","","","","submit-btn","login-list","login-list-position","login-label");
    this.overHeight = false;
    this.backgroundImg = this.backGroundUrls[0];

  }


  ngOnInit(){
    this.getNewBackGround();
  }

  ionViewWillLeave(){
    if(this.loading) {
      this.loading.dismiss().catch(err=>console.log(err));
    }
    this.showLoad.unsubscribe();
    this.disLoad.unsubscribe();
  }

  ionViewDidEnter(){
    this.showLoad=this.http.loadPushObservable.subscribe((data)=>{
      if(data){
        this.showLoading();
      }
    });
    this.disLoad=this.http.dismissObservable.subscribe((data)=>{
      if(data&&this.loading){
        this.loading.dismiss();
        console.log("dismiss");
      }
    });
  }

  showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    console.log("Show loading");
  }


  errorMessageAlert(message:string){
    let alert = this.alertCtrl.create({
      title: 'Login failed',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getNewBackGround() {
    let count = 1;
    setInterval(() => {
      count = count == this.backGroundUrls.length - 1 ? 0 : count + 1;
      this.backgroundImg = this.backGroundUrls[count];
    }, 3000);
  };

  submitForm(formInfo:Object){
    let currentUserInfo = new UserInfo("","");
    for(let i in formInfo){
      currentUserInfo[i] = formInfo[i];
    }
    this.authService.authenticate(currentUserInfo).then(
      //this.authService.authenticateFake(currentUserInfo).then(
      (data) => {
        if(data["status"]===404){
          this.errorMessageAlert("404");
        }else
        if(data["_body"]&&JSON.parse(data["_body"])["message"]){
          this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
          console.log(JSON.parse(data["_body"])["message"]);
        }else{
          let storeUserInfo: UserInfo = new UserInfo("", "");
          for (let i in storeUserInfo) {
            if (storeUserInfo.hasOwnProperty(i)) {
              if(data["user"][i]){
                storeUserInfo[i] = data["user"][i];
              }
            } else {
              console.log(i);
            }
          }
          this.cartService.getCart(storeUserInfo["externalid"]).then(cart=>{
            console.log(cart);
            this.shareVariableService.setCart(cart);
            storeUserInfo["isConnect"]=1;
            this.authService.addOrUpdateUser(storeUserInfo);
            this.authService.saveToken(data["token"]);
            let token = localStorage.getItem("token");
            console.log(token);
            this.shareVariableService.setUserInfo(storeUserInfo);
            this.navCtrl.setRoot(MainPage,storeUserInfo);
          }).catch(error=>{
            console.log(error);
            storeUserInfo["isConnect"]=1;
            this.authService.addOrUpdateUser(storeUserInfo);
            this.authService.saveToken(data["token"]);
            let token = localStorage.getItem("token");
            console.log(token);
            this.shareVariableService.setUserInfo(storeUserInfo);
            this.navCtrl.setRoot(MainPage,storeUserInfo);
          });
        }
      }
    ).catch((err) => {
      console.error(err)
    });
    //this.dataservice.operator('INSERT INTO userInfo(name ,email ,birthday ,password) VALUES ("'+currentUserInfo.name+'","'+currentUserInfo.email+'","'+currentUserInfo.birthday+'","'+currentUserInfo.password+'")');
    //this.dataservice.operator('INSERT INTO userInfo(email) VALUES ("'+currentUserInfo.email+'")');

  }
}

