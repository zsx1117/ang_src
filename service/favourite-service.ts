/**
 * Created by szg on 22/05/2017.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "./httpservice";
import {Observable} from "rxjs";
import {serverUrl} from "../shared/config";
import {Utils} from "../shared/utils";

@Injectable()
export class FavouriteService{
  constructor(public http:HttpService){
    this.http = http;
  }

  updateFavourite=(data:any)=>{
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

  getFavourite(id){
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

  addItem(favourite:Array<Object>,product){
    let cartIten = favourite.find((e)=>{
      return e["id"] == product["id"];
    });
    if(!cartIten){
      let newProduct = Utils.clone(product);
      favourite.push(newProduct);
    }
    return favourite;
  }

  removeItem(favourite:Array<Object>,product){
    favourite = favourite.filter(e=>{
      return e["id"] != product["id"];
    });
    return favourite;
  }

}
