/**
 * Created by szg on 23/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {
  NavController, NavParams, LoadingController, Loading, AlertController, ToastController,
  Events
} from 'ionic-angular';
import {MailPage} from "../mail/mail";
import {MailCheckService} from "../../service/mail-check-service";
import {UserInfo} from "../../model/UserInfo";
import {Utils} from "../../shared/utils";
import {MainPage} from "../main/main";
import {AuthService} from "../../service/auth-service";
import {HttpService} from "../../service/httpservice";
import {defaultImage} from "../../shared/config"


@Component({
  selector:"page-waitMail",
  templateUrl:"waitmail.html",
  providers:[MailCheckService]
})

export class waitMailPage implements OnInit{

  pages = [
    {
      title: "Check mail Please",
      description: "You have to waite few minutes and check your mail box. After checking, you could click button to <b>login in</b>. On the other hand, you can <b>change</b> your E-mail address or <b>send the checking mail again</b>",
      image: "assets/img/mail/email.jpg",
    }
  ];

  defaultImage = defaultImage;
  loading: Loading;
  loginTimer: number = 0;
  hasSend: boolean = false;
  hasLogin: boolean = false;

  loginBlockOther: boolean = false;
  resendBlockOther: boolean = false;

  resendTimer:number=0;
  userInfo:UserInfo;
  showLoad:any;
  disLoad:any;


  constructor(public http: HttpService,public events: Events,public toastCtrl: ToastController,private loadingCtrl: LoadingController,private authService:AuthService,public navCtrl:NavController,public navParams:NavParams, private alertCtrl: AlertController,public mailCheckService:MailCheckService) {
    this.userInfo = Utils.clone(navParams.data);
  }


  ngOnInit() {
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
    this.hasSend = false;
    this.hasLogin= false;
    this.loginBlockOther = false;
    this.resendBlockOther = false;
    this.events.subscribe('changeMail',(mail)=>{
      this.userInfo["email"] = mail;
    });
  }

  resendCountDown(){
    this.resendTimer=30;
    let countDown=setInterval(()=>{
      this.resendTimer--;
      if(this.resendTimer==0){
        clearInterval(countDown);
        this.hasSend =false;
      }
    },1000);
  }

  loginTimeCountDown(){
    this.loginTimer = 15;
    let countDown = setInterval(()=>{
        this.loginTimer--;
        if(this.loginTimer==0){
          clearInterval(countDown);
          this.hasLogin =false;
        }
      },1000);
  }

  showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    console.log("Show loading");
  }

  login() {
    this.hasLogin = true;
    this.loginBlockOther = true;
    this.loginTimeCountDown();
    this.mailCheckService.signUpCheck(this.userInfo["email"],this.userInfo["externalid"]).then((data) => {
      if (data["status"] === 404) {
        this.errorMessageAlert("404");
        this.hasLogin = false;
      } else if (data["status"] === 200) {

        this.authService.connectUser(this.userInfo.email);
        this.authService.saveToken((data["_body"])["token"]);
        let token = localStorage.getItem("token");
        console.log(token);
        this.navCtrl.setRoot(MainPage, this.userInfo);
      } else {
        this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
      }
    }).catch((err) => {
      console.error(err)
    });
    this.loginBlockOther = false;
  }



  changeEmail(){
    this.navCtrl.push(MailPage);
  }

  errorMessageAlert(message:string){
    let alert = this.alertCtrl.create({
      title: 'Connect failed',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showChangeFinish() {
    const toast = this.toastCtrl.create({
      message: 'Your mail were successfully changed, Check your mail box please.',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  resend(){
    this.hasSend=true;
    this.resendBlockOther=true;
    this.resendCountDown();

    this.mailCheckService.resendCheckMail(this.userInfo["email"],this.userInfo["externalid"]).then((data)=>{
      if(data["status"]===404){
        this.errorMessageAlert("404");
        this.hasSend=false;
      }else
      if(data["_body"]&&JSON.parse(data["_body"])["message"]){
        this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
        console.log(data["message"]);
      }else{
        this.showChangeFinish();
      }
    }).catch((err)=>{console.error(err)});
    this.resendBlockOther = false;
  }



}
