import {Injectable} from "@angular/core";
@Injectable()
export class $localstorage {
  constructor() {
  }
  set(key,value){
    localStorage.setItem(key, value);
  }
  get(key,defaultValue){
    return localStorage.getItem(key)?localStorage.getItem(key):defaultValue;
  }
  setObject(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }
  getObject(key){
    let result = JSON.parse(localStorage.getItem(key));
    return result?result:null;
  }
  removeItem(key){
    localStorage.removeItem(key);
  }
}
