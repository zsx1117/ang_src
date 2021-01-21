"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 15/03/2017.
 */
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var utils_1 = require("../../shared/utils");
var cart_1 = require("../cart/cart");
var store_service_1 = require("../../service/store-service");
var mapPage = (function () {
    function mapPage(navParams, events, _loader, shareVariableService, storeService) {
        this.navParams = navParams;
        this.events = events;
        this._loader = _loader;
        this.shareVariableService = shareVariableService;
        this.storeService = storeService;
        this.condition = [];
        this.map = {
            lat: 0,
            lng: 0,
            zoom: 15
        };
        this.loadMap();
        this.drawerOptions = {
            handleHeight: 30,
            thresholdFromBottom: 0,
            thresholdFromTop: 0,
            bounceBack: true,
            percentageLeftWhenUp: 35,
            percentageLeftWhenDown: 90
        };
    }
    mapPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.stores = utils_1.Utils.clone(this.shareVariableService.getShopLocation());
        if (this.stores) {
            for (var i = 0; i < this.stores.length; i++) {
                this.stores[i]["index"] = String.fromCharCode(97 + i);
            }
            this.stores = this.setPosition(this.stores);
            this.getCurrentPoint().then(function (pointNow) {
                if (pointNow) {
                    _this.stores = _this.setDistanceAndSort(_this.stores, pointNow);
                    _this.getFitBounds(_this.stores, pointNow);
                }
            });
        }
    };
    mapPage.prototype.goCart = function () {
        this.events.publish('changePage', cart_1.CartPage);
    };
    mapPage.prototype.setDistanceAndSort = function (stores, nowPlace) {
        for (var i in stores) {
            stores[i]["distance"] = google.maps.geometry.spherical.computeDistanceBetween(nowPlace, stores[i]["position"]);
        }
        stores = stores.sort(utils_1.Utils.compare("distance"));
        console.log(stores);
        return stores;
    };
    mapPage.prototype.setPosition = function (stores) {
        for (var i in stores) {
            stores[i]["position"] = new google.maps.LatLng(this.stores[i]["lat"], this.stores[i]["lng"]);
        }
        return stores;
    };
    mapPage.prototype.getFitBounds = function (stores, pointNow) {
        var _this = this;
        // this.getSame(stores,3);
        this._loader.load().then(function () {
            _this.mapBounds = new google.maps.LatLngBounds();
            _this.mapBounds.extend(pointNow);
            _this.getClosestStore(stores, 4);
            _this.condition.forEach(function (e) {
                _this.mapBounds.extend(e["position"]);
            });
        });
    };
    mapPage.prototype.getCurrentPoint = function () {
        var _this = this;
        return new Promise(function (resolve) {
            ionic_native_1.Geolocation.getCurrentPosition().then(function (position) {
                _this.lat = _this.map.lat = position.coords.latitude;
                _this.lng = _this.map.lng = position.coords.longitude;
                var now = new google.maps.LatLng(_this.lat, _this.lng);
                resolve(now);
            }, function (err) {
                console.log(err);
                resolve(false);
            }).catch(function (err) { return console.log(err); });
        });
    };
    /**find the stores in the same ville,department or region
     *
     * @param stores
     * @param number 1:ville, 2:department, 3:region
     */
    mapPage.prototype.getSame = function (stores, number) {
        var _this = this;
        var PromiseArray = [];
        var city = { "city": "" };
        PromiseArray.push(this.storeService.getCityByCoordinate(this.lat, this.lng, city, number));
        stores.forEach(function (e) {
            PromiseArray.push(_this.storeService.getCityByCoordinate(e["lat"], e["lng"], e, number));
        });
        Promise.all(PromiseArray).then(function (data) {
            _this.condition = stores.filter(function (e) {
                return e["city"] == city.city;
            });
            console.log(_this.condition);
        });
    };
    /**get serval closest stores;
     *
     * @param stores
     * @param number number of stores you want
     */
    mapPage.prototype.getClosestStore = function (stores, number) {
        this.condition = stores.slice(0, number);
    };
    /**get stores whose distance is less than number;
     *
     * @param stores
     * @param distance
     */
    mapPage.prototype.getStoresByDistance = function (stores, distance) {
        this.condition = stores.filter(function (e) {
            return e["distance"] < distance;
        });
    };
    mapPage.prototype.loadMap = function () {
        var _this = this;
        ionic_native_1.Geolocation.getCurrentPosition().then(function (position) {
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
            _this.map = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                //zoom: 8,
                zoom: 13,
                options: {}
            };
        }).catch(function (err) { return console.log(err); });
    };
    mapPage = __decorate([
        core_1.Component({
            selector: 'page-map',
            templateUrl: 'map.html',
            providers: [store_service_1.StoreService]
        })
    ], mapPage);
    return mapPage;
}());
exports.mapPage = mapPage;
