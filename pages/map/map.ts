/**
 * Created by szg on 15/03/2017.
 */
import {Component} from '@angular/core';
import {NavParams, Events} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import { NavController } from 'ionic-angular';

import {MapsAPILoader} from 'angular2-google-maps/core';
import {ShareVariableService} from "../../service/share-variable-service";
import {Utils} from "../../shared/utils";
import {LatLngBounds} from "angular2-google-maps/core";
import {CartPage} from "../cart/cart";
import {StoreService} from "../../service/store-service";
declare const google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [StoreService]
})
export class mapPage {
  map: any;
  stores : any;
  drawerOptions: any;
  lat: any;
  lng: any;
  mapBounds:LatLngBounds;
  condition=[];

  constructor(private navParams: NavParams,public events: Events, private _loader: MapsAPILoader, private shareVariableService : ShareVariableService,private storeService:StoreService) {
    this.map = {
      lat: 0,
      lng: 0,
      zoom: 15
    };
    this.loadMap();

    this.drawerOptions = {
      handleHeight: 30,
      thresholdFromBottom: 0,
      thresholdFromTop: 0,
      bounceBack: true,
      percentageLeftWhenUp: 35,
      percentageLeftWhenDown: 90
    };
  }

  ionViewWillEnter(){
    this.stores = Utils.clone(this.shareVariableService.getShopLocation());
    if(this.stores){
      for(let i= 0;i<this.stores.length;i++){
        this.stores[i]["index"] = String.fromCharCode(97 + i);
      }
      this.stores = this.setPosition(this.stores);
      this.getCurrentPoint().then((pointNow)=>{
        if(pointNow){
          this.stores = this.setDistanceAndSort(this.stores,pointNow);
          this.getFitBounds(this.stores,pointNow)
        }
      });
    }
  }

  goCart(){
    this.events.publish('changePage',CartPage);
  }


  setDistanceAndSort(stores,nowPlace){
    for (let i in stores) {
        stores[i]["distance"] =google.maps.geometry.spherical.computeDistanceBetween(nowPlace,stores[i]["position"]);
    }
    stores = stores.sort(Utils.compare("distance"));
    console.log(stores);
    return stores;
  }

  setPosition(stores:Array<Object>){
    for (let i in stores) {
        stores[i]["position"] = new google.maps.LatLng(this.stores[i]["lat"],this.stores[i]["lng"]);
    }
    return stores;
  }


  getFitBounds(stores:Array<Object> ,pointNow:any){
    // this.getSame(stores,3);
    this._loader.load().then(()=>{
      this.mapBounds = new google.maps.LatLngBounds();
      this.mapBounds.extend(pointNow);
      this.getClosestStore(stores,4);
      this.condition.forEach((e)=>{
      this.mapBounds.extend(e["position"]);

      });
    });
  }

  getCurrentPoint(){
    return new Promise(resolve=>{
      Geolocation.getCurrentPosition().then((position)=>{
        this.lat = this.map.lat = position.coords.latitude;
        this.lng = this.map.lng = position.coords.longitude;
        let now =  new google.maps.LatLng(this.lat, this.lng);
        resolve(now);
      },(err)=>{
        console.log(err);
        resolve(false);
      }).catch(err=>console.log(err));
    });
  }

  /**find the stores in the same ville,department or region
   *
   * @param stores
   * @param number 1:ville, 2:department, 3:region
   */
  getSame(stores:Array<Object>,number:number){
    let PromiseArray=[];
    let city={"city":""};
    PromiseArray.push(this.storeService.getCityByCoordinate(this.lat,this.lng,city,number));
    stores.forEach((e)=>{
      PromiseArray.push(this.storeService.getCityByCoordinate(e["lat"],e["lng"],e,number));
    });
    Promise.all(PromiseArray).then((data)=>{
      this.condition = stores.filter((e)=>{
        return e["city"] == city.city;
      });
      console.log(this.condition);
      }
    );
  }

  /**get serval closest stores;
   *
   * @param stores
   * @param number number of stores you want
   */

  getClosestStore(stores:Array<Object>,number:number){
    this.condition = stores.slice(0,number);
  }

  /**get stores whose distance is less than number;
   *
   * @param stores
   * @param distance
   */

  getStoresByDistance(stores:Array<Object>,distance:number){
    this.condition = stores.filter((e)=>{
      return e["distance"] < distance;
    })
  }




  loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.map = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        //zoom: 8,
        zoom:13,
        options: {}
      };
    }).catch(err=>console.log(err));
  }

}
