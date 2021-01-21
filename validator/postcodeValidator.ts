/**
 * Created by szg on 26/04/2017.
 */
import {FormGroup, FormControl} from "@angular/forms";

export class PostcodeValidator{
  static checkPostcode (control: FormControl) {
    const regMail: RegExp = /^[0-9]{5}$/;
    let postcode = control.value;
    return regMail.test(postcode)||!postcode? null : {"invalidPostcode": true};
  }

  static checkCity (control:FormControl){
    const regMail:RegExp =/^[a-zA-Z ]+$/;
    let city = control.value;
    return regMail.test(city)||!city? null : {"invalidCity": true};
  }
}
