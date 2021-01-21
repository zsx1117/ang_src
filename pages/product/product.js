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
var product_service_1 = require("../../service/product-service");
var config_1 = require("../../shared/config");
var rxjs_1 = require("rxjs");
var cart_1 = require("../cart/cart");
var favourite_service_1 = require("../../service/favourite-service");
var productPage = (function () {
    function productPage(navCtrl, events, productService, shareVariableService, cartService, favouriteService) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.productService = productService;
        this.shareVariableService = shareVariableService;
        this.cartService = cartService;
        this.favouriteService = favouriteService;
        this.enabled = true;
        this.pages = 1;
        this.items = 8;
        this.defaultImage = config_1.defaultImage;
        this.success = false;
    }
    productPage.prototype.ngOnInit = function () {
        var _this = this;
        this.getCartNumber();
        this.events.subscribe('getCart', function () {
            _this.getCartNumber();
        });
    };
    productPage.prototype.getCartNumber = function () {
        this.cart = this.shareVariableService.getCart();
        this.cartNumber = this.cart === undefined ? 0 : this.cart.reduce(function (pre, cur) {
            return pre + cur["quantity"];
        }, 0);
    };
    productPage.prototype.ionViewDidLoad = function () {
        // this.getAllProduct();
        this.getInit();
    };
    productPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        var productResult = rxjs_1.Observable.fromPromise(this.productService.getPartProducts(this.pages * this.items));
        setTimeout(function () {
            _this.products = [];
            productResult.subscribe(function (data) {
                if (!data.hasOwnProperty("status")) {
                    if (data instanceof Array) {
                        data.forEach(function (item) {
                            _this.products.push(item);
                            _this.productService.addOrUpdateProduct(item);
                        });
                    }
                    console.log(_this.products);
                }
                refresher.complete();
            });
        }, 2000);
    };
    productPage.prototype.notFav = function (product) {
        product["isFavorite"] = false;
        // this.shareVariableService.setFavourite(this.favouriteService.removeItem(this.shareVariableService.getFavourite(),product));
        // this.events.publish('changeFavourite');
    };
    productPage.prototype.saveFav = function (product) {
        product["isFavorite"] = true;
        // this.shareVariableService.setFavourite(this.favouriteService.addItem(this.shareVariableService.getFavourite(),product));
        // this.events.publish('changeFavourite');
    };
    productPage.prototype.addCart = function (event, product) {
        this.shareVariableService.setCart(this.cartService.addItem(this.cart, product));
        this.events.publish('changeCart');
        var img = event.target.closest("ion-item").querySelectorAll("img")[0];
        var imgTop = img.getBoundingClientRect().top;
        var imgLeft = img.getBoundingClientRect().left;
        var cImg = $(img).clone();
        var cartTop = this.cartIcon.nativeElement.getBoundingClientRect().top;
        var cartLeft = this.cartIcon.nativeElement.getBoundingClientRect().left;
        cImg.appendTo($("body")).css({
            "height": "70px",
            "width": "70px",
            "position": "absolute",
            "opacity": "0.7",
            "top": imgTop,
            "left": imgLeft
        }).animate({
            "top": cartTop,
            "left": cartLeft,
            "width": "40px",
            "height": "40px",
            "opacity": "0.3"
        }, 1000, function () {
            cImg.remove();
            // $(".dnum").text(i);
            // localStorage.setItem("inum", i);
        });
    };
    productPage.prototype.getAllProduct = function () {
        var _this = this;
        this.productService.getAllProducts().then(function (data) {
            if (!data["status"]) {
                _this.products = data;
                _this.products.forEach(function (e) {
                    _this.productService.addOrUpdateProduct(e);
                });
                console.log(_this.products);
            }
        }, function (err) {
            console.log(err);
        }).catch(function (err) {
            console.log(err);
        });
    };
    productPage.prototype.goCart = function () {
        this.events.publish('changePage', cart_1.CartPage);
    };
    productPage.prototype.getInit = function () {
        var _this = this;
        this.products = [];
        this.productService.getByPage(this.pages, this.items).then(function (data) {
            if (!data["status"]) {
                if (data instanceof Array) {
                    data.forEach(function (item) {
                        _this.products.push(item);
                        _this.productService.addOrUpdateProduct(item);
                    });
                    _this.success = true;
                }
                console.log(_this.products);
            }
        }, function (err) {
            _this.success = false;
            console.log(err);
        }).catch(function (err) {
            console.log(err);
        });
    };
    productPage.prototype.getAmount = function () {
        var _this = this;
        this.productService.getProductAmount().then(function (number) {
            _this.total = number;
        }).catch(function (err) { return console.log(err); });
    };
    productPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.success) {
            this.pages++;
        }
        return this.productService.getByPage(this.pages, this.items).then(function (data) {
            if (!data["status"]) {
                if (data instanceof Array) {
                    data.forEach(function (item) {
                        _this.productService.addOrUpdateProduct(item);
                        _this.products.push(item);
                    });
                    _this.success = true;
                }
            }
            else {
                _this.success = false;
            }
            console.log(_this.products);
            console.log('Finished receiving data, async operation complete');
            infiniteScroll.complete();
            if (_this.products.length >= 10) {
                _this.enabled = false;
            }
        });
    };
    __decorate([
        core_1.ViewChild('cartIcon')
    ], productPage.prototype, "cartIcon", void 0);
    productPage = __decorate([
        core_1.Component({
            templateUrl: "product.html",
            selector: "page-product",
            providers: [product_service_1.ProductService, favourite_service_1.FavouriteService]
        })
    ], productPage);
    return productPage;
}());
exports.productPage = productPage;
