/**
 * Created by szg on 22/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {
  NavController, NavParams, LoadingController, Loading, AlertController, ToastController,
  Events
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";


import {EmailValidator} from "../../validator/emailValidator";
import {Utils} from "../../shared/utils";
import {UserInfo} from "../../model/UserInfo";
import {MailCheckService} from "../../service/mail-check-service";
import {AuthService} from "../../service/auth-service";
import {HttpService} from "../../service/httpservice";

@Component({
  selector:"page-mail",
  templateUrl:"mail.html",
  providers:[MailCheckService]
})

export class MailPage implements OnInit{

  loading: Loading;
  mailForm: FormGroup;
  submitAttempt: boolean = false;
  email: AbstractControl;
  password:AbstractControl;
  timer:number=0;
  hasSend:boolean=false;
  userInfo:UserInfo;
  showLoad:any;
  disLoad:any;

  constructor(public http: HttpService,public events: Events,private loadingCtrl: LoadingController,public toastCtrl: ToastController,private authService:AuthService,public navCtrl:NavController,public navParams:NavParams,private formBuilder: FormBuilder, private alertCtrl: AlertController,public mailCheckService:MailCheckService){
    this.mailForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required,EmailValidator.checkEmail])],
      'password':['',Validators.compose([Validators.required])]
    });

    this.email = this.mailForm.controls['email'];
    this.password = this.mailForm.controls['password'];
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

  showChangeFinish() {
    const toast = this.toastCtrl.create({
      message: 'Your mail were successfully changed, Check your mail box please.',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }


  showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    console.log("Show loading");
  }

  changeEmail(){
    this.submitAttempt=true;
    if (this.mailForm.valid) {
      this.mailCheckService.changeCheckMail({"oldEmail":this.userInfo["email"],"newEmail":this.mailForm.value["email"],"password":this.mailForm.value["password"]}).then((data)=>{
        if(data["status"]===404){
          this.errorMessageAlert("404");
        }else
        if(data["_body"]&&JSON.parse(data["_body"])["message"]){
          this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
          console.log(data["message"]);
        }else{
          console.log(data);
          for (let i in this.userInfo) {
            if (this.userInfo.hasOwnProperty(i)) {
              if(data["user"][i]){
                this.userInfo[i] = data["user"][i];
              }
            } else {
              console.log(i);
            }
          }
          this.authService.addOrUpdateUser(this.userInfo);//todo:toast alert
          this.showChangeFinish();
          this.events.publish('changeMail',this.mailForm.value["email"]);
          this.navCtrl.pop();
        }
      }).catch((err)=>{console.error(err)});
    }
  }

}
