/**
 * Created by szg on 17/05/2017.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "./httpservice";
import {DataService} from "../shared/DataService";
import {Observable} from "rxjs";
import {serverUrl} from "../shared/config";
import {Utils} from "../shared/utils";


@Injectable()
export class CartService {
  constructor(public http: HttpService, private dataservice: DataService) {
    this.http = http;
  }

  updateCart=(data:any)=>{
    return Observable.create(observer=>{
      let status = 'pending';
      let request = this.http.put(serverUrl.url +'/cart/update',data).subscribe(
        data => {
          console.log(data["_body"]);
          status = 'done';
          observer.next(data["_body"]);
          observer.complete();
        }, err => {
          status = 'error';
          console.log(err);
          observer.complete();
        });
      return ()=>{
       if (status == "pending"){
         console.log("Cancel request");
         request.unsubscribe();
       }
      }
    });
  }

  getCart(id){
    return new Promise(resolve => {
      this.http.get(serverUrl.url + '/cart/'+id).subscribe(
        data => {
          console.log(JSON.parse(data["_body"]));
          resolve(JSON.parse(data["_body"]));
        }, err => {
          console.log(err);
          resolve(err);
        }
      )
    });
  }

  addItem(cart:Array<Object>,product){
    let cartIten = cart.find((e)=>{
      return e["id"] == product["id"];
    });
    if(cartIten){
      cartIten["quantity"]++;
    }else{
      let productWithQuantity = Utils.clone(product);
      productWithQuantity["quantity"] = 1;
      cart.push(productWithQuantity);
    }
    return cart;
  }

  minusItem(cart:Array<Object>,product){
    let cartIten = cart.find((e)=>{
      return e["id"] == product["id"];
    });
    if(cartIten["quantity"] !=1 ){
      cartIten["quantity"]--;
    }else{
      cart = cart.filter((e)=>{
        return e["id"] != product["id"]
      });
    }
    return cart;
  }

  removeItem(cart:Array<Object>,product){
    cart = cart.filter(e=>{
      return e["id"] != product["id"];
    });
    return cart;

  }

  emptyCart(cart:Array<Object>){
    cart = [];
    return cart;
  }

}
