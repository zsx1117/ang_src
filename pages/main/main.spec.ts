import {ReflectiveInjector} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { MainPage } from './main';

import {DataService} from "../../shared/DataService";
import {SignOutService} from "../../service/sign-out-service";

import { HttpService } from "../../service/httpservice";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {CartService} from "../../service/cart-service";
import {ShareVariableService} from "../../service/share-variable-service";

describe('MainPage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, MainPage],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        DataService,
        HttpService,
        NavController,
        SignOutService,
        { provide: NavParams, useClass: class { NavParams = jasmine.createSpy("NavParams") }},
        CartService,
        ShareVariableService
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof MainPage).toBe(true);
  });

});