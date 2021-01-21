/**
 * Created by szg on 27/04/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, Events} from "ionic-angular";
import {ContactPage} from "../contact/contact";
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})

export class ConfirmationPage implements OnInit{
  orderNumber:string = "826942222271";
  shippingAddress:any = {"firstName":"zhang"};
  paymentInfo:any = {"paymentInfo":"visa"};
  fee:any;
  constructor(public events: Events,private navCtrl:NavController,public navParams:NavParams){
    this.fee = this.navParams.data["fee"];
    this.paymentInfo = this.navParams.data["paymentInfo"];
    this.shippingAddress = this.navParams.data["shippingAddress"];
    console.log("enter");
  }
  ngOnInit(){
  }

  goContact(){
    this.events.publish('changePage', ContactPage);
  }
}
