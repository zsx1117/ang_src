/**
 * Created by szg on 20/04/2017.
 */

import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Obsersable';
import  'rxjs/add/operator/map';
import {HttpService} from "./httpservice";
import {serverUrl} from '../shared/config'
@Injectable()
export class PayService{
  constructor(public http:HttpService){
    this.http = http;
  }

  getToken(){
    return new Promise(resolve=>{
      this.http.get(serverUrl.url+"/payment/client_token").subscribe(
        data=>{
          resolve(data["_body"]);
        },err=>{
          console.log(err);
          resolve(err);
        }
      );
    });
  }

  sendNonce(nonce:string,amount:number){
    return new Promise(resolve=>{
      this.http.post(serverUrl.url+"/payment/checkout",{"payment_method_nonce":nonce,"amount":amount}).subscribe(
        data=>{
          console.log(data["_body"]);
          resolve(data["_body"]);
        },err=>{
          console.log(err);
          resolve(err);
        }
      );
    })
  }

  order(nonce:string,items:any,billingAddress:any,shippingAddress:any,id:string){
    billingAddress["billingstreet"] = billingAddress["billingaddress1"] + ' ' + billingAddress["billingaddress2"];
    shippingAddress["shippingstreet"] = shippingAddress["shippingaddress1"] + ' ' + shippingAddress["shippingaddress2"];

    return new Promise(resolve=>{
      this.http.post(serverUrl.url+"/order",{"payment_method_nonce":nonce,"userid":id,"order":{"billingAddress":billingAddress,"shippingAddress":shippingAddress,items:items}}).subscribe(
        data=>{
          console.log(data["_body"]);
          resolve(data["_body"]);
        },err=>{
          console.log(err);
          resolve(err);
        }
      );
    });
  }

}
