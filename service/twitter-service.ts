/**
 * Created by szg on 07/04/2017.
 */
import {Injectable} from '@angular/core';


import {UserInfo} from "../model/UserInfo";
import {serverUrl} from "../shared/config";
import {HttpService}from "./httpservice"


@Injectable()
export class TwitterService{

  constructor(public http: HttpService) {
    this.http = http;
  }

  // checkTwitter(user: UserInfo,token:string) {
  //   let creds = {"gplusUser": user, "token": token};
  //   return new Promise(resolve => {
  //     this.http.post(serverUrl.url + '/twitterlogin', creds).subscribe(data => {
  //       if (data.json()) {
  //         resolve(data.json());
  //       }
  //     },err=>{resolve(err);});
  //   });
  // }

  checkTwitter(user: UserInfo,token:string) {
    return new Promise(resolve=>{
      console.log(user);
      console.log(token);
      let creds = {"user": user, "token": token};
      resolve(creds);
    });
  }

  sendCredial(accessToken:string,secret:string) {
    return new Promise(resolve => {
      console.log(accessToken);
      console.log(secret);
      let creds = {"accessToken": accessToken, "secret": secret};
      resolve(creds);
    });
  }

  checkAndAddTwitter(user: UserInfo, accessToken: string, secret: string) {
    let creds = {"twitterUser": user, "token": accessToken, "secret": secret};
    return new Promise(resolve => {
      this.http.post(serverUrl.url + '/twitterlogin', creds).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        }
      }, err => {
        resolve(err);
      });
    })
  }
}
