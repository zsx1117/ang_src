import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from '../../app/app.component';
import { HomePage } from './home';


import {DataService} from "../../shared/DataService";
import {AuthService} from "../../service/auth-service";
import { HttpService } from "../../service/httpservice";
import {MapsAPILoader} from 'angular2-google-maps/core';



describe('HomePage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, HomePage],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        StatusBar,
        SplashScreen,
        DataService,
        AuthService,
        HttpService,
        NavController,
        { provide: NavParams, useClass: class { NavParams = jasmine.createSpy("NavParams") }},
        MapsAPILoader
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
  });

});