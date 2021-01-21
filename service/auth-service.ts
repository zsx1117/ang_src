/**
 * Created by szg on 28/02/2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Obsersable';
import  'rxjs/add/operator/map';


import {UserInfo} from '../model/UserInfo';
import {serverUrl} from '../shared/config'
import {DataService} from "../shared/DataService";
import {UserInfoDataMock} from "../mock/mockUserInfo"
import {HttpService}from "./httpservice"

@Injectable()
export class AuthService {

  private isAuthenticated: boolean = true;


  constructor(public http: HttpService, private dataservice: DataService) {
    this.http = http;
  }

  getIsAuthenticated():boolean {
    return this.isAuthenticated;
  }

  addOrUpdateUser(user: UserInfo) {
    this.dataservice.getAll("select * from userInfo where email ='" + user.email + "'", (result) => {
      if (result.rows.length > 0) {
        this.dataservice.operator("update userInfo set  externalid ='" + user.externalid + "',id='" + user.id + "', birthday='" + user.birthday+ "', lastName='" + user.lastName+ "', createddate='" + user.createddate+ "', pictureURL='" + user.pictureURL+ "', firstName='" + user.firstName+ "', gender='" + user.gender+ "', mobilePhone='" + user.mobilePhone + "', isConnect=1 where email ='" + user.email+"'");
      } else {
        this.dataservice.operator("INSERT INTO userInfo(email,gender,lastName,firstName,mobilePhone,id,birthday,createddate,pictureURL,externalid,isConnect) VALUES ('" + user.email + "','" + user.gender+ "','" + user.lastName+ "','" + user.firstName+ "','" + user.mobilePhone + "','" + user.id + "','" + user.birthday+ "','"+ user.createddate+ "','" + user.pictureURL + "','" + user.externalid +"',1)");
      }
    });
  }



  authenticate(user: UserInfo) {
    let creds = {"email": user.email, "password": user.password};
    return new Promise(resolve => {
      this.http.post(serverUrl.url + '/login', creds).subscribe(data => {
        //this.isAuthenticated = this.http.getIsAuthenticated();
        if (data.json()) {    //todo:check
          //todo:the situation failed
          resolve(data.json());
        }
      },err=>{resolve(err);});
    });
  }

  registerAuthenticate(user:UserInfo){
    return new Promise(resolve=>{
      this.http.post(serverUrl.url+'/signup',user).subscribe(data=>{
        if (data.json()){
          //todo:the situation failed
          resolve(data.json());
        }
      },err=>{resolve(err);});
      }
    );
  }

  saveToken(token: any) {
    let tokenString = JSON.stringify(token);
    this.dataservice.operator("INSERT INTO token(content) VALUES ('" + tokenString + "')");
    localStorage.setItem("token", tokenString);
    this.isAuthenticated = true;
  }

  getCurrentConnectUser(){
    return new Promise((resolve)=>{
      this.dataservice.getAll("select * from userInfo where isConnect = 1 ",(result)=>{
        if(result.rows.length>0){
          return resolve(result.rows[0]);
        }else{
          return resolve(false);
        }
      });
    });

  }

  connectUser(email:string){
    this.dataservice.operator("update userInfo set isConnect = 1 where email ='" + email+"'" );
  }

  checkToken() {
    let token = localStorage.getItem("token");
    if (token) {
      return token
    } else {
      this.dataservice.getAll("select * from token ", (result) => {
        if (result.rows.length > 0) {
          localStorage.setItem("token", result.rows[0]);
          return result.rows[0];
        } else {
          return false;
        }
      });
    }
  }

  deleteToken() {
    localStorage.removeItem("token");
    this.dataservice.operator("DELETE FROM token ");
  }

  authenticateFake(user: UserInfo) {
    return new Promise(resolve => {
      this.addOrUpdateUser(UserInfoDataMock);
      this.saveToken({token: "token-jwt"});
      resolve(true);
    });
  }

  checkCaptcha(key:string){
    return new Promise(resolve=>{
        this.http.post(serverUrl.url+'/checkCaptcha',{"key":key}).subscribe(data=>{
          if (data.json()){
            //todo:the situation failed
            resolve(data.json());
          }
        },err=>{resolve(err);});
      }
    );
  }


}
