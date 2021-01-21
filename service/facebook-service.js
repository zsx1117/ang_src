"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 28/03/2017.
 */
var core_1 = require('@angular/core');
var config_1 = require("../shared/config");
var FacebookService = (function () {
    function FacebookService(http) {
        this.http = http;
        this.http = http;
    }
    FacebookService.prototype.checkFb = function (user, token) {
        var _this = this;
        var creds = { "user": user, "token": token };
        return new Promise(function (resolve) {
            _this.http.post(config_1.serverUrl.url + '/fblogin', creds).subscribe(function (data) {
                //this.isAuthenticated = this.http.getIsAuthenticated();
                if (data.json()) {
                    //todo:the situation failed
                    resolve(data.json());
                }
            }, function (err) { resolve(err); });
        });
    };
    FacebookService = __decorate([
        core_1.Injectable()
    ], FacebookService);
    return FacebookService;
}());
exports.FacebookService = FacebookService;
