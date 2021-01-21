/**
 * Created by szg on 10/03/2017.
 */

import {FormGroup, FormControl} from "@angular/forms";

export class PasswordValidators{

  static matchingPasswords(g:FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ||  !g.get('confirmPassword').value?  null:{"mismatchedPasswords": true}
  }



  static checkPassword(control: FormControl) {
    const regMail: RegExp = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
    let password = control.value;
    return !regMail.test(password)&&(password&&password.length>=6) ?  {"invalidPassword": true}:null;
  }
}



