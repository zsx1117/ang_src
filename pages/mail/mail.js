"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 22/03/2017.
 */
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var emailValidator_1 = require("../../validator/emailValidator");
var utils_1 = require("../../shared/utils");
var mail_check_service_1 = require("../../service/mail-check-service");
var MailPage = (function () {
    function MailPage(http, events, loadingCtrl, toastCtrl, authService, navCtrl, navParams, formBuilder, alertCtrl, mailCheckService) {
        this.http = http;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.mailCheckService = mailCheckService;
        this.submitAttempt = false;
        this.timer = 0;
        this.hasSend = false;
        this.mailForm = formBuilder.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, emailValidator_1.EmailValidator.checkEmail])],
            'password': ['', forms_1.Validators.compose([forms_1.Validators.required])]
        });
        this.email = this.mailForm.controls['email'];
        this.password = this.mailForm.controls['password'];
        this.userInfo = utils_1.Utils.clone(navParams.data);
    }
    MailPage.prototype.ngOnInit = function () {
    };
    MailPage.prototype.ionViewWillLeave = function () {
        if (this.loading) {
            this.loading.dismiss().catch(function (err) { return console.log(err); });
        }
        this.showLoad.unsubscribe();
        this.disLoad.unsubscribe();
    };
    MailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.showLoad = this.http.loadPushObservable.subscribe(function (data) {
            if (data) {
                _this.showLoading();
            }
        });
        this.disLoad = this.http.dismissObservable.subscribe(function (data) {
            if (data && _this.loading) {
                _this.loading.dismiss();
            }
        });
    };
    MailPage.prototype.errorMessageAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Register failed',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    MailPage.prototype.showChangeFinish = function () {
        var toast = this.toastCtrl.create({
            message: 'Your mail were successfully changed, Check your mail box please.',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    MailPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        console.log("Show loading");
    };
    MailPage.prototype.changeEmail = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.mailForm.valid) {
            this.mailCheckService.changeCheckMail({ "oldEmail": this.userInfo["email"], "newEmail": this.mailForm.value["email"], "password": this.mailForm.value["password"] }).then(function (data) {
                if (data["status"] === 404) {
                    _this.errorMessageAlert("404");
                }
                else if (data["_body"] && JSON.parse(data["_body"])["message"]) {
                    _this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
                    console.log(data["message"]);
                }
                else {
                    console.log(data);
                    for (var i in _this.userInfo) {
                        if (_this.userInfo.hasOwnProperty(i)) {
                            if (data["user"][i]) {
                                _this.userInfo[i] = data["user"][i];
                            }
                        }
                        else {
                            console.log(i);
                        }
                    }
                    _this.authService.addOrUpdateUser(_this.userInfo); //todo:toast alert
                    _this.showChangeFinish();
                    _this.events.publish('changeMail', _this.mailForm.value["email"]);
                    _this.navCtrl.pop();
                }
            }).catch(function (err) { console.error(err); });
        }
    };
    MailPage = __decorate([
        core_1.Component({
            selector: "page-mail",
            templateUrl: "mail.html",
            providers: [mail_check_service_1.MailCheckService]
        })
    ], MailPage);
    return MailPage;
}());
exports.MailPage = MailPage;
