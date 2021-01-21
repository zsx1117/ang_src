/**
 * Created by szg on 12/05/2017.
 */
export class ProductModel{
  id:string;
  description:string;
  image:string;
  price:number;
  publishdate:string;
  productpage:string;
  name:string;
  sfid:String;


  constructor(id?: string, description?: string, image?: string, price?: number, publishdate?: string, productpage?: string, name?: string, sfid?:string) {

    this.id = id;
    this.description = description;
    this.image = image;
    this.price = price;
    this.publishdate = publishdate;
    this.productpage = productpage;
    this.name = name;
    this.sfid = sfid;
  }
}
