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
var config_1 = require('../shared/config');
var MailCheckService = (function () {
    function MailCheckService(http) {
        this.http = http;
        this.http = http;
    }
    MailCheckService.prototype.signUpCheck = function (email, externalid) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(config_1.serverUrl.url + '/isUserVerified?' + "email=" + email + "&&externalid=" + externalid).subscribe(function (data) {
                if (data.json()) {
                    resolve(data);
                }
            }, function (err) {
                resolve(err);
            });
        });
    };
    MailCheckService.prototype.changeCheckMail = function (info) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(config_1.serverUrl.url + '/changeunverifiedemail', info).subscribe(function (data) {
                if (data.json()) {
                    resolve(data.json());
                }
            }, function (err) {
                resolve(err);
            });
        });
    };
    MailCheckService.prototype.resendCheckMail = function (email, externalid) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(config_1.serverUrl.url + '/resendverificationemail?' + "email=" + email + "&&externalid=" + externalid).subscribe(function (data) {
                if (data.json()) {
                    resolve(data.json());
                }
            }, function (err) {
                resolve(err);
            });
        });
    };
    MailCheckService = __decorate([
        core_1.Injectable()
    ], MailCheckService);
    return MailCheckService;
}());
exports.MailCheckService = MailCheckService;
