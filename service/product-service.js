"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 24/03/2017.
 */
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var config_1 = require('../shared/config');
var ProductService = (function () {
    function ProductService(http, dataservice) {
        this.http = http;
        this.dataservice = dataservice;
        this.http = http;
    }
    ProductService.prototype.getAllProducts = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(config_1.serverUrl.url + '/products').subscribe(function (data) {
                console.log(JSON.parse(data["_body"]));
                resolve(JSON.parse(data["_body"]));
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    ProductService.prototype.getPartProducts = function (items) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(config_1.serverUrl.url + '/products/limit/' + items).subscribe(function (data) {
                console.log(JSON.parse(data["_body"]));
                resolve(JSON.parse(data["_body"]));
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    ProductService.prototype.getByPage = function (page, items) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(config_1.serverUrl.url + '/products/page/' + page + '/' + items).subscribe(function (data) {
                console.log(JSON.parse(data["_body"]));
                resolve(JSON.parse(data["_body"]));
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    ProductService.prototype.getProductAmount = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(config_1.serverUrl.url + '/numberofproducts').subscribe(function (data) {
                console.log(JSON.parse(data["_body"]));
                resolve(JSON.parse(data["_body"])[0]["numberofproducts"]);
            }, function (err) {
                console.log(err);
                resolve(err);
            });
        });
    };
    ProductService.prototype.addOrUpdateProduct = function (product) {
        var _this = this;
        this.dataservice.getAll("select * from products where id ='" + product.id + "'", function (result) {
            if (result.rows.length > 0) {
                _this.dataservice.operator("update products set description ='" + product.description + "',sfid='" + product.sfid + "',image='" + product.image + "',price='" + product.price + "',publishdate='" + product.publishdate + "',productpage='" + product.productpage + "',name='" + product.name + "'where id='" + product.id + "'");
            }
            else {
                _this.dataservice.operator("INSERT INTO products(id,description,image,price,publishdate,productpage,sfid,name,) VALUES ('" + product.id + "','" + product.description + "','" + product.image + "','" + product.price + "','" + product.publishdate + "','" + product.productpage + "','" + product.sfid + "','" + product.name + "')");
            }
        });
    };
    ProductService = __decorate([
        core_1.Injectable()
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
