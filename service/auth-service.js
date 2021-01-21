"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 28/02/2017.
 */
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var config_1 = require('../shared/config');
var mockUserInfo_1 = require("../mock/mockUserInfo");
var AuthService = (function () {
    function AuthService(http, dataservice) {
        this.http = http;
        this.dataservice = dataservice;
        this.isAuthenticated = true;
        this.http = http;
    }
    AuthService.prototype.getIsAuthenticated = function () {
        return this.isAuthenticated;
    };
    AuthService.prototype.addOrUpdateUser = function (user) {
        var _this = this;
        this.dataservice.getAll("select * from userInfo where email ='" + user.email + "'", function (result) {
            if (result.rows.length > 0) {
                _this.dataservice.operator("update userInfo set  externalid ='" + user.externalid + "',id='" + user.id + "', birthday='" + user.birthday + "', lastName='" + user.lastName + "', createddate='" + user.createddate + "', pictureURL='" + user.pictureURL + "', firstName='" + user.firstName + "', gender='" + user.gender + "', mobilePhone='" + user.mobilePhone + "', isConnect=1 where email ='" + user.email + "'");
            }
            else {
                _this.dataservice.operator("INSERT INTO userInfo(email,gender,lastName,firstName,mobilePhone,id,birthday,createddate,pictureURL,externalid,isConnect) VALUES ('" + user.email + "','" + user.gender + "','" + user.lastName + "','" + user.firstName + "','" + user.mobilePhone + "','" + user.id + "','" + user.birthday + "','" + user.createddate + "','" + user.pictureURL + "','" + user.externalid + "',1)");
            }
        });
    };
    AuthService.prototype.authenticate = function (user) {
        var _this = this;
        var creds = { "email": user.email, "password": user.password };
        return new Promise(function (resolve) {
            _this.http.post(config_1.serverUrl.url + '/login', creds).subscribe(function (data) {
                //this.isAuthenticated = this.http.getIsAuthenticated();
                if (data.json()) {
                    //todo:the situation failed
                    resolve(data.json());
                }
            }, function (err) { resolve(err); });
        });
    };
    AuthService.prototype.registerAuthenticate = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(config_1.serverUrl.url + '/signup', user).subscribe(function (data) {
                if (data.json()) {
                    //todo:the situation failed
                    resolve(data.json());
                }
            }, function (err) { resolve(err); });
        });
    };
    AuthService.prototype.saveToken = function (token) {
        var tokenString = JSON.stringify(token);
        this.dataservice.operator("INSERT INTO token(content) VALUES ('" + tokenString + "')");
        localStorage.setItem("token", tokenString);
        this.isAuthenticated = true;
    };
    AuthService.prototype.getCurrentConnectUser = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.dataservice.getAll("select * from userInfo where isConnect = 1 ", function (result) {
                if (result.rows.length > 0) {
                    return resolve(result.rows[0]);
                }
                else {
                    return resolve(false);
                }
            });
        });
    };
    AuthService.prototype.connectUser = function (email) {
        this.dataservice.operator("update userInfo set isConnect = 1 where email ='" + email + "'");
    };
    AuthService.prototype.checkToken = function () {
        var token = localStorage.getItem("token");
        if (token) {
            return token;
        }
        else {
            this.dataservice.getAll("select * from token ", function (result) {
                if (result.rows.length > 0) {
                    localStorage.setItem("token", result.rows[0]);
                    return result.rows[0];
                }
                else {
                    return false;
                }
            });
        }
    };
    AuthService.prototype.deleteToken = function () {
        localStorage.removeItem("token");
        this.dataservice.operator("DELETE FROM token ");
    };
    AuthService.prototype.authenticateFake = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.addOrUpdateUser(mockUserInfo_1.UserInfoDataMock);
            _this.saveToken({ token: "token-jwt" });
            resolve(true);
        });
    };
    AuthService.prototype.checkCaptcha = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(config_1.serverUrl.url + '/checkCaptcha', { "key": key }).subscribe(function (data) {
                if (data.json()) {
                    //todo:the situation failed
                    resolve(data.json());
                }
            }, function (err) { resolve(err); });
        });
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
