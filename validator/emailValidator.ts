/**
 * Created by szg on 01/03/2017.
 */
import {FormControl} from '@angular/forms';

export class EmailValidator {
  static checkEmail(control: FormControl) {
    const regMail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = control.value;
    return regMail.test(email)||!email ? null : {"invalidEmail": true};
  }
}
