import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Facebook} from '@ionic-native/facebook';

import {isMobile,FB_APP_ID} from "../shared/config"
import {WalkThroughPage} from "../pages/walkthrough/walkthrough";
import {login}from "../pages/login/login"
import {DataService} from "../shared/DataService";
import {mapPage} from "../pages/map/map";
import {MainPage} from "../pages/main/main";
import {HomePage} from "../pages/home/home";
import {AuthService} from "../service/auth-service";
import {MailPage} from "../pages/mail/mail";
import {waitMailPage} from "../pages/waitmail/waitmail";
import {productPage} from "../pages/product/product";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {register} from "../pages/register/register";
import {serviceTest} from "../pages/servicetest/servicetest";
import {FormConfigService} from "../service/form-config-service";
import {ShareVariableService} from "../service/share-variable-service";
import {Payment} from "../pages/payment/payment";
import {CartPage} from "../pages/cart/cart";
import {ShippingPage} from "../pages/shippingAddress/shippingAddress";
import {QuestionQuestService} from "../service/question-request-service";
import {ConfirmationPage} from "../pages/Confirmation/confirmation";
import {ContactPage} from "../pages/contact/contact";
import {CgvPage} from "../pages/CGV/cgv";
import {CommandDetail} from "../pages/commandDetail/commandDetail";
import {ProfilePage} from "../pages/profile/profile";
import {TranslateService} from "@ngx-translate/core";
import {GoogleAnalytics} from "@ionic-native/google-analytics";

declare const FB:any;
declare var device;

declare const gapi:any;

@Component({
  templateUrl: 'app.html',
  providers:[FormConfigService,QuestionQuestService]
})
export class MyApp {
  @ViewChild(Nav) nav;
  public rootPage:any;
  public rootParams:any;
  public questionList={};
  //public rootPage:any = MainPage;
  //public rootPage:any = HomePage;

  constructor(private ga: GoogleAnalytics,private dataservice:DataService,platform: Platform,private authService:AuthService,private facebook: Facebook,private formConfigService:FormConfigService,private shareVariableService:ShareVariableService,private questionQuestService:QuestionQuestService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      dataservice.operator('create table if NOT EXISTS userInfo(externalid TEXT,id TEXT, isConnect INTEGER,pictureURL TEXT,lastName TEXT,firstName TEXT,mobilePhone TEXT,email TEXT,birthday TEXT,gender TEXT, createddate TEXT)');
      dataservice.operator('create table if NOT EXISTS token(content TEXT)');
      dataservice.operator('create table if NOT EXISTS products(id TEXT,sfid TEXT,name TEXT,image TEXT,description TEXT,price NUMERIC,productpage TEXT,publishdate TEXT)');

      let deviceUuid = typeof(device) != "undefined"?device.uuid:'web';
      this.formConfigService.sendUuidAndGetForm(deviceUuid).then((data)=>{

        console.log(data);
        let promiseArray=[];
        if(data.hasOwnProperty("status")){
          console.log("not find forms");
        }else{
          for(let i in data){
            promiseArray.push(this.creatPromise(data[i]));
          }
        }
        Promise.all(promiseArray).then(()=>{
          console.log(this.questionList);
          this.shareVariableService.setQuestionArray(this.questionList);
        });
        this.shareVariableService.setFormConfig(data);
      }).catch(err=>{
        console.log(err);
      });

      if (!isMobile){

        FB.init({
          //appId      : '766754766780681',
          appId: FB_APP_ID,
          xfbml: true,  // parse social plugins on this page
          version: 'v2.8' // use graph api version 2.5
        });
        FB.getLoginStatus();
      }else{
        this.ga.startTrackerWithId('UA-100704829-1').then(()=>{
          this.ga.trackView('start');
        }).catch(e=>console.log('Error starting GoogleAnalytics', e));

          facebook.browserInit(parseInt(FB_APP_ID,10),"v2.8").catch(errorHandler);
          facebook.getLoginStatus().catch(errorHandler);
      }


      if(this.authService.checkToken()){
        this.authService.getCurrentConnectUser().then((data)=>{
          let user = data;
          this.rootParams = user;
          this.rootPage=MainPage;
          this.nav.setRoot(MainPage,user);
        });
      }else{
        //this.rootPage = WalkThroughPage;
        this.nav.setRoot(WalkThroughPage);
        //this.nav.setRoot(ProfilePage);
        //this.nav.setRoot(ContactPage);
        //this.nav.setRoot(CgvPage);
        //this.nav.setRoot(mapPage);
        //this.nav.setRoot(serviceTest);
        //this.nav.setRoot(CartPage);
        //this.nav.setRoot(ConfirmationPage);
        //this.nav.setRoot(productPage);
        //this.nav.setRoot(CgvPage);
      }
    });
  }


  creatPromise(data){
    return new Promise((resolve)=>{
      this.questionQuestService.getFormData(data["name"]).then((questions)=>{
        this.questionList[data["code"]] = questions?questions:[];
        resolve(this.questionList);
      })
    });
  }

}
