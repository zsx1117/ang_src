/**
 * Created by szg on 24/03/2017.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Obsersable';
import  'rxjs/add/operator/map';

import {serverUrl} from '../shared/config'
import {DataService} from "../shared/DataService";
import {HttpService}from "./httpservice"
import {ProductModel} from "../model/ProductModel";

@Injectable()
export class ProductService {
  constructor(public http: HttpService, private dataservice: DataService) {
    this.http = http;
  }

  getAllProducts() {
    return new Promise(resolve => {
      this.http.get(serverUrl.url + '/products').subscribe(
        data => {
          console.log(JSON.parse(data["_body"]));
          resolve(JSON.parse(data["_body"]));
        }, err => {
          console.log(err);
          resolve(err);
        }
      )
    });
  }

  getPartProducts(items) {
    return new Promise(resolve => {
      this.http.get(serverUrl.url + '/products/limit/' + items).subscribe(
        data => {
          console.log(JSON.parse(data["_body"]));
          resolve(JSON.parse(data["_body"]));
        }, err => {
          console.log(err);
          resolve(err);
        });
    });
  }

  getByPage(page, items) {
    return new Promise(resolve => {
      this.http.get(serverUrl.url + '/products/page/' + page + '/' + items).subscribe(
        data => {
          console.log(JSON.parse(data["_body"]));
          resolve(JSON.parse(data["_body"]));
        }, err => {
          console.log(err);
          resolve(err);
        }
      );
    });
  }

  getProductAmount() {
    return new Promise(resolve => {
      this.http.get(serverUrl.url + '/numberofproducts').subscribe(
        data => {
          console.log(JSON.parse(data["_body"]));
          resolve(JSON.parse(data["_body"])[0]["numberofproducts"]);
        }, err => {
          console.log(err);
          resolve(err);
        }
      )
    });
  }

  id: string;
  description: string;
  image: string;
  price: number;
  publishdate: string;
  productpage: string;
  name: string;


  addOrUpdateProduct(product: ProductModel) {
    this.dataservice.getAll("select * from products where id ='" + product.id + "'", (result) => {
      if (result.rows.length > 0) {
        this.dataservice.operator("update products set description ='" + product.description + "',sfid='" + product.sfid + "',image='" + product.image + "',price='" + product.price + "',publishdate='" + product.publishdate + "',productpage='" + product.productpage + "',name='" + product.name + "'where id='" + product.id + "'");
      } else {
        this.dataservice.operator("INSERT INTO products(id,description,image,price,publishdate,productpage,sfid,name,) VALUES ('" + product.id + "','" + product.description + "','" + product.image + "','" + product.price + "','" + product.publishdate + "','" + product.productpage + "','" + product.sfid + "','" + product.name + "')");
      }
    });
  }


}
