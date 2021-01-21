/**
 * Created by szg on 14/04/2017.
 */
import {Injectable} from "@angular/core";
import {Utils} from "../shared/utils";

@Injectable()
export class ShareVariableService{
  private _FormConfig;
  private _QuestionArray;
  private _shopLocation;
  private _userInfo;
  private _cart;
  private _favourite;

  getFavourite(){
    return this._favourite;
  }

  setFavourite(value){
    this._favourite = value;
  }

  getCart(){
    return this._cart;
  }

  setCart(value){
    this._cart = value;
  }


  getUserInfo(){
    return this._userInfo;
  }

  setUserInfo(value){
    this._userInfo = value;
  }

  getShopLocation(){
    return this._shopLocation;
  }

  setShopLocation(value){
    this._shopLocation = value;
  }


  getQuestionArray() {
    return this._QuestionArray;
  }

  setQuestionArray(value) {
    this._QuestionArray = value;
  }

  getFormConfig() {
    return this._FormConfig;
  }

  setFormConfig(value) {
    this._FormConfig = value;
  }
}
