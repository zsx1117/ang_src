"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 13/03/2017.
 */
var core_1 = require('@angular/core');
var browser_1 = require("@angular/platform-browser/src/browser");
var login_1 = require("../pages/login/login");
var config_1 = require('../shared/config');
var SignOutService = (function () {
    function SignOutService(http, dataservice, alterCtrl) {
        this.http = http;
        this.dataservice = dataservice;
        this.alterCtrl = alterCtrl;
        this.http = http;
    }
    SignOutService.prototype.alterlogOut = function (nav) {
        var confirm = this.alterCtrl.create({
            title: "Please relogin",
            message: "Because of the lack of your authentication, you should relogin.ABOUT",
            buttons: [{
                    text: 'Agree',
                    handler: function () {
                        nav.setRoot(login_1.login).then().catch(browser_1.errorHandler);
                    }
                }]
        });
        confirm.present().then().catch(browser_1.errorHandler);
    };
    SignOutService.prototype.deleteToken = function () {
        localStorage.removeItem("token");
        this.dataservice.operator("DELETE FROM token ");
    };
    SignOutService.prototype.setDisconnect = function () {
        this.dataservice.operator("update userInfo set isConnect = 0 where isConnect = 1 ");
    };
    SignOutService.prototype.signOut = function (nav) {
        // this.signOutRequest().then(() => {
        //   this.alterlogOut(nav);
        //   this.deleteToken();
        //   this.setDisconnect();
        // }).catch((err) => {
        //   console.error(err)
        // });
        this.alterlogOut(nav);
        this.deleteToken();
        this.setDisconnect();
    };
    SignOutService.prototype.signOutRequest = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(config_1.serverUrl.url + '/logout', {}).subscribe(function (data) {
                if (data.json()) {
                    resolve(data.json());
                }
            }, function (err) {
                resolve(err);
            });
        });
    };
    SignOutService = __decorate([
        core_1.Injectable()
    ], SignOutService);
    return SignOutService;
}());
exports.SignOutService = SignOutService;
