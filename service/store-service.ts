/**
 * Created by szg on 20/03/2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Obsersable';
import  'rxjs/add/operator/map';

import {serverUrl, MapApiKey, MapApiServerKey} from '../shared/config'
import {DataService} from "../shared/DataService";
import {HttpService}from "./httpservice"
import {Http} from "@angular/http";

@Injectable()
export class StoreService{
  constructor(public http: HttpService, private dataservice: DataService,private httpOrgin:Http) {
    this.http = http;
  }

  getStore() {
    return new Promise(resolve => {
      this.http.get(serverUrl.url + '/stores').subscribe(
        data => {
          console.log(JSON.parse(data["_body"]));
          resolve(JSON.parse(data["_body"]));
        },err=>{resolve(err);}
      )
    });
  }

  getAndSetCityBycoordinate(store:Object){
    return new Promise(resolve => {
      this.http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+store["lat"] + "," + store["lng"]+'&sensor=true').subscribe(data=>{
        store["city"] = data["results"]["address_components"][2]["long_name"];
        resolve(true);
      });
    })
  }

  getCityByCoordinate(lat:number,lng:number,store:Object,number){
    return new Promise(resolve=>{
      this.httpOrgin.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat + "," + lng+'&sensor=true').subscribe(data=>{
        console.log(JSON.parse(data["_body"]));
        store["city"]=JSON.parse(data["_body"])["results"][0]["address_components"][number+1]["long_name"];
        console.log(store["city"]);
        resolve(store["city"]);
      });
    });
}


}
