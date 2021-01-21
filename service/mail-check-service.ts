/**
 * Created by szg on 22/03/2017.
 */
import {Injectable} from '@angular/core';

import {HttpService}from "./httpservice"
import {serverUrl} from '../shared/config'

@Injectable()
export class MailCheckService {
  constructor(public http: HttpService) {
    this.http = http;
  }

  signUpCheck(email:string,externalid:string){
    return new Promise(resolve=>{
      this.http.get(serverUrl.url+'/isUserVerified?'+"email=" + email+"&&externalid="+externalid).subscribe(data=>{
        if (data.json()) {
          resolve(data);
        }
      }, err => {
        resolve(err);
      });
    });
  }

  changeCheckMail(info: Object) {
    return new Promise(resolve => {
      this.http.post(serverUrl.url + '/changeunverifiedemail', info).subscribe(data => {
        if (data.json()) {    //todo:check
          resolve(data.json());
        }
      }, err => {
        resolve(err);
      });
    });
  }

  resendCheckMail(email: string,externalid:string) {
    return new Promise(resolve => {
      this.http.get(serverUrl.url + '/resendverificationemail?' + "email=" + email+"&&externalid="+externalid).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        }
      }, err => {
        resolve(err);
      });
    });
  }


}
