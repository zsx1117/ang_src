import {ReflectiveInjector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { mapPage } from './map';

import {MapsAPILoader} from 'angular2-google-maps/core';
import {ShareVariableService} from "../../service/share-variable-service";

import {DataService} from "../../shared/DataService";
import {HttpService} from "../../service/httpservice";

describe('mapPage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, mapPage],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: NavParams, useClass: class { NavParams = jasmine.createSpy("NavParams") }},
        MapsAPILoader,
        ShareVariableService,
        HttpService,
        DataService
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(mapPage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof mapPage).toBe(true);
  });

});
