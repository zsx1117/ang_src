"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 16/03/2017.
 */
var core_1 = require('@angular/core');
var map_1 = require('../map/map');
var walkthrough_1 = require("../walkthrough/walkthrough");
var utils_1 = require("../../shared/utils");
var home_1 = require("../home/home");
var product_1 = require("../product/product");
var cart_1 = require("../cart/cart");
var cart_service_1 = require("../../service/cart-service");
var rxjs_1 = require("rxjs");
var contact_1 = require("../contact/contact");
var cgv_1 = require("../CGV/cgv");
var MainPage = (function () {
    function MainPage(http, events, navCtrl, navParams, signOutService, loadingCtrl, shareVariableService, cartService) {
        this.http = http;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.signOutService = signOutService;
        this.loadingCtrl = loadingCtrl;
        this.shareVariableService = shareVariableService;
        this.cartService = cartService;
        this.contact = contact_1.ContactPage;
        this.rootPage = home_1.HomePage;
        this.map = map_1.mapPage;
        this.product = product_1.productPage;
        this.cart = cart_1.CartPage;
        this.CGV = cgv_1.CgvPage;
        this.userInfo = utils_1.Utils.clone(navParams.data);
        this.shareVariableService.setUserInfo(this.userInfo);
        console.log(JSON.stringify(this.userInfo));
    }
    MainPage.prototype.openPage = function (p) {
        if (this.rootPage != p) {
            this.rootPage = p;
        }
    };
    MainPage.prototype.ngOnInit = function () {
        var _this = this;
        this.cartProduct = this.shareVariableService.getCart();
        if (this.cartProduct === undefined) {
            this.cartService.getCart(this.userInfo["externalid"]).then(function (data) {
                console.log(data);
                if (!data["status"]) {
                    _this.shareVariableService.setCart(data);
                    _this.cartProduct = data;
                    _this.events.publish('getCart');
                }
            });
        }
        else {
            this.events.publish('getCart');
        }
        var triggerCart = rxjs_1.Observable.create(function (observer) {
            _this.events.subscribe('changeCart', function () {
                console.log("changeCart");
                var cartNew = _this.shareVariableService.getCart();
                observer.next({ "userid": _this.userInfo["externalid"], "cart": cartNew });
            });
        });
        var cartResult = triggerCart.switchMap(this.cartService.updateCart).map(function (value) {
            return value;
        }).do(function (data) {
            console.log(data);
            _this.events.publish('getCart');
        });
        cartResult.subscribe(function (value) { return console.log(value); });
        // this.favouriteService.getAll().then(data => {
        //   this.shareVariableService.setFavourite(data);
        //   this.events.publish('getFavourite');
        // });
        //
        //
        // let triggerFavourite = Observable.create(observer => {
        //   this.events.subscribe('changeFavourite', () => {
        //     console.log("changeFavourite");
        //     let FavouriteNew = this.shareVariableService.getFavourite();
        //     observer.next({"userid": this.userInfo["externalid"], "favourite": FavouriteNew});
        //   })
        // });
        // let favouriteResult = triggerFavourite.switchMap(this.favouriteService.updateFavourite).map((value) => {
        //   return value;
        // }).do((data) => {
        //   console.log(data);
        //   this.events.publish('getFavourite');
        // });
        // favouriteResult.subscribe((value) => console.log(value));
    };
    MainPage.prototype.ionViewWillLeave = function () {
        // if(this.loading) {
        //   this.loading.dismiss().catch(err=>console.log(err));
        // }
        // this.showLoad.unsubscribe();
        // this.disLoad.unsubscribe();
    };
    MainPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.events.subscribe('changePage', function (page) {
            _this.rootPage = page;
        });
        // this.showLoad=this.http.loadPushObservable.subscribe((data)=>{
        //   if(data){
        //     this.showLoading();
        //   }
        // });
        // this.disLoad=this.http.dismissObservable.subscribe((data)=>{
        //   if(data&&this.loading){
        //     this.loading.dismiss();
        //   }
        // });
    };
    MainPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        console.log("Show loading");
    };
    MainPage.prototype.signOut = function () {
        // this.showLoading();
        // this.signOutService.signOutRequest().then(()=>{
        //   this.loading.dismiss();
        this.signOutService.deleteToken();
        this.signOutService.setDisconnect();
        this.navCtrl.setRoot(walkthrough_1.WalkThroughPage);
        // }).catch((err)=>{
        //   this.loading.dismiss();
        //   console.error(err)
        // });
    };
    MainPage = __decorate([
        core_1.Component({
            selector: "page-main",
            templateUrl: "main.html",
            providers: [cart_service_1.CartService]
        })
    ], MainPage);
    return MainPage;
}());
exports.MainPage = MainPage;
