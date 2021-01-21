/**
 * Created by szg on 30/05/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {CartPage} from "../cart/cart";
@Component({
  selector:'page-commands',
  templateUrl:'commands.html'
})
export class Commands implements OnInit{
  constructor(public navCtrl: NavController, public events: Events){

  }


  ngOnInit(){

  }

  goCart() {
    this.events.publish('changePage', CartPage);
  }
}
