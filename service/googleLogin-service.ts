/**
 * Created by szg on 04/04/2017.
 */
import {Injectable} from '@angular/core';


import {UserInfo} from "../model/UserInfo";
import {serverUrl} from "../shared/config";
import {HttpService}from "./httpservice"


@Injectable()
export class GoogleLoginService{

  constructor(public http: HttpService) {
    this.http = http;
  }

  checkGoogle(user: UserInfo,token:string) {
    let creds = {"gplusUser": user, "token": token};
    return new Promise(resolve => {
      this.http.post(serverUrl.url + '/gpluslogin', creds).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        }
      },err=>{resolve(err);});
    });
  }

  // checkGoogle(user: UserInfo,token:string) {
  //   return new Promise(resolve=>{
  //     console.log(user);
  //     console.log(token);
  //     let creds = {"user": user, "token": token};
  //     resolve(creds);
  //   });
  // }
}
