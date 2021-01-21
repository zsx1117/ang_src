/**
 * Created by szg on 28/03/2017.
 */
import {Injectable} from '@angular/core';


import {UserInfo} from "../model/UserInfo";
import {serverUrl} from "../shared/config";
import {HttpService}from "./httpservice"

@Injectable()
export class FacebookService{

  constructor(public http: HttpService) {
    this.http = http;
  }

  checkFb(user: UserInfo,token:string) {
    let creds = {"user": user, "token": token};
    return new Promise(resolve => {
      this.http.post(serverUrl.url + '/fblogin', creds).subscribe(data => {
        //this.isAuthenticated = this.http.getIsAuthenticated();
        if (data.json()) {    //todo:check
          //todo:the situation failed
          resolve(data.json());
        }
      },err=>{resolve(err);});
    });
  }
}
