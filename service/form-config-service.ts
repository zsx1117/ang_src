/**
 * Created by szg on 14/04/2017.
 */
import {Injectable} from '@angular/core';

import {serverUrl} from "../shared/config";
import {HttpService}from "./httpservice"

@Injectable()
export class FormConfigService{
  constructor(public http: HttpService) {
    this.http = http;
  }

  sendUuidAndGetForm(uid:string) {
    return new Promise(resolve => {
      console.log(serverUrl.url);
      this.http.post(serverUrl.url + '/getforms',{"udid":uid}).subscribe(
        data => {
          resolve(JSON.parse(data["_body"]));
        },err=>{resolve(err);}
      )
    });
  }
}

