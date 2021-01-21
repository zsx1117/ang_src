/**
 * Created by szg on 24/03/2017.
 */
import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {NavParams, NavController, Events} from 'ionic-angular';

import {ProductService} from "../../service/product-service";
import {defaultImage} from "../../shared/config"
import {Observable} from "rxjs";
import {CartPage} from "../cart/cart";
import {ShareVariableService} from "../../service/share-variable-service";
import {CartService} from "../../service/cart-service";
import {FavouriteService} from "../../service/favourite-service";
declare const $;

@Component({
  templateUrl: "product.html",
  selector: "page-product",
  providers: [ProductService,FavouriteService]
})

export class productPage implements OnInit {
  @ViewChild('cartIcon') cartIcon: ElementRef;
  enabled: boolean = true;
  pages: number = 1;
  items: number = 8;
  products: any;
  defaultImage = defaultImage;
  success: boolean = false;
  total: any;
  cartNumber: number;
  cart: any;

  constructor(private navCtrl: NavController, public events: Events, private productService: ProductService, private shareVariableService: ShareVariableService, private cartService: CartService, private favouriteService:FavouriteService) {
  }

  ngOnInit() {
    this.getCartNumber();
    this.events.subscribe('getCart', () => {
      this.getCartNumber();
    })
  }

  getCartNumber() {
    this.cart = this.shareVariableService.getCart();
    this.cartNumber = this.cart === undefined ? 0 : this.cart.reduce((pre, cur) => {
        return pre + cur["quantity"];
      }, 0);
  }

  ionViewDidLoad() {
    // this.getAllProduct();
    this.getInit();
  }

  doRefresh(refresher) {
    let productResult = Observable.fromPromise(this.productService.getPartProducts(this.pages * this.items));
    setTimeout(() => {
      this.products = [];
      productResult.subscribe((data) => {
        if (!data.hasOwnProperty("status")) {
          if (data instanceof Array) {
            data.forEach((item) => {
              this.products.push(item);
              this.productService.addOrUpdateProduct(item);
            });
          }
          console.log(this.products);
        }
        refresher.complete();
      });
    }, 2000);
  }

  notFav(product: Object) {
    product["isFavorite"] = false;
    // this.shareVariableService.setFavourite(this.favouriteService.removeItem(this.shareVariableService.getFavourite(),product));
    // this.events.publish('changeFavourite');
  }

  saveFav(product: Object) {
    product["isFavorite"] = true;
    // this.shareVariableService.setFavourite(this.favouriteService.addItem(this.shareVariableService.getFavourite(),product));
    // this.events.publish('changeFavourite');
  }

  addCart(event, product) {
    this.shareVariableService.setCart(this.cartService.addItem(this.cart, product));
    this.events.publish('changeCart');
    let img = event.target.closest("ion-item").querySelectorAll("img")[0];
    let imgTop = img.getBoundingClientRect().top;
    let imgLeft = img.getBoundingClientRect().left;
    let cImg = $(img).clone();
    let cartTop = this.cartIcon.nativeElement.getBoundingClientRect().top;
    let cartLeft = this.cartIcon.nativeElement.getBoundingClientRect().left;
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
    }, 1000, () => {
      cImg.remove();
      // $(".dnum").text(i);
      // localStorage.setItem("inum", i);
    });
  }

  getAllProduct() {
    this.productService.getAllProducts().then(data => {
      if (!data["status"]) {
        this.products = data;
        this.products.forEach((e) => {
          this.productService.addOrUpdateProduct(e);
        });
        console.log(this.products);
      }
    }, (err) => {
      console.log(err);
    }).catch((err) => {
      console.log(err)
    });
  }

  goCart() {
    this.events.publish('changePage', CartPage);
  }

  getInit() {
    this.products = [];
    this.productService.getByPage(this.pages, this.items).then(data => {
      if (!data["status"]) {
        if (data instanceof Array) {
          data.forEach((item) => {
            this.products.push(item);
            this.productService.addOrUpdateProduct(item);
          });
          this.success = true;
        }
        console.log(this.products);
      }
    }, (err) => {
      this.success = false;
      console.log(err);
    }).catch((err) => {
      console.log(err)
    });
  }

  getAmount() {
    this.productService.getProductAmount().then(number => {
      this.total = number;
    }).catch(err => console.log(err));
  }


  doInfinite(infiniteScroll) {
    if (this.success) {
      this.pages++;
    }
    return this.productService.getByPage(this.pages, this.items).then(data => {
      if (!data["status"]) {
        if (data instanceof Array) {
          data.forEach((item) => {
            this.productService.addOrUpdateProduct(item);
            this.products.push(item);
          });
          this.success = true;
        }
      } else {
        this.success = false;
      }
      console.log(this.products);
      console.log('Finished receiving data, async operation complete');
      infiniteScroll.complete();
      if (this.products.length >= 10) {
        this.enabled = false;
      }
    });
  }

}
