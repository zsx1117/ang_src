/**
 * Created by szg on 01/03/2017.
 */
import {Validators} from "@angular/forms";
import {PasswordValidators} from "../validator/passwordValidator";
import {EmailValidator} from "../validator/emailValidator";
import {telephoneValidator} from "../validator/telephoneValidator";
export const backGroundUrlsConfig: string[] =[
  'assets/img/loginBG/login-background1.jpg',
  'assets/img/loginBG/login-background2.jpg',
  'assets/img/loginBG/login-background3.jpg',
  'assets/img/loginBG/login-background4.jpg',
  'assets/img/loginBG/login-background5.jpg',
  'assets/img/loginBG/login-background6.jpg',
  'assets/img/loginBG/login-background7.jpg',
];
export const isMobile:boolean = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
export const serverUrl =  {url: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')};
export const FB_APP_ID:string = '423769274642123';
//export const defaultImage:string = "assets/img/system/defaultImage.png";

export const defaultImage:string = "assets/img/system/img_not_found.gif";

export const cardMap = {
  "visa": "assets/img/payment/card_visa.svg",
  "master-card": "assets/img/payment/mastercard.svg",
  "american-express": "assets/img/payment/american_express_card.svg",
  "diners-club": "assets/img/payment/diners_club.svg",
  "discover": "assets/img/payment/discover_network_card.svg",
  "jcb": "assets/img/payment/jcb2.svg",
  "unionpay": "assets/img/payment/UnionPay.svg",
  "maestro": "assets/img/payment/mastro.svg",
  "default":"assets/img/payment/white.svg"
};

export const CHECKMAP = {
  "required": Validators.required,
  "invalidPassword": PasswordValidators.checkPassword,
  "invalidEmail": EmailValidator.checkEmail,
  "invalidTelephonel": telephoneValidator.checkTelephone,
  "mismatchedPasswords": PasswordValidators.matchingPasswords
};

export const DEFAULT_BACKGROUND_IMAGE = "assets/img/system/img_not_found.gif";

export const CHECKERRORSHOWMAP ={
  "required": "is required",
  "invalidPassword": "must be alphanumeric",
  "invalidEmail": "is invalid",
  "invalidTelephonel": "is invalid",
  "mismatchedPasswords": "does not match",
  "minlength":"is not long enough"
};

export const CodeFormMap = {
  "register":1,
  "login":2,
  "support":3,
};

export const MapApiKey = "AIzaSyDJIelrek7H4Ew9PCvbZIQLBZ3HAjkk-p4";
export const MapApiServerKey = "AIzaSyAAVKzdIMeHhJ-Pmdk0LIzQEPKckBzswmM";
