/**
 * Created by szg on 23/05/2017.
 */

import {Component, OnInit} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {CartPage} from "../cart/cart";
import {mapPage} from "../map/map";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
@Component({
  selector:"page-contact",
  templateUrl:"contact.html",
})

export class ContactPage implements OnInit{
  contactForm:FormGroup;
  submited=false;
  constructor(public events: Events,private formBuilder: FormBuilder, public navCtrl: NavController){
    this.contactForm = formBuilder.group({
      subject:['',Validators.required],
      description:['',Validators.required]
    });

  }
  ngOnInit(){

  }

  goCart() {
    this.events.publish('changePage', CartPage);
  }

  goMap(){
    this.events.publish('changePage', mapPage);
  }


  onSubmit(submitResault:any){
    this.submited=true;
    console.log(submitResault);
  }


}
