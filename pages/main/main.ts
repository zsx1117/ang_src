/**
 * Created by szg on 16/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading, Events} from 'ionic-angular';

import {mapPage} from '../map/map';
import {SignOutService} from "../../service/sign-out-service";
import {login} from "../login/login";
import {WalkThroughPage} from "../walkthrough/walkthrough";
import {Utils} from "../../shared/utils";
import {HomePage} from "../home/home";
import {productPage} from "../product/product";
import {HttpService} from "../../service/httpservice";
import {CartPage} from "../cart/cart";
import {CartService} from "../../service/cart-service";
import {ShareVariableService} from "../../service/share-variable-service";
import {Observable} from "rxjs";
import {serverUrl} from "../../shared/config";
import {ContactPage} from "../contact/contact";
import {CgvPage} from "../CGV/cgv";


@Component({
  selector: "page-main",
  templateUrl: "main.html",
  providers: [CartService]
})

export class MainPage implements OnInit {
  private rootPage;
  private map;
  private product;
  private cart;
  private cartProduct;
  private favouriteProduct;
  private contact;
  private CGV;
  loading: Loading;
  userInfo: Object;
  showLoad: any;
  disLoad: any;

  constructor(public http: HttpService, public events: Events, public navCtrl: NavController, public navParams: NavParams, public signOutService: SignOutService, private loadingCtrl: LoadingController, private shareVariableService: ShareVariableService, private cartService: CartService) {
    this.contact = ContactPage;
    this.rootPage = HomePage;
    this.map = mapPage;
    this.product = productPage;
    this.cart = CartPage;
    this.CGV = CgvPage;
    this.userInfo = Utils.clone(navParams.data);
    this.shareVariableService.setUserInfo(this.userInfo);
    console.log(JSON.stringify(this.userInfo));
  }

  openPage(p) {
    if (this.rootPage != p) {
      this.rootPage = p;
    }
  }

  ngOnInit() {
    this.cartProduct = this.shareVariableService.getCart();
    if (this.cartProduct === undefined) {
      this.cartService.getCart(this.userInfo["externalid"]).then(data => {
        console.log(data);
        if (!data["status"]) {
          this.shareVariableService.setCart(data);
          this.cartProduct = data;
          this.events.publish('getCart');
        }
      });
    } else {
      this.events.publish('getCart');
    }
    let triggerCart = Observable.create((observer) => {
      this.events.subscribe('changeCart', () => {
        console.log("changeCart");
        let cartNew = this.shareVariableService.getCart();
        observer.next({"userid": this.userInfo["externalid"], "cart": cartNew});
      });
    });
    let cartResult = triggerCart.switchMap(this.cartService.updateCart).map((value) => {
      return value;
    }).do((data) => {
      console.log(data);
      this.events.publish('getCart');
    });
    cartResult.subscribe((value) => console.log(value));

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
  }


  ionViewWillLeave() {
    // if(this.loading) {
    //   this.loading.dismiss().catch(err=>console.log(err));
    // }
    // this.showLoad.unsubscribe();
    // this.disLoad.unsubscribe();
  }

  ionViewDidEnter() {
    this.events.subscribe('changePage', (page) => {
      this.rootPage = page;
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
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    console.log("Show loading");
  }


  signOut() {
    // this.showLoading();
    // this.signOutService.signOutRequest().then(()=>{
    //   this.loading.dismiss();
    this.signOutService.deleteToken();
    this.signOutService.setDisconnect();
    this.navCtrl.setRoot(WalkThroughPage);
    // }).catch((err)=>{
    //   this.loading.dismiss();
    //   console.error(err)
    // });
  }
}
