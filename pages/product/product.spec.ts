import {ReflectiveInjector} from '@angular/core';

import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';

import { MyApp } from '../../app/app.component';
import {productPage} from "./product";

import { LazyLoadImageDirective } from 'ng2-lazyload-image';

import {DataService} from "../../shared/DataService";
import { HttpService } from "../../service/httpservice";
import {CartService} from "../../service/cart-service";
import {ShareVariableService} from "../../service/share-variable-service";

describe('productPage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, productPage, LazyLoadImageDirective],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        DataService,
        HttpService,
        NavController,
        CartService,
        ShareVariableService
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(productPage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof productPage).toBe(true);
  });

});