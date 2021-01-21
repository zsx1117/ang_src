/**
 * Created by szg on 26/04/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {Observable} from "rxjs";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {PostcodeValidator} from "../../validator/postcodeValidator";
import {BillingMockData} from "../../mock/mock-shipping-data";
@Component({
  selector: 'page-ship',
  templateUrl: 'billingAddress.html',
})
export class BillingPage implements OnInit {
  billingForm:FormGroup;
  submited:boolean = false;
  billingList:any;

  constructor(public events: Events,private formBuilder: FormBuilder,public navCtrl: NavController) {
    this.billingList = BillingMockData;
    this.billingForm = formBuilder.group({
      billingpostalcode: ['', Validators.compose([Validators.required, PostcodeValidator.checkPostcode])],
      billingfirstName:['',Validators.required],
      billinglastName:['',Validators.required],
      billingaddress1:['',Validators.required],
      billingaddress2:[''],
      billingcity:['',Validators.compose([Validators.required,PostcodeValidator.checkCity ])]
    })
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
    submitResault["billingstate"] = "";
    submitResault["billingcountry"] = "";
    this.events.publish('choiseBillingAddress',submitResault);
    this.navCtrl.pop();
  }


  onSubmit(submitResault:any){
    this.submited = true;
    if(this.billingForm.valid){
      this.sendAddress(submitResault);
      this.navCtrl.pop();
    }else{
      console.log("Not valid form");
    }
    console.log(submitResault);
  }
}
