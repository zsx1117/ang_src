import {ReflectiveInjector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform} from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { waitMailPage } from './waitmail';

import { LazyLoadImageDirective } from 'ng2-lazyload-image';


import {AuthService} from "../../service/auth-service";
import {HttpService} from "../../service/httpservice";

import {DataService} from "../../shared/DataService";



describe('waitMailPage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, waitMailPage, LazyLoadImageDirective],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        DataService,
        HttpService,
        AuthService,
        NavController,
        {provide: NavParams, useValue: {data: {"token": "token"}}}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(waitMailPage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof waitMailPage).toBe(true);
  });

});