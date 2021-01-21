import {Component, OnInit} from '@angular/core';
import {NavController, Loading, LoadingController, AlertController} from 'ionic-angular';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import {isMobile} from "../../shared/config"
import {backGroundUrlsConfig} from '../../shared/config'
import {login}from '../login/login'
import {AuthService} from "../../service/auth-service";
import {MainPage} from "../main/main";
import {UserInfo} from "../../model/UserInfo";
import {FacebookService} from "../../service/facebook-service";
import {Utils} from "../../shared/utils";
import {HttpService} from "../../service/httpservice";
import {GoogleLoginService} from "../../service/googleLogin-service";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire} from 'angularfire2';
import {TwitterService} from "../../service/twitter-service";
import {register} from "../register/register";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {register2} from "../register2/register2";
import {TranslateService} from "@ngx-translate/core";
import {analytics} from "../../service/analytics";
declare const FB: any;
declare const gapi: any;


declare var device;

@Component({
  selector: 'walkthrough',
  templateUrl: 'walkthrough.html',
  providers: [FacebookService,GoogleLoginService,TwitterService]
})

export class WalkThroughPage implements OnInit {
  back: SafeStyle[] = [];
  backStyle: any;
  backGroundUrls: string[] = backGroundUrlsConfig;
  token: string;
  loged: boolean = false;
  user: any;
  googleAuthInstance:any;
  loading: Loading;
  showLoad:any;
  disLoad:any;
  googleUser:any;
  twitterAuthState: FirebaseAuthState;

  constructor(private analytics: analytics,private translate:TranslateService,public http: HttpService, public angularFireAuth: AngularFireAuth, private authService: AuthService, public navCtrl: NavController, private sanitizer: DomSanitizer, private alertCtrl: AlertController, private googleLoginService: GoogleLoginService, private facebookService: FacebookService, private twitterService: TwitterService, private loadingCtrl: LoadingController, private facebook: Facebook) {
    this.backGroundUrls.forEach((backGroundUrl) => {
      this.back.push(sanitizer.bypassSecurityTrustStyle(" background: url(" + backGroundUrl + ") no-repeat ;  width:100%; height: 100%; background-size: 100% 100%; overflow: hidden;"));
    });
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  };

  login() {
    this.navCtrl.push(login);
    this.analytics.eventTracking('Logged In', 'Account', 'Triggered when a person logs in (manual)', 10)
  }

  register() {
    //this.navCtrl.push(register);
    this.navCtrl.push(register);
  }

  register2(){
    this.navCtrl.push(register2);
  }


  errorMessageAlert(message:string,userInfo?:UserInfo,token?:string,chose?:string,secret?:string){
    if(message == "404"){
      let alert = this.alertCtrl.create({
        title: chose+" login failed",
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: chose+" need register",
        subTitle: message,
        buttons: [{text:'ok',handler:()=>{
          //this.navCtrl.push(register,{"userInfo":userInfo,"token":token,"chose":chose});
          if(!secret){
            this.navCtrl.push(register,{"userInfo":userInfo,"token":token,"chose":chose});
          }else{
            this.navCtrl.push(register,{"userInfo":userInfo,"accessToken":token,"chose":chose,"secret":secret});
          }
        }}]
      });
      alert.present();
    }
  }

  ionViewWillLeave (){
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
      }
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    console.log("Show loading");
  }

  getNewBackGround() {
    let count = 1;
    setInterval(() => {
      count = count == this.backGroundUrls.length - 1 ? 0 : count + 1;
      this.backStyle = this.back[count];
    }, 3000);
  };


  ngOnInit() {
    if (this.authService.checkToken()) {
      this.authService.getCurrentConnectUser().then((data)=>{
        this.navCtrl.setRoot(MainPage, data);
      });
    }
    this.backStyle = this.back[0];
    this.getNewBackGround();
    if(!isMobile){
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '909023812440-avgstmekpvnekucqvfh582j3q2oku53v.apps.googleusercontent.com',
          scope: 'profile email'
        });
        this.googleAuthInstance = gapi.auth2.getAuthInstance();
      });
      //twitter
      // this.angularFireAuth.subscribe((state) => {
      //   this.twitterAuthState = state;
      //   console.log(state);
      // });
    }
  }

  logout(){
    if(this.googleAuthInstance.isSignedIn.get()){
      this.googleAuthInstance.signOut().then((data)=>{
        console.log(data);
      });
    }else{

    }
  }


  googleAuthtication(){
    // if (isMobile) {
      return new Promise(resolve => {
        if (!this.googleAuthInstance.isSignedIn.get()) {
          this.googleAuthInstance.signIn().then((data) => {
            console.log(data);
            this.googleUser = this.googleAuthInstance.currentUser.get();
            resolve(this.googleUser?this.googleUser.isSignedIn():false);
          }, (err) => {
            console.log(err);
          });
        }else{
          this.googleUser = this.googleAuthInstance.currentUser.get();
          resolve(this.googleUser?this.googleUser.isSignedIn():false);
        }

      });
    // } else {
    //   //todo:google native
    // }
  }

  getGoogleInfo() {
    if (!isMobile) {
      return new Promise(resolve => {
        let googleInfo = this.googleUser.getBasicProfile();
        let email = googleInfo.getEmail();
        let currentUser = new UserInfo(email ? email : "", "");
        currentUser.firstName = googleInfo.getGivenName();
        currentUser.lastName = googleInfo.getFamilyName();
        currentUser.id = googleInfo.getId();
        currentUser.pictureURL = googleInfo.getImageUrl();
        resolve(currentUser);
      });
    } else {
         //todo:native
    }
  }

  googleLoginToServer(user: UserInfo, token: string) {
    this.googleLoginService.checkGoogle(user, token).then(
      (data) => {
        if (data["status"] === 404) {
          this.errorMessageAlert("404",null,null,"Google");
        } else if (data["status"] === 400) {
          let userInfo = Utils.clone(JSON.parse(data["_body"])["gplusUser"]);
          this.errorMessageAlert(JSON.parse(data["_body"])["message"],userInfo,token,"Google");
        } else {
          let userInfo = Utils.clone(user);
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
        console.log(data);
      }
    ).catch(errorHandler);
  }

  googleLogin() {
    this.googleAuthtication().then((result) => {
      if (result) {
        this.getGoogleInfo().then((data) => {
          let token = this.googleUser.getAuthResponse()["id_token"];
          let userInfo = new UserInfo("", "");
          for (let i in userInfo) {
            if (userInfo.hasOwnProperty(i)) {
              userInfo[i] = data[i];
            } else {
              console.log(i);
            }
          }
          this.googleLoginToServer(userInfo, token);
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  twitterAuthtication(){
        return this.angularFireAuth.login({
          provider:AuthProviders.Twitter,
          method:AuthMethods.Popup
        });
  }

  fbAuthentication() {
    if(!isMobile){
      return new Promise(resolve => {
        FB.login((result: any) => {
          let loged;
          let token;
          if (result["authResponse"]) {
            loged = true;
            token = result["authResponse"]["accessToken"];
          }
          resolve({"loged":loged,"token":token});
        }, {scope: 'public_profile,user_friends,email'})
      });
    }else{
      return this.facebook.login(["public_profile","user_friends","email"]).then((result)=>{
        return new Promise((resolve)=>{
          let loged;
          let token;
          if (result["authResponse"]) {
            loged = true;
            token = result["authResponse"]["accessToken"];
          }
          resolve({"loged":loged,"token":token});
        });
      }).catch(errorHandler);
    }
  }

  getFbInfo() {
    if (!isMobile) {
      return new Promise(resolve => {
        FB.api('/me?fields=id,first_name,last_name,email,picture,birthday,gender',
          (result) => {
            if (result && !result.error) {
              this.user = result;
              console.log(this.user);
              resolve(this.user);
            } else {
              console.log(result.error);
              resolve(false);
            }
          }
        );
      });
    } else {
      return this.facebook.api("/me?fields=id,first_name,last_name,email,picture,birthday,gender", []).then((result) => {
        return new Promise((resolve) => {
          if (result && !result.error) {
            this.user = result;
            console.log(this.user);
            resolve(this.user);
          } else {
            console.log(result.error);
            resolve(false);
          }
        }).catch(errorHandler);
      });
    }
  }

  fbLoginToServer(user: UserInfo, token: string) {
    this.facebookService.checkFb(user, token).then(
      (data) => {
        if (data["status"] === 404) {
          this.errorMessageAlert("404",null,null,"Facebook");
        } else if (data["status"] === 400) {
          let userInfo = Utils.clone(JSON.parse(data["_body"])["fbUser"]);
          this.errorMessageAlert(JSON.parse(data["_body"])["message"],userInfo,token,"Facebook");
        } else {
          let userInfo = Utils.clone(user);
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
          this.navCtrl.setRoot(MainPage, userInfo);
        }
      }
    ).catch(errorHandler);
  }

  fbLogin() {
    this.fbAuthentication().then((result) => {
      if (result["loged"]) {
        this.getFbInfo().then((data) => {
          if (data) {
            let currentUser = new UserInfo(data["email"] ? data["email"] : "", data["password"] ? data["password"] : "");
            currentUser["birthday"] = data["birthday"]?new Date(data["birthday"]).toISOString():null;
            currentUser["id"] = data["id"];
            currentUser["lastName"] = data["last_name"];
            currentUser["firstName"] = data["first_name"];
            currentUser["gender"] = data["gender"] == "male" ? 1 : 2;
            currentUser["pictureURL"] = data["picture"]["data"]["url"];

            this.fbLoginToServer(currentUser, result["token"]);
          }else{
          }
        }).catch((err)=>{
          console.log(err);
        });
      }

    }).catch((err)=>{
      console.log(err);
    });
  }

  twitterLogin(){
    let provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result)=>{
      let token = result.credential.accessToken;
      let secret = result.credential.secret;
      let userInfo = new UserInfo("","");
      userInfo.pictureURL = result.user["photoURL"];
      this.sendCredToServer(token,secret,userInfo)
    }).catch((err)=>console.log(err));
  }

  sendCredToServer(accessToken:string,secret:string,userInfo:UserInfo){
    this.twitterService.checkAndAddTwitter(userInfo,accessToken,secret).then(
      (data) => {
        if (data["status"] === 404) {
          this.errorMessageAlert("404",null,null,"Twitter");
        } else if (data["status"] === 400) {
          let userInfo = Utils.clone(JSON.parse(data["_body"])["twitterUser"]);
          this.errorMessageAlert(JSON.parse(data["_body"])["message"],userInfo,accessToken,"Twitter",secret);
        } else {
          let userInfo = new UserInfo("","");
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
          this.navCtrl.setRoot(MainPage, userInfo);
        }
      }
    ).catch(errorHandler);
  }
}
