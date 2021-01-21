import {AuthService} from './auth-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Obsersable';
import  'rxjs/add/operator/map';


import {UserInfo} from '../model/UserInfo';
import {serverUrl} from '../shared/config'
import {UserInfoDataMock} from "../mock/mockUserInfo"
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response,
  RequestMethod
} from '@angular/http';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing/mock_backend';

import {ReflectiveInjector} from '@angular/core';

import { fakeAsync, async, inject, TestBed } from '@angular/core/testing';

import { MyApp } from '../app/app.component';

import {DataService} from "../shared/DataService";
import { HttpService } from "../service/httpservice";


const mockResponse = {
  "user": {
    "firstname": "afuf",
    "lastname": "afif",
    "email": "afif@afif.com",
    "externalid": "j14x5x45",
    "isverified": true,
    "mobilephone": "0654567654",
    "birthday": "2014-12-31T23:00:00.000Z",
    "gender": "1",
    "pictureurl": null,
    "createddate": "2017-04-05T09:57:50.000Z",
    "preference": null,
    "size": null,
    "sfid": "0032400001720muAAA",
    "avoir": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTE1MDI1MDUsImVtYWlsIjoiYWZpZkBhZmlmLmNvbSIsInB3ZCI6IiQyYSQxMCQ3YWsycGdoRVYvLnU1VHlNV09oYjBlb2VSaXljMW5hYkJCRGowV2lVczh4VWNnbDltSjBVRyIsImlhdCI6MTQ5MzczNjEwNX0.3jd3tvoHuQjBaFS1JRxknEUIxljm45SvzXFh8j_v364"
};

describe('AuthService', () => {
  let fixture;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        DataService,
        HttpService,
        AuthService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
  }));

  it ('should be created with the right default values', fakeAsync(
    inject([
      DataService,
      HttpService,
      AuthService
    ], (dataservice: DataService, http: HttpService, auth: AuthService) => {
    expect(auth.getIsAuthenticated()).toEqual(true);
    expect(auth.http).toEqual(http);
    })
  ));

  it ('should call http backend and get user data in return', fakeAsync(
    inject([
      DataService,
      HttpService,
      XHRBackend,
      AuthService
    ], (dataservice: DataService, http: HttpService, mockBackend: XHRBackend, auth: AuthService) => {

      const user = {"gender": 0, "id": 0, "birthday":"", "lastName":"", "firstName":"", "mobilePhone":"", "pictureURL":"", "createddate":"", "isConnect":0, "externalid":"", "email": "email", "password": "password"};
      const expectedUrl = serverUrl.url + '/login';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });

      auth.authenticate(user)
        .then((res) => {
          expect(res).toEqual(mockResponse);
        });

    })
  ));

  it ('should call http backend and save user data in frontend database', fakeAsync(
    inject([
      DataService,
      HttpService,
      XHRBackend,
      AuthService
    ], (dataservice: DataService, http: HttpService, mockBackend: XHRBackend, auth: AuthService) => {

      const user = {"gender": 0, "id": 0, "birthday":"", "lastName":"", "firstName":"", "mobilePhone":"", "pictureURL":"", "createddate":"", "isConnect":0, "externalid":"", "email": "email", "password": "password"};

      auth.addOrUpdateUser(user);

      dataservice.getAll("select * from userInfo where email = \'eail\' ",(result)=>{
        expect(result.rows.length).toEqual(1);
      });
    })
  ));

});