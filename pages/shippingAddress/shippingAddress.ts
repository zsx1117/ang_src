/**
 * Created by szg on 26/04/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {Observable} from "rxjs";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {PostcodeValidator} from "../../validator/postcodeValidator";
import {ShippingMockData} from "../../mock/mock-shipping-data";
@Component({
  selector: 'page-ship',
  templateUrl: 'shippingAddress.html',
})
export class ShippingPage implements OnInit {
  shipForm:FormGroup;
  submited:boolean = false;
  shippingList:any;

  constructor(public events: Events,private formBuilder: FormBuilder,public navCtrl: NavController) {
    this.shippingList = ShippingMockData;
    this.shipForm = formBuilder.group({
      shippingpostalcode: ['', Validators.compose([Validators.required, PostcodeValidator.checkPostcode])],
      shippingfirstName:['',Validators.required],
      shippinglastName:['',Validators.required],
      shippingaddress1:['',Validators.required],
      shippingaddress2:[''],
      shippingcity:['',Validators.compose([Validators.required,PostcodeValidator.checkCity ])]
    });
  }

  ngOnInit() {
  }

  addBd(event){
// console.log(event.target.parentNode.previousElementSibling.classList.add("labelShowTitle"));
  event.target.parentNode.parentNode.classList.add("bdColor");
  }

  blurBd(event){
    event.target.parentNode.parentNode.classList.remove("bdColor");

  }

  sendAddress(submitResault){
    submitResault["shippingstate"] = "";
    submitResault["shippingcountry"] = "";
    this.events.publish('choiseAddress',submitResault);
    this.navCtrl.pop();
  }


  onSubmit(submitResault:any){
    this.submited = true;
    if(this.shipForm.valid){
      this.sendAddress(submitResault);
      this.navCtrl.pop();
    }else{
      console.log("Not valid form");
    }
    console.log(submitResault);
  }
}
