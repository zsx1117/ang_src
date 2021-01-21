/**
 * Created by szg on 14/04/2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var question_request_service_1 = require("../../service/question-request-service");
var ClassSetModel_1 = require("../../model/ClassSetModel");
var config_1 = require("../../shared/config");
var UserInfo_1 = require("../../model/UserInfo");
var main_1 = require("../main/main");
var cart_service_1 = require("../../service/cart-service");
var login = (function () {
    function login(translate, http, shareVariableService, questionQuestService, authService, navCtrl, alertCtrl, loadingCtrl, cartService) {
        this.translate = translate;
        this.http = http;
        this.shareVariableService = shareVariableService;
        this.questionQuestService = questionQuestService;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.cartService = cartService;
        this.overHeight = false;
        this.backGroundUrls = config_1.backGroundUrlsConfig;
        this.contentClass = "no-scroll";
        this.defaultBackground = config_1.DEFAULT_BACKGROUND_IMAGE;
        this.questions = questionQuestService.solveData(this.shareVariableService.getQuestionArray()[config_1.CodeFormMap["login"]]);
        this.classSet = new ClassSetModel_1.ClassSetModel("", "", "", "", "", "submit-btn", "login-list", "login-list-position", "login-label");
        this.overHeight = false;
        this.backgroundImg = this.backGroundUrls[0];
    }
    login.prototype.ngOnInit = function () {
        this.getNewBackGround();
    };
    login.prototype.ionViewWillLeave = function () {
        if (this.loading) {
            this.loading.dismiss().catch(function (err) { return console.log(err); });
        }
        this.showLoad.unsubscribe();
        this.disLoad.unsubscribe();
    };
    login.prototype.ionViewDidEnter = function () {
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
    };
    login.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        console.log("Show loading");
    };
    login.prototype.errorMessageAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Login failed',
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    login.prototype.getNewBackGround = function () {
        var _this = this;
        var count = 1;
        setInterval(function () {
            count = count == _this.backGroundUrls.length - 1 ? 0 : count + 1;
            _this.backgroundImg = _this.backGroundUrls[count];
        }, 3000);
    };
    ;
    login.prototype.submitForm = function (formInfo) {
        var _this = this;
        var currentUserInfo = new UserInfo_1.UserInfo("", "");
        for (var i in formInfo) {
            currentUserInfo[i] = formInfo[i];
        }
        this.authService.authenticate(currentUserInfo).then(
        //this.authService.authenticateFake(currentUserInfo).then(
        function (data) {
            if (data["status"] === 404) {
                _this.errorMessageAlert("404");
            }
            else if (data["_body"] && JSON.parse(data["_body"])["message"]) {
                _this.errorMessageAlert(JSON.parse(data["_body"])["message"]);
                console.log(JSON.parse(data["_body"])["message"]);
            }
            else {
                var storeUserInfo_1 = new UserInfo_1.UserInfo("", "");
                for (var i in storeUserInfo_1) {
                    if (storeUserInfo_1.hasOwnProperty(i)) {
                        if (data["user"][i]) {
                            storeUserInfo_1[i] = data["user"][i];
                        }
                    }
                    else {
                        console.log(i);
                    }
                }
                _this.cartService.getCart(storeUserInfo_1["externalid"]).then(function (cart) {
                    console.log(cart);
                    _this.shareVariableService.setCart(cart);
                    storeUserInfo_1["isConnect"] = 1;
                    _this.authService.addOrUpdateUser(storeUserInfo_1);
                    _this.authService.saveToken(data["token"]);
                    var token = localStorage.getItem("token");
                    console.log(token);
                    _this.shareVariableService.setUserInfo(storeUserInfo_1);
                    _this.navCtrl.setRoot(main_1.MainPage, storeUserInfo_1);
                }).catch(function (error) {
                    console.log(error);
                    storeUserInfo_1["isConnect"] = 1;
                    _this.authService.addOrUpdateUser(storeUserInfo_1);
                    _this.authService.saveToken(data["token"]);
                    var token = localStorage.getItem("token");
                    console.log(token);
                    _this.shareVariableService.setUserInfo(storeUserInfo_1);
                    _this.navCtrl.setRoot(main_1.MainPage, storeUserInfo_1);
                });
            }
        }).catch(function (err) {
            console.error(err);
        });
        //this.dataservice.operator('INSERT INTO userInfo(name ,email ,birthday ,password) VALUES ("'+currentUserInfo.name+'","'+currentUserInfo.email+'","'+currentUserInfo.birthday+'","'+currentUserInfo.password+'")');
        //this.dataservice.operator('INSERT INTO userInfo(email) VALUES ("'+currentUserInfo.email+'")');
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Content)
    ], login.prototype, "content", void 0);
    login = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: 'login.html',
            providers: [question_request_service_1.QuestionQuestService, cart_service_1.CartService]
        })
    ], login);
    return login;
}());
exports.login = login;
