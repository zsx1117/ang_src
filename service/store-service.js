"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 20/03/2017.
 */
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var config_1 = require('../shared/config');
var StoreService = (function () {
    function StoreService(http, dataservice, httpOrgin) {
        this.http = http;
        this.dataservice = dataservice;
        this.httpOrgin = httpOrgin;
        this.http = http;
    }
    StoreService.prototype.getStore = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(config_1.serverUrl.url + '/stores').subscribe(function (data) {
                console.log(JSON.parse(data["_body"]));
                resolve(JSON.parse(data["_body"]));
            }, function (err) { resolve(err); });
        });
    };
    StoreService.prototype.getAndSetCityBycoordinate = function (store) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + store["lat"] + "," + store["lng"] + '&sensor=true').subscribe(function (data) {
                store["city"] = data["results"]["address_components"][2]["long_name"];
                resolve(true);
            });
        });
    };
    StoreService.prototype.getCityByCoordinate = function (lat, lng, store, number) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.httpOrgin.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + '&sensor=true').subscribe(function (data) {
                console.log(JSON.parse(data["_body"]));
                store["city"] = JSON.parse(data["_body"])["results"][0]["address_components"][number + 1]["long_name"];
                console.log(store["city"]);
                resolve(store["city"]);
            });
        });
    };
    StoreService = __decorate([
        core_1.Injectable()
    ], StoreService);
    return StoreService;
}());
exports.StoreService = StoreService;
