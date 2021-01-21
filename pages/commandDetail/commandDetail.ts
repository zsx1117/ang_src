/**
 * Created by szg on 29/05/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {defaultImage} from "../../shared/config"
import {ShippingMockData, BillingMockData} from "../../mock/mock-shipping-data";
import {cartMockData} from "../../mock/mock-cart-data";
import {commandDetailData} from "../../mock/mock-commandDetail-data";
@Component({
  selector : 'page-commandDetail',
  templateUrl:'commandDetail.html'
})
export class CommandDetail implements OnInit{
  defaultImage = defaultImage;
  subtotalFee: number = 0.00;
  cartList: any;
  shippingFee: number = 0.00;
  shippingAddress: any;
  billingAddress:any;
  commandDetail:any;
  constructor(public navCtrl: NavController, public events: Events) {
    this.shippingAddress = ShippingMockData[0];
    this.billingAddress = BillingMockData[1];
    this.cartList = cartMockData;
    this.commandDetail = commandDetailData;
  }

  getSubTotalFee() {
    this.subtotalFee = 0;
    for (let i in this.cartList) {
      this.subtotalFee += this.cartList[i]["quantity"] * this.cartList[i]["price"];
    }
    return this.subtotalFee;
  }

  ngOnInit() {
  }


}
