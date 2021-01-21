import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import { MyApp } from './app.component';
import {Facebook} from '@ionic-native/facebook';

import {DataService} from "../shared/DataService";
import {AuthService} from "../service/auth-service";
import { HttpService } from "../service/httpservice";
import {ShareVariableService} from "../service/share-variable-service";



describe('MyApp', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        DataService,
        AuthService,
        HttpService,
        ShareVariableService,
        Facebook
      ]
    })
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

});