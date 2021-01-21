import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { WalkThroughPage } from './walkthrough';

import {Facebook} from '@ionic-native/facebook';


import {AuthService} from "../../service/auth-service";
import {DataService} from "../../shared/DataService";
import {HttpService} from "../../service/httpservice";
import {AngularFireModule} from 'angularfire2';

describe('WalkThroughPage', () => {
  let fixture;
  let component;



  beforeEach(async(() => {

        const firebaseConfig = {
  apiKey: "AIzaSyDlHJFW-HkRgI_UV8oTC_U4vwEu1MvDxGU",
  authDomain: "edfxecommerce.firebaseapp.com",
  databaseURL: "https://edfxecommerce.firebaseio.com",
  projectId: "edfxecommerce",
  storageBucket: "edfxecommerce.appspot.com",
  messagingSenderId: "909023812440"
};

    TestBed.configureTestingModule({
      declarations: [MyApp,WalkThroughPage],
      imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      providers: [
        AuthService,
        DataService,
        Facebook,
        HttpService,
        NavController

      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkThroughPage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof WalkThroughPage).toBe(true);
  });

});