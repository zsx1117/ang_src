/**
 * Created by szg on 21/03/2017.
 */
export class Utils {

  static clone(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  static  saveImage(path:string){
    let img = new Image();
    img.src = path;
    img.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let dataURL = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
      localStorage.setItem(path,dataURL);
    }
  }

  static getImage(path:string){
    let dataImage = localStorage.getItem(path);
    return "data:image/png;base64," + dataImage;
  }

  static paserArray(array:string[],map:Object ):any[]{
    let result = [];
    for(let i in array){
      if(map[array[i]]){
        result.push(map[array[i]]);
      }else{
        console.log(array[i]);
      }
    }
    return result
  }

  static compare(property:string){
    return (obj1:Object,obj2:Object)=>{
      let value1 = obj1[property];
      let value2 = obj2[property];
      return value1 - value2;
    }
  }

}
