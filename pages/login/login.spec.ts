import {ReflectiveInjector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController} from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import { login } from './login';

import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {fakeAsync, tick} from '@angular/core/testing';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';



import {DataService} from "../../shared/DataService";
import {AuthService} from "../../service/auth-service";

import { HttpService } from "../../service/httpservice";
import {ShareVariableService} from "../../service/share-variable-service";
import {QuestionQuestService} from "../../service/question-request-service";


class MockQuestionArray {
  constructor(){
  }

  getQuestionArray(){
    var data = [[
  {
    "controlType": "textbox",
    "key": "email",
    "label": "E-mail",
    "valideCheck": ["required", "invalidEmail"],
    "type": "text",
    "order": 1
  },
  {
    "controlType": "textbox",
    "key": "password",
    "label": "Password",
    "order": 2,
    "type": "password",
    "show": true,
    "valideCheck": ['required'],
  },

  {
    "controlType": "toggle",
    "key": "touchId",
    "label": "touchId",
    "order": 3,
    "color": "dark",
    "value":true
  }

],[
  {
    "controlType": "textbox",
    "key": "email",
    "label": "E-mail",
    "valideCheck": ["required", "invalidEmail"],
    "type": "text",
    "order": 1
  },
  {
    "controlType": "textbox",
    "key": "password",
    "label": "Password",
    "order": 2,
    "type": "password",
    "show": true,
    "valideCheck": ['required'],
  },

  {
    "controlType": "toggle",
    "key": "touchId",
    "label": "touchId",
    "order": 3,
    "color": "dark",
    "value":true
  }

],[
  {
    "controlType": "textbox",
    "key": "email",
    "label": "E-mail",
    "valideCheck": ["required", "invalidEmail"],
    "type": "text",
    "order": 1
  },
  {
    "controlType": "textbox",
    "key": "password",
    "label": "Password",
    "order": 2,
    "type": "password",
    "show": true,
    "valideCheck": ['required'],
  },

  {
    "controlType": "toggle",
    "key": "touchId",
    "label": "touchId",
    "order": 3,
    "color": "dark",
    "value":true
  }

]];
return data;
  }

}

describe('login', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, login],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        DataService,
        AuthService,
        HttpService,
        NavController,
        {provide: ShareVariableService, useClass: MockQuestionArray}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(login);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof login).toBe(true);
  });

});