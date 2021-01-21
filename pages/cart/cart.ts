/**
 * Created by szg on 25/04/2017.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, Events} from "ionic-angular";
import {cartMockData} from "../../mock/mock-cart-data";
import {defaultImage} from "../../shared/config"
import {Payment} from "../payment/payment";
import {ShippingPage} from "../shippingAddress/shippingAddress";
import {PayService} from "../../service/pay-service";
import {ConfirmationPage} from "../Confirmation/confirmation";
import {ShareVariableService} from "../../service/share-variable-service";
import {CartService} from "../../service/cart-service";
import {BillingPage} from "../billingAddress/billingAddress";
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [PayService, CartService]
})
export class CartPage implements OnInit {
  defaultImage = defaultImage;
  subtotalFee: number = 0.00;
  cartList: any;
  shippingFee: number = 0.00;
  shippingAddress: any;
  billingAddress:any;
  paymentInfo: any;
  buttonDisable: boolean = false;
  cartNumber: number;

  constructor(public navCtrl: NavController, public events: Events, private payService: PayService, private shareVariableService: ShareVariableService, private cartService: CartService) {
  }


  ngOnInit() {
    this.getCartNumber();
    this.events.subscribe('getCart', () => {
      this.getCartNumber();
    });
    this.events.subscribe('choiseAddress', (address) => {
      this.shippingAddress = address;
    });
    this.events.subscribe('choiseBillingAddress', (address) => {
      this.billingAddress = address;
    });

    this.events.subscribe('paymentInfo', (paymentInfo) => {
      this.paymentInfo = paymentInfo;
      this.buttonDisable = true;
    })
  }

  getCartNumber() {
    this.cartList = this.shareVariableService.getCart() ? this.shareVariableService.getCart() : [];
    this.cartNumber = this.cartList === undefined ? 0 : this.cartList.reduce((pre, cur) => {
        return pre + cur["quantity"];
      }, 0);
  }


  ionViewDidEnter() {

  }

  // minus(id:number){
  //   let findResult = this.cartList.find((element)=>{
  //     return element.id == id;
  //   });
  //
  //   if(findResult["quantity"] > 1){
  //     findResult["quantity"]--;
  //   }else{
  //     this.remove(id);
  //   }
  // }

  // remove(id:number){
  //   this.cartList =  this.cartList.filter((element)=>{
  //     return element.id != id;
  //   });
  // }

  add(product) {
    this.shareVariableService.setCart(this.cartService.addItem(this.cartList, product));
    this.events.publish('changeCart');
  }

  minus(product) {
    this.shareVariableService.setCart(this.cartService.minusItem(this.cartList, product));
    this.events.publish('changeCart');
  }

  remove(product) {
    this.shareVariableService.setCart(this.cartService.removeItem(this.cartList, product));
    this.events.publish('changeCart');
  }

  empty(){
    this.shareVariableService.setCart(this.cartService.emptyCart(this.cartList));
    this.events.publish('changeCart');
  }


  getSubTotalFee() {
    this.subtotalFee = 0;
    for (let i in this.cartList) {
      this.subtotalFee += this.cartList[i]["quantity"] * this.cartList[i]["price"];
    }
    return this.subtotalFee;
  }

  SelectPayment() {
    let totalFee = this.subtotalFee + this.shippingFee;
    this.navCtrl.push(Payment, {"amount": totalFee ? "" + totalFee : "0"});
  }

  changeAddress() {
    this.navCtrl.push(ShippingPage);
  }

  changeBillingAddress() {
    this.navCtrl.push(BillingPage);
  }

  submit() {
    let totalFee = (this.subtotalFee + this.shippingFee) ? (this.subtotalFee + this.shippingFee) : 0;
    this.payService.order(this.paymentInfo.nonce, this.cartList,this.billingAddress,this.shippingAddress,this.shareVariableService.getUserInfo()["externalid"]).then((result) => {
      console.log(result);
      let fee = {"subtotalFee": this.subtotalFee, "shippingFee": this.shippingFee, "totalFee": this.subtotalFee+this.shippingFee};
      this.empty();
      this.navCtrl.push(ConfirmationPage, {
        "fee": fee,
        "shippingAddress": this.shippingAddress,
        "paymentInfo": this.paymentInfo
      });
    });
  }

}
