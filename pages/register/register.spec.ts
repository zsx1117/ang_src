import {ReflectiveInjector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { register } from './register';

import {AuthService} from "../../service/auth-service";
import {DataService} from "../../shared/DataService";
import { HttpService } from "../../service/httpservice";
import {ShareVariableService} from "../../service/share-variable-service";

class MockNavParams {
  data;
     constructor(){
        this.data = {
     token: "token"
     };
       return this.data;
     }
}


describe('register', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, register],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        DataService,
        AuthService,
        HttpService,
        NavController,
        ShareVariableService,
        {provide: NavParams, useValue: {data: {"token": "token"}}}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(register);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof register).toBe(true);
  });

});