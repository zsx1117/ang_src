/**
 * Created by szg on 19/05/2017.
 */
import {CartService} from "../../service/cart-service";
import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {CartPage} from "../cart/cart";
import {ShareVariableService} from "../../service/share-variable-service";
import {Observable} from "rxjs";
import {FavouriteService} from "../../service/favourite-service";
declare const $;


@Component({
  selector: 'page-Favourite',
  templateUrl: 'Favourite.html',
  providers: [CartService,FavouriteService]
})

export class FavouritePage implements OnInit{
  @ViewChild('cartIcon') cartIcon: ElementRef;
  pages: number = 1;
  items: number = 8;
  products: any;
  cartNumber: number;
  cart: any;
  success: boolean = true;
  enabled: boolean = true;
  constructor(public navCtrl:NavController, public events: Events, private shareVariableService: ShareVariableService, private cartService: CartService,private favouriteService:FavouriteService){

  }

  ngOnInit(){
    this.products =  this.shareVariableService.getFavourite();
    this.events.subscribe('getFavourite',()=>{
      this.products = this.shareVariableService.getFavourite();
    });
    this.getCartNumber();
    this.events.subscribe('getCart', () => {
      this.getCartNumber();
    })
  }

  ionViewDidLoad() {

  }

  doRefresh(refresher) {
    let productResult = Observable.fromPromise(this.favouriteService.getFavourite(this.shareVariableService.getUserInfo()["sfid"]));
    setTimeout(() => {
      this.products = [];
      productResult.subscribe((data) => {
        if (!data.hasOwnProperty("status")) {
          if (data instanceof Array) {
            data.forEach((item) => {
              this.products.push(item);
            });
          }
          console.log(this.products);
        }
        refresher.complete();
      });
    }, 2000);
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

  remove(product){
    this.shareVariableService.setFavourite(this.favouriteService.removeItem(this.products,product));
    this.events.publish('changeFavourite');
  }





}
