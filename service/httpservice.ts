/**
 * Created by szg on 08/03/2017.
 */
import {Injectable} from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class HttpService extends Http {
  private isAuthenticated:boolean=true;

  private loadPush = new Subject<boolean>();
  private dismissPush = new Subject<boolean>();
  public loadPushObservable = this.loadPush.asObservable();
  public dismissObservable = this.dismissPush.asObservable();

  constructor(backend: XHRBackend, options: RequestOptions) {
    super(backend, options);

  }

  getIsAuthenticated(){
    return this.isAuthenticated;
  }



  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    this.loadPush.next(true);
    let token = localStorage.getItem("token");
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      if (token){
        options.headers.append("Access-Control-Allow-Origin", "*");
        options.headers.set('Authorization', token);
        this.isAuthenticated=true;
      }
    } else{
      if(token){
        url.headers.set('Authorization', token);
        this.isAuthenticated=true;
      }
    }
    console.log(url);
    return super.request(url, options).do(()=>{
      this.dismissPush.next(true);
    }).catch(this.catchAuThError(this,this.isAuthenticated));
  }

  private catchAuThError(self: HttpService,isAuthenticated:boolean) {
    let token = localStorage.getItem("token");
    return (res: Response) => {
      console.log(res);
      isAuthenticated = false;
      if (res.status === 401 || res.status === 403) {
        //todo:add the operation
        console.log(res);
      }
      if (res.status === 404){
        console.log("can not find");
      }
      this.dismissPush.next(true);
      return Observable.throw(res);
    }
  }

}
