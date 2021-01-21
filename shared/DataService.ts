/**
 * Created by szg on 03/03/2017.
 */
import {SQLite} from 'ionic-native';
import {Injectable} from '@angular/core';
import {window} from "@angular/platform-browser/src/facade/browser";



import {isMobile} from "./config"
import {errorHandler} from "@angular/platform-browser/src/browser";

@Injectable()
export class DataService {

  param: Object = {
    name: 'data.db',
    location: 'default', // local backup
  };

  db: any = isMobile ? this.db = window.sqlitePlugin.openDatabase(this.param) : this.db = window.openDatabase('dataWeb.db', '1.0', 'database', 1024 * 1024);
  operator(req: string) {
    if (this.db) {
      this.db.transaction((t) => {
        t.executeSql(req);
      });
    } else {
      console.log("WebSQL has problem");
    }
  };

  getAll(req: string, callback: any) {
    if (this.db) {
      this.db.transaction((t) => {
        t.executeSql(req, [], (t, results) => {
          callback(results)
        }, null);
      });
    } else {
      console.log("WebSQL has problem");
    }
  };
}
