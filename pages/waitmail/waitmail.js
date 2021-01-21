"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 23/03/2017.
 */
var core_1 = require('@angular/core');
var mail_1 = require("../mail/mail");
var mail_check_service_1 = require("../../service/mail-check-service");
var utils_1 = require("../../shared/utils");
var main_1 = require("../main/main");
var config_1 = require("../../shared/config");
var waitMailPage = (function () {
    function waitMailPage(http, events, toastCtrl, loadingCtrl, authService, navCtrl, navParams, alertCtrl, mailCheckService) {
        this.http = http;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.mailCheckService = mailCheckService;
        this.pages = [
            {
                title: "Check mail Please",
                description: "You have to waite few minutes and check your mail box. After checking, you could click button to <b>login in</b>. On the other hand, you can <b>change</b> your E-mail address or <b>send the checking mail again</b>",
                image: "assets/img/mail/email.jpg",
            }
        ];
        this.defaultImage = config_1.defaultImage;
        this.loginTimer = 0;
        this.hasSend = false;
        this.hasLogin = false;
        this.loginBlockOther = false;
        this.resendBlockOther = false;
        this.resendTimer = 0;
        this.userInfo = utils_1.Utils.clone(navParams.data);
    }
    waitMailPage.prototype.ngOnInit = function () {
    };
    waitMailPage.prototype.ionViewWillLeave = function () {
        if (this.loading) {
            this.loading.dismiss().catch(function (err) { return console.log(err); });
        }
        this.showLoad.unsubscribe();
        this.disLoad.unsubscribe();
    };
    waitMailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.showLoad = this.http.loadPushObservable.subscribe(function (data) {
            if (data) {
                _this.showLoading();
            }
        });
        this.disLoad = this.http.dismissObservable.subscribe(function (data) {
            if (data && _this.loading) {
                _this.loading.dismiss();
                console.log("dismiss");
            }
        });
        this.hasSend = false;
        this.hasLogin = false;
        this.loginBlockOther = false;
        this.resendBlockOther = false;
        this.events.subscribe('changeMail', function (mail) {
            _this.userInfo["email"] = mail;
        });
    };
    waitMailPage.prototype.resendCountDown = function () {
        var _this = this;
        this.resendTimer = 30;
        var countDown = setInterval(function () {
            _this.resendTimer--;
            if (_this.resendTimer == 0) {
                clearInterval(countDown);
                _this.hasSend = false;
            }
        }, 1000);
    };
    waitMailPage.prototype.loginTimeCountDown = function () {
        var _this = this;
        this.loginTimer = 15;
        var countDown = setInterval(function () {
            _this.loginTimer--;
            if (_this.loginTimer == 0) {
                clearInterval(countDown);
                _this.hasLogin = false;
            }
        }, 1000);
    };
    waitMailPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        console.log("Show loading");
    };
    waitMailPage.prototype.login = function () {
        var _this = this;
        this.hasLogin = true;
        this.loginBlockOther = true;
        this.loginTimeCountDown();
        this.mailCheckService.signUpCheck(this.userInfo["email"], this.userInfo["externalid"]).then(function (data) {
            if (data["status"] === 404) {
                _this.errorMessageAlert("404");
                _this.hasLogin = false;
            }
            else if (data["status"] === 200) {
                _this.authService.connectUser(_this.userInfo.email);
                _this.authService.saveToken((data["_body"])["token"]);
                var token = localStorage.getItem("token");
                console.log(token);
                _this.navCtrl.setRoot(main_1.MainPage, _this.userInfo);
            }
            else {
                _this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
            }
        }).catch(function (err) {
            console.error(err);
        });
        this.loginBlockOther = false;
    };
    waitMailPage.prototype.changeEmail = function () {
        this.navCtrl.push(mail_1.MailPage);
    };
    waitMailPage.prototype.errorMessageAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Connect failed',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    waitMailPage.prototype.showChangeFinish = function () {
        var toast = this.toastCtrl.create({
            message: 'Your mail were successfully changed, Check your mail box please.',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    waitMailPage.prototype.resend = function () {
        var _this = this;
        this.hasSend = true;
        this.resendBlockOther = true;
        this.resendCountDown();
        this.mailCheckService.resendCheckMail(this.userInfo["email"], this.userInfo["externalid"]).then(function (data) {
            if (data["status"] === 404) {
                _this.errorMessageAlert("404");
                _this.hasSend = false;
            }
            else if (data["_body"] && JSON.parse(data["_body"])["message"]) {
                _this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
                console.log(data["message"]);
            }
            else {
                _this.showChangeFinish();
            }
        }).catch(function (err) { console.error(err); });
        this.resendBlockOther = false;
    };
    waitMailPage = __decorate([
        core_1.Component({
            selector: "page-waitMail",
            templateUrl: "waitmail.html",
            providers: [mail_check_service_1.MailCheckService]
        })
    ], waitMailPage);
    return waitMailPage;
}());
exports.waitMailPage = waitMailPage;
