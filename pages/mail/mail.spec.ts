import {ReflectiveInjector} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { MailPage } from './mail';

import {AuthService} from "../../service/auth-service";
import {DataService} from "../../shared/DataService";
import {HttpService} from "../../service/httpservice";

describe('MailPage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, MailPage],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        AuthService,
        DataService,
        HttpService,
        NavController,
        { provide: NavParams, useClass: class { NavParams = jasmine.createSpy("NavParams") }}
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailPage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof MailPage).toBe(true);
  });

});