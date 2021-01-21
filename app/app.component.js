"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var config_1 = require("../shared/config");
var walkthrough_1 = require("../pages/walkthrough/walkthrough");
var main_1 = require("../pages/main/main");
var browser_1 = require("@angular/platform-browser/src/browser");
var form_config_service_1 = require("../service/form-config-service");
var question_request_service_1 = require("../service/question-request-service");
var MyApp = (function () {
    //public rootPage:any = MainPage;
    //public rootPage:any = HomePage;
    function MyApp(ga, dataservice, platform, authService, facebook, formConfigService, shareVariableService, questionQuestService) {
        var _this = this;
        this.ga = ga;
        this.dataservice = dataservice;
        this.authService = authService;
        this.facebook = facebook;
        this.formConfigService = formConfigService;
        this.shareVariableService = shareVariableService;
        this.questionQuestService = questionQuestService;
        this.questionList = {};
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
            ionic_native_1.Splashscreen.hide();
            dataservice.operator('create table if NOT EXISTS userInfo(externalid TEXT,id TEXT, isConnect INTEGER,pictureURL TEXT,lastName TEXT,firstName TEXT,mobilePhone TEXT,email TEXT,birthday TEXT,gender TEXT, createddate TEXT)');
            dataservice.operator('create table if NOT EXISTS token(content TEXT)');
            dataservice.operator('create table if NOT EXISTS products(id TEXT,sfid TEXT,name TEXT,image TEXT,description TEXT,price NUMERIC,productpage TEXT,publishdate TEXT)');
            var deviceUuid = typeof (device) != "undefined" ? device.uuid : 'web';
            _this.formConfigService.sendUuidAndGetForm(deviceUuid).then(function (data) {
                console.log(data);
                var promiseArray = [];
                if (data.hasOwnProperty("status")) {
                    console.log("not find forms");
                }
                else {
                    for (var i in data) {
                        promiseArray.push(_this.creatPromise(data[i]));
                    }
                }
                Promise.all(promiseArray).then(function () {
                    console.log(_this.questionList);
                    _this.shareVariableService.setQuestionArray(_this.questionList);
                });
                _this.shareVariableService.setFormConfig(data);
            }).catch(function (err) {
                console.log(err);
            });
            if (!config_1.isMobile) {
                FB.init({
                    //appId      : '766754766780681',
                    appId: config_1.FB_APP_ID,
                    xfbml: true,
                    version: 'v2.8' // use graph api version 2.5
                });
                FB.getLoginStatus();
            }
            else {
                _this.ga.startTrackerWithId('UA-100704829-1').then(function () {
                    _this.ga.trackView('start');
                }).catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
                facebook.browserInit(parseInt(config_1.FB_APP_ID, 10), "v2.8").catch(browser_1.errorHandler);
                facebook.getLoginStatus().catch(browser_1.errorHandler);
            }
            if (_this.authService.checkToken()) {
                _this.authService.getCurrentConnectUser().then(function (data) {
                    var user = data;
                    _this.rootParams = user;
                    _this.rootPage = main_1.MainPage;
                    _this.nav.setRoot(main_1.MainPage, user);
                });
            }
            else {
                //this.rootPage = WalkThroughPage;
                _this.nav.setRoot(walkthrough_1.WalkThroughPage);
            }
        });
    }
    MyApp.prototype.creatPromise = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.questionQuestService.getFormData(data["name"]).then(function (questions) {
                _this.questionList[data["code"]] = questions ? questions : [];
                resolve(_this.questionList);
            });
        });
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'app.html',
            providers: [form_config_service_1.FormConfigService, question_request_service_1.QuestionQuestService]
        })
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
