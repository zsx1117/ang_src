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
var ionic_native_1 = require('ionic-native');
var config_1 = require("../../shared/config");
var store_service_1 = require("../../service/store-service");
var utils_1 = require("../../shared/utils");
var cart_1 = require("../cart/cart");
var product_1 = require("../product/product");
var HomePage = (function () {
    function HomePage(storeService, events, navCtrl, navParams, _loader, shareVariableService) {
        var _this = this;
        this.storeService = storeService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._loader = _loader;
        this.shareVariableService = shareVariableService;
        this.pictures = config_1.backGroundUrlsConfig;
        // this.getCurrentPosition().then(() => {
        //   this.getStoreInformation().then(() => {
        //     this.findCloseShop();
        //   });
        // });
        Promise.all([this.getCurrentPosition(), this.getStoreInformation()]).then(function () {
            _this.findCloseShop();
        }).catch(function (err) {
            console.log(err);
        });
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.events.subscribe('getCart', function () {
            _this.getCartNumber();
            console.log("get cart");
        });
    };
    HomePage.prototype.getCartNumber = function () {
        this.cart = this.shareVariableService.getCart();
        this.cartNumber = this.cart === undefined ? 0 : this.cart.reduce(function (pre, cur) {
            return pre + cur["quantity"];
        }, 0);
    };
    HomePage.prototype.goCart = function () {
        this.events.publish('changePage', cart_1.CartPage);
    };
    HomePage.prototype.goProduct = function () {
        this.events.publish('changePage', product_1.productPage);
    };
    HomePage.prototype.getCurrentPosition = function () {
        var _this = this;
        return new Promise(function (resolve) {
            ionic_native_1.Geolocation.getCurrentPosition().then(function (position) {
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
                resolve(true);
            }, function (err) {
                console.log(err);
                resolve(false);
            });
        });
    };
    HomePage.prototype.getStoreInformation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._loader.load().then(function () {
                _this.storeService.getStore().then(function (data) {
                    if (!data["status"]) {
                        _this.shopLocation = utils_1.Utils.clone(data);
                        for (var i in _this.shopLocation) {
                            //this.shopLocation[i]["position"] = this.creatPosition(this.shopLocation[i]["lat"], this.shopLocation[i]["lng"]);
                            _this.shopLocation[i]["position"] = new google.maps.LatLng(_this.shopLocation[i]["lat"], _this.shopLocation[i]["lng"]);
                        }
                        _this.shareVariableService.setShopLocation(utils_1.Utils.clone(_this.shopLocation));
                        resolve(true);
                    }
                }, function (err) {
                    console.log(err);
                    resolve(false);
                }).catch(function (err) {
                    console.log(err);
                });
            });
        });
    };
    // creatPosition(latex: number, lngex: number) {
    //   this._loader.load().then(() => {
    //     return new google.maps.LatLng({lat: latex, lng: lngex});
    //   });
    // }
    HomePage.prototype.findCloseShop = function () {
        var _this = this;
        this._loader.load().then(function () {
            var nowPlace = new google.maps.LatLng(_this.lat, _this.lng);
            _this.shopLocation.reduce(function (prev, curr) {
                var cpos = google.maps.geometry.spherical.computeDistanceBetween(nowPlace, curr["position"]);
                var ppos = google.maps.geometry.spherical.computeDistanceBetween(nowPlace, prev["position"]);
                return cpos < ppos ? curr : prev;
            });
            _this.store = _this.shopLocation[0];
            console.log(_this.shopLocation[0]);
        });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: "page-home",
            templateUrl: "home.html",
            providers: [store_service_1.StoreService]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
