/**
 * Created by szg on 13/03/2017.
 */
import {Injectable} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {errorHandler} from "@angular/platform-browser/src/browser";

import {login} from "../pages/login/login";
import {serverUrl} from '../shared/config';
import {DataService} from "../shared/DataService";
import {HttpService} from "./httpservice";

@Injectable()
export class SignOutService {

  constructor(public http: HttpService, private dataservice: DataService, public alterCtrl: AlertController) {
    this.http = http;
  }

  alterlogOut(nav: NavController) {
    let confirm = this.alterCtrl.create({
      title: "Please relogin",
      message: "Because of the lack of your authentication, you should relogin.ABOUT",
      buttons: [{
        text: 'Agree',
        handler: () => {
          nav.setRoot(login).then().catch(errorHandler);
        }
      }]
    });
    confirm.present().then().catch(errorHandler);

  }

  deleteToken() {
    localStorage.removeItem("token");
    this.dataservice.operator("DELETE FROM token ");
  }

  setDisconnect() {
    this.dataservice.operator("update userInfo set isConnect = 0 where isConnect = 1 ");
  }

  signOut(nav: NavController) {
    // this.signOutRequest().then(() => {
    //   this.alterlogOut(nav);
    //   this.deleteToken();
    //   this.setDisconnect();
    // }).catch((err) => {
    //   console.error(err)
    // });
    this.alterlogOut(nav);
      this.deleteToken();
      this.setDisconnect();
  }

  signOutRequest() {
    return new Promise(resolve => {
      this.http.post(serverUrl.url + '/logout', {}).subscribe(data => {
        if (data.json()){
          resolve(data.json());
        }
      }, err => {
        resolve(err);
      })
    })
  }

}
