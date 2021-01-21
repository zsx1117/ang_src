/**
 * Created by szg on 08/06/2017.
 */

import {OnInit, Component} from "@angular/core";
import {ShareVariableService} from "../../service/share-variable-service";
import {Events, NavController} from "ionic-angular";

@Component({
  templateUrl: "profile.html",
  selector: "page-profile",
})
export class ProfilePage implements OnInit{
  userInfo={};
  constructor(private navCtrl: NavController, public events: Events, private shareVariableService: ShareVariableService){

  }

  ngOnInit(){

  }
}
