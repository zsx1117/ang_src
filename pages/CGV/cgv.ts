/**
 * Created by szg on 24/05/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {CartPage} from "../cart/cart";
@Component({
  selector:"page-cgv",
  templateUrl:"cgv.html",
})

export class CgvPage implements OnInit{

  constructor(public events: Events,public navCtrl: NavController){

  }
  ngOnInit(){

  }

  goCart() {
    this.events.publish('changePage', CartPage);
  }

}
