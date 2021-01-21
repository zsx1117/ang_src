/**
 * Created by szg on 10/03/2017.
 */
import {FormGroup, FormControl} from "@angular/forms";

export class telephoneValidator{
  static checkTelephone (control: FormControl) {
    const regMail: RegExp = /^[0-9]{10}$/;
    let telehone = control.value;
    const regMail2 : RegExp = /^(?!08).*$/;
    return (regMail.test(telehone) && regMail2.test(telehone))||!telehone? null : {"invalidTelephonel": true};
  }
}
