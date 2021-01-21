import {Token} from "@angular/compiler";
import {FormModel} from "./FormModel";
/**
 * Created by szg on 01/03/2017.
 */
export class UserInfo implements FormModel{
  gender:number;
  id: number;
  email: string;
  password: string;
  birthday: string;
  lastName:string;
  firstName:string;
  mobilePhone:string;
  pictureURL:string;
  createddate:string;
  isConnect:number;
  externalid:string;

  constructor( email: string, password: string,isConnect?:number, birthday?: string,id?: number,lastName?:string, firstName?:string, telephone?:string,gender?:number,pictureURL?:string,createdate?:string,externalid?:string) {
    this.isConnect = isConnect?isConnect:0;
    this.id = id?id:null;
    this.email = email;
    this.password = password;
    this.birthday = birthday ? birthday : null;
    this.lastName=lastName?lastName:null;
    this.firstName=firstName?firstName:null;
    this.mobilePhone=telephone?telephone:null;
    this.gender = gender?gender:null;
    this.pictureURL = pictureURL?pictureURL:'';
    this.createddate = createdate?createdate:'';
    this.externalid = externalid?externalid:"";
  };
}

