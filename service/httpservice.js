"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 08/03/2017.
 */
var core_1 = require('@angular/core');
//import {Observable} from 'rxjs/Observable';
var Rx_1 = require('rxjs/Rx');
var http_1 = require("@angular/http");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var Subject_1 = require('rxjs/Subject');
var HttpService = (function (_super) {
    __extends(HttpService, _super);
    function HttpService(backend, options) {
        _super.call(this, backend, options);
        this.isAuthenticated = true;
        this.loadPush = new Subject_1.Subject();
        this.dismissPush = new Subject_1.Subject();
        this.loadPushObservable = this.loadPush.asObservable();
        this.dismissObservable = this.dismissPush.asObservable();
    }
    HttpService.prototype.getIsAuthenticated = function () {
        return this.isAuthenticated;
    };
    HttpService.prototype.request = function (url, options) {
        var _this = this;
        this.loadPush.next(true);
        var token = localStorage.getItem("token");
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new http_1.Headers() };
            }
            if (token) {
                options.headers.set('Authorization', token);
                this.isAuthenticated = true;
            }
        }
        else {
            if (token) {
                url.headers.set('Authorization', token);
                this.isAuthenticated = true;
            }
        }
        console.log(url);
        return _super.prototype.request.call(this, url, options).do(function () {
            _this.dismissPush.next(true);
        }).catch(this.catchAuThError(this, this.isAuthenticated));
    };
    HttpService.prototype.catchAuThError = function (self, isAuthenticated) {
        var _this = this;
        var token = localStorage.getItem("token");
        return function (res) {
            console.log(res);
            isAuthenticated = false;
            if (res.status === 401 || res.status === 403) {
                //todo:add the operation
                console.log(res);
            }
            if (res.status === 404) {
                console.log("can not find");
            }
            _this.dismissPush.next(true);
            return Rx_1.Observable.throw(res);
        };
    };
    HttpService = __decorate([
        core_1.Injectable()
    ], HttpService);
    return HttpService;
}(http_1.Http));
exports.HttpService = HttpService;
