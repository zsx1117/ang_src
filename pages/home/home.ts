/**
 * Created by szg on 20/03/2017.
 */
import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {MapsAPILoader} from 'angular2-google-maps/core';


import {backGroundUrlsConfig} from "../../shared/config";
import {StoreService} from "../../service/store-service";
import {Utils} from "../../shared/utils";
import {ShareVariableService} from "../../service/share-variable-service";
import {CartPage} from "../cart/cart";
import {productPage} from "../product/product";

declare const google: any;

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [StoreService]
})

export class HomePage implements OnInit {

  lat: any;
  lng: any;
  cart: any;
  location: any;
  shopLocation: Array<Object>;
  store: any;
  pictures: string[] = backGroundUrlsConfig;
  cartNumber: number;


  constructor(private storeService: StoreService, public events: Events, public navCtrl: NavController, public navParams: NavParams, private _loader: MapsAPILoader, private shareVariableService: ShareVariableService) {
    // this.getCurrentPosition().then(() => {
    //   this.getStoreInformation().then(() => {
    //     this.findCloseShop();
    //   });
    // });
    Promise.all([this.getCurrentPosition(), this.getStoreInformation()]).then(() => {
      this.findCloseShop();
    }).catch(err => {
      console.log(err)
    });

  }

  ngOnInit() {
    this.events.subscribe('getCart', () => {
      this.getCartNumber();
      console.log("get cart");
    })
  }


  getCartNumber() {
    this.cart = this.shareVariableService.getCart();
    this.cartNumber = this.cart === undefined ? 0 : this.cart.reduce((pre, cur) => {
      return pre + cur["quantity"];
    }, 0);
  }

  goCart() {
    this.events.publish('changePage', CartPage);
  }

  goProduct() {
    this.events.publish('changePage', productPage);
  }

  getCurrentPosition() {
    return new Promise(resolve => {
      Geolocation.getCurrentPosition().then(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        resolve(true);
      }, (err) => {
        console.log(err);
        resolve(false)
      });
    });
  }

  getStoreInformation() {
    return new Promise(resolve => {
      this._loader.load().then(() => {
        this.storeService.getStore().then(data => {
          if (!data["status"]) {
            this.shopLocation = Utils.clone(data)
            for (let i in this.shopLocation) {
              //this.shopLocation[i]["position"] = this.creatPosition(this.shopLocation[i]["lat"], this.shopLocation[i]["lng"]);
              this.shopLocation[i]["position"] = new google.maps.LatLng(this.shopLocation[i]["lat"], this.shopLocation[i]["lng"]);
            }
            this.shareVariableService.setShopLocation(Utils.clone(this.shopLocation));
            resolve(true);
          }
        }, (err) => {
          console.log(err);
          resolve(false);
        }).catch((err) => {
          console.log(err)
        });
      });
    });
  }

  // creatPosition(latex: number, lngex: number) {
  //   this._loader.load().then(() => {
  //     return new google.maps.LatLng({lat: latex, lng: lngex});
  //   });
  // }

  findCloseShop() {
    this._loader.load().then(() => {
      let nowPlace = new google.maps.LatLng(this.lat, this.lng);
      this.shopLocation.reduce((prev, curr) => {
        let cpos = google.maps.geometry.spherical.computeDistanceBetween(nowPlace, curr["position"]);
        let ppos = google.maps.geometry.spherical.computeDistanceBetween(nowPlace, prev["position"]);
        return cpos < ppos ? curr : prev;
      });
      this.store = this.shopLocation[0];
      console.log(this.shopLocation[0]);
    });
  }
}
