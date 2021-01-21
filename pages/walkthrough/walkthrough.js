"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var config_1 = require("../../shared/config");
var config_2 = require('../../shared/config');
var login_1 = require('../login/login');
var main_1 = require("../main/main");
var UserInfo_1 = require("../../model/UserInfo");
var facebook_service_1 = require("../../service/facebook-service");
var utils_1 = require("../../shared/utils");
var googleLogin_service_1 = require("../../service/googleLogin-service");
var browser_1 = require("@angular/platform-browser/src/browser");
var angularfire2_1 = require('angularfire2');
var twitter_service_1 = require("../../service/twitter-service");
var register_1 = require("../register/register");
var firebase = require('firebase/app');
require('firebase/auth');
var register2_1 = require("../register2/register2");
var WalkThroughPage = (function () {
    function WalkThroughPage(analytics, translate, http, angularFireAuth, authService, navCtrl, sanitizer, alertCtrl, googleLoginService, facebookService, twitterService, loadingCtrl, facebook) {
        var _this = this;
        this.analytics = analytics;
        this.translate = translate;
        this.http = http;
        this.angularFireAuth = angularFireAuth;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.sanitizer = sanitizer;
        this.alertCtrl = alertCtrl;
        this.googleLoginService = googleLoginService;
        this.facebookService = facebookService;
        this.twitterService = twitterService;
        this.loadingCtrl = loadingCtrl;
        this.facebook = facebook;
        this.back = [];
        this.backGroundUrls = config_2.backGroundUrlsConfig;
        this.loged = false;
        this.backGroundUrls.forEach(function (backGroundUrl) {
            _this.back.push(sanitizer.bypassSecurityTrustStyle(" background: url(" + backGroundUrl + ") no-repeat ;  width:100%; height: 100%; background-size: 100% 100%; overflow: hidden;"));
        });
        translate.addLangs(["en", "fr"]);
        translate.setDefaultLang('en');
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
    ;
    WalkThroughPage.prototype.login = function () {
        this.navCtrl.push(login_1.login);
        this.analytics.eventTracking('Logged In', 'Account', 'Triggered when a person logs in (manual)', 10);
    };
    WalkThroughPage.prototype.register = function () {
        //this.navCtrl.push(register);
        this.navCtrl.push(register_1.register);
    };
    WalkThroughPage.prototype.register2 = function () {
        this.navCtrl.push(register2_1.register2);
    };
    WalkThroughPage.prototype.errorMessageAlert = function (message, userInfo, token, chose, secret) {
        var _this = this;
        if (message == "404") {
            var alert_1 = this.alertCtrl.create({
                title: chose + " login failed",
                subTitle: message,
                buttons: ['Dismiss']
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: chose + " need register",
                subTitle: message,
                buttons: [{ text: 'ok', handler: function () {
                            //this.navCtrl.push(register,{"userInfo":userInfo,"token":token,"chose":chose});
                            if (!secret) {
                                _this.navCtrl.push(register_1.register, { "userInfo": userInfo, "token": token, "chose": chose });
                            }
                            else {
                                _this.navCtrl.push(register_1.register, { "userInfo": userInfo, "accessToken": token, "chose": chose, "secret": secret });
                            }
                        } }]
            });
            alert_2.present();
        }
    };
    WalkThroughPage.prototype.ionViewWillLeave = function () {
        if (this.loading) {
            this.loading.dismiss().catch(function (err) { return console.log(err); });
        }
        this.showLoad.unsubscribe();
        this.disLoad.unsubscribe();
    };
    WalkThroughPage.prototype.ionViewDidEnter = function () {
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
    WalkThroughPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        console.log("Show loading");
    };
    WalkThroughPage.prototype.getNewBackGround = function () {
        var _this = this;
        var count = 1;
        setInterval(function () {
            count = count == _this.backGroundUrls.length - 1 ? 0 : count + 1;
            _this.backStyle = _this.back[count];
        }, 3000);
    };
    ;
    WalkThroughPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.checkToken()) {
            this.authService.getCurrentConnectUser().then(function (data) {
                _this.navCtrl.setRoot(main_1.MainPage, data);
            });
        }
        this.backStyle = this.back[0];
        this.getNewBackGround();
        if (!config_1.isMobile) {
            gapi.load('auth2', function () {
                gapi.auth2.init({
                    client_id: '909023812440-avgstmekpvnekucqvfh582j3q2oku53v.apps.googleusercontent.com',
                    scope: 'profile email'
                });
                _this.googleAuthInstance = gapi.auth2.getAuthInstance();
            });
        }
    };
    WalkThroughPage.prototype.logout = function () {
        if (this.googleAuthInstance.isSignedIn.get()) {
            this.googleAuthInstance.signOut().then(function (data) {
                console.log(data);
            });
        }
        else {
        }
    };
    WalkThroughPage.prototype.googleAuthtication = function () {
        var _this = this;
        // if (isMobile) {
        return new Promise(function (resolve) {
            if (!_this.googleAuthInstance.isSignedIn.get()) {
                _this.googleAuthInstance.signIn().then(function (data) {
                    console.log(data);
                    _this.googleUser = _this.googleAuthInstance.currentUser.get();
                    resolve(_this.googleUser ? _this.googleUser.isSignedIn() : false);
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                _this.googleUser = _this.googleAuthInstance.currentUser.get();
                resolve(_this.googleUser ? _this.googleUser.isSignedIn() : false);
            }
        });
        // } else {
        //   //todo:google native
        // }
    };
    WalkThroughPage.prototype.getGoogleInfo = function () {
        var _this = this;
        if (!config_1.isMobile) {
            return new Promise(function (resolve) {
                var googleInfo = _this.googleUser.getBasicProfile();
                var email = googleInfo.getEmail();
                var currentUser = new UserInfo_1.UserInfo(email ? email : "", "");
                currentUser.firstName = googleInfo.getGivenName();
                currentUser.lastName = googleInfo.getFamilyName();
                currentUser.id = googleInfo.getId();
                currentUser.pictureURL = googleInfo.getImageUrl();
                resolve(currentUser);
            });
        }
        else {
        }
    };
    WalkThroughPage.prototype.googleLoginToServer = function (user, token) {
        var _this = this;
        this.googleLoginService.checkGoogle(user, token).then(function (data) {
            if (data["status"] === 404) {
                _this.errorMessageAlert("404", null, null, "Google");
            }
            else if (data["status"] === 400) {
                var userInfo = utils_1.Utils.clone(JSON.parse(data["_body"])["gplusUser"]);
                _this.errorMessageAlert(JSON.parse(data["_body"])["message"], userInfo, token, "Google");
            }
            else {
                var userInfo = utils_1.Utils.clone(user);
                for (var i in userInfo) {
                    if (userInfo.hasOwnProperty(i)) {
                        if (data["user"][i]) {
                            userInfo[i] = data["user"][i];
                        }
                    }
                    else {
                        console.log(i);
                    }
                }
                userInfo["isConnect"] = 1;
                _this.authService.addOrUpdateUser(userInfo);
                _this.authService.saveToken(data["token"]);
                var token_1 = localStorage.getItem("token");
                _this.navCtrl.setRoot(main_1.MainPage, userInfo);
            }
            console.log(data);
        }).catch(browser_1.errorHandler);
    };
    WalkThroughPage.prototype.googleLogin = function () {
        var _this = this;
        this.googleAuthtication().then(function (result) {
            if (result) {
                _this.getGoogleInfo().then(function (data) {
                    var token = _this.googleUser.getAuthResponse()["id_token"];
                    var userInfo = new UserInfo_1.UserInfo("", "");
                    for (var i in userInfo) {
                        if (userInfo.hasOwnProperty(i)) {
                            userInfo[i] = data[i];
                        }
                        else {
                            console.log(i);
                        }
                    }
                    _this.googleLoginToServer(userInfo, token);
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    WalkThroughPage.prototype.twitterAuthtication = function () {
        return this.angularFireAuth.login({
            provider: angularfire2_1.AuthProviders.Twitter,
            method: angularfire2_1.AuthMethods.Popup
        });
    };
    WalkThroughPage.prototype.fbAuthentication = function () {
        if (!config_1.isMobile) {
            return new Promise(function (resolve) {
                FB.login(function (result) {
                    var loged;
                    var token;
                    if (result["authResponse"]) {
                        loged = true;
                        token = result["authResponse"]["accessToken"];
                    }
                    resolve({ "loged": loged, "token": token });
                }, { scope: 'public_profile,user_friends,email' });
            });
        }
        else {
            return this.facebook.login(["public_profile", "user_friends", "email"]).then(function (result) {
                return new Promise(function (resolve) {
                    var loged;
                    var token;
                    if (result["authResponse"]) {
                        loged = true;
                        token = result["authResponse"]["accessToken"];
                    }
                    resolve({ "loged": loged, "token": token });
                });
            }).catch(browser_1.errorHandler);
        }
    };
    WalkThroughPage.prototype.getFbInfo = function () {
        var _this = this;
        if (!config_1.isMobile) {
            return new Promise(function (resolve) {
                FB.api('/me?fields=id,first_name,last_name,email,picture,birthday,gender', function (result) {
                    if (result && !result.error) {
                        _this.user = result;
                        console.log(_this.user);
                        resolve(_this.user);
                    }
                    else {
                        console.log(result.error);
                        resolve(false);
                    }
                });
            });
        }
        else {
            return this.facebook.api("/me?fields=id,first_name,last_name,email,picture,birthday,gender", []).then(function (result) {
                return new Promise(function (resolve) {
                    if (result && !result.error) {
                        _this.user = result;
                        console.log(_this.user);
                        resolve(_this.user);
                    }
                    else {
                        console.log(result.error);
                        resolve(false);
                    }
                }).catch(browser_1.errorHandler);
            });
        }
    };
    WalkThroughPage.prototype.fbLoginToServer = function (user, token) {
        var _this = this;
        this.facebookService.checkFb(user, token).then(function (data) {
            if (data["status"] === 404) {
                _this.errorMessageAlert("404", null, null, "Facebook");
            }
            else if (data["status"] === 400) {
                var userInfo = utils_1.Utils.clone(JSON.parse(data["_body"])["fbUser"]);
                _this.errorMessageAlert(JSON.parse(data["_body"])["message"], userInfo, token, "Facebook");
            }
            else {
                var userInfo = utils_1.Utils.clone(user);
                for (var i in userInfo) {
                    if (userInfo.hasOwnProperty(i)) {
                        if (data["user"][i]) {
                            userInfo[i] = data["user"][i];
                        }
                    }
                    else {
                        console.log(i);
                    }
                }
                userInfo["isConnect"] = 1;
                _this.authService.addOrUpdateUser(userInfo);
                _this.authService.saveToken(data["token"]);
                _this.navCtrl.setRoot(main_1.MainPage, userInfo);
            }
        }).catch(browser_1.errorHandler);
    };
    WalkThroughPage.prototype.fbLogin = function () {
        var _this = this;
        this.fbAuthentication().then(function (result) {
            if (result["loged"]) {
                _this.getFbInfo().then(function (data) {
                    if (data) {
                        var currentUser = new UserInfo_1.UserInfo(data["email"] ? data["email"] : "", data["password"] ? data["password"] : "");
                        currentUser["birthday"] = data["birthday"] ? new Date(data["birthday"]).toISOString() : null;
                        currentUser["id"] = data["id"];
                        currentUser["lastName"] = data["last_name"];
                        currentUser["firstName"] = data["first_name"];
                        currentUser["gender"] = data["gender"] == "male" ? 1 : 2;
                        currentUser["pictureURL"] = data["picture"]["data"]["url"];
                        _this.fbLoginToServer(currentUser, result["token"]);
                    }
                    else {
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    WalkThroughPage.prototype.twitterLogin = function () {
        var _this = this;
        var provider = new firebase.auth.TwitterAuthProvider();
        return firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            var userInfo = new UserInfo_1.UserInfo("", "");
            userInfo.pictureURL = result.user["photoURL"];
            _this.sendCredToServer(token, secret, userInfo);
        }).catch(function (err) { return console.log(err); });
    };
    WalkThroughPage.prototype.sendCredToServer = function (accessToken, secret, userInfo) {
        var _this = this;
        this.twitterService.checkAndAddTwitter(userInfo, accessToken, secret).then(function (data) {
            if (data["status"] === 404) {
                _this.errorMessageAlert("404", null, null, "Twitter");
            }
            else if (data["status"] === 400) {
                var userInfo_1 = utils_1.Utils.clone(JSON.parse(data["_body"])["twitterUser"]);
                _this.errorMessageAlert(JSON.parse(data["_body"])["message"], userInfo_1, accessToken, "Twitter", secret);
            }
            else {
                var userInfo_2 = new UserInfo_1.UserInfo("", "");
                for (var i in userInfo_2) {
                    if (userInfo_2.hasOwnProperty(i)) {
                        if (data["user"][i]) {
                            userInfo_2[i] = data["user"][i];
                        }
                    }
                    else {
                        console.log(i);
                    }
                }
                userInfo_2["isConnect"] = 1;
                _this.authService.addOrUpdateUser(userInfo_2);
                _this.authService.saveToken(data["token"]);
                _this.navCtrl.setRoot(main_1.MainPage, userInfo_2);
            }
        }).catch(browser_1.errorHandler);
    };
    WalkThroughPage = __decorate([
        core_1.Component({
            selector: 'walkthrough',
            templateUrl: 'walkthrough.html',
            providers: [facebook_service_1.FacebookService, googleLogin_service_1.GoogleLoginService, twitter_service_1.TwitterService]
        })
    ], WalkThroughPage);
    return WalkThroughPage;
}());
exports.WalkThroughPage = WalkThroughPage;
