"use strict";
/**
 * Created by szg on 01/03/2017.
 */
var forms_1 = require("@angular/forms");
var passwordValidator_1 = require("../validator/passwordValidator");
var emailValidator_1 = require("../validator/emailValidator");
var telephoneValidator_1 = require("../validator/telephoneValidator");
exports.backGroundUrlsConfig = [
    'assets/img/loginBG/login-background1.jpg',
    'assets/img/loginBG/login-background2.jpg',
    'assets/img/loginBG/login-background3.jpg',
    'assets/img/loginBG/login-background4.jpg',
    'assets/img/loginBG/login-background5.jpg',
    'assets/img/loginBG/login-background6.jpg',
    'assets/img/loginBG/login-background7.jpg',
];
exports.isMobile = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
exports.serverUrl = { url: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') };
exports.FB_APP_ID = '423769274642123';
//export const defaultImage:string = "assets/img/system/defaultImage.png";
exports.defaultImage = "assets/img/system/img_not_found.gif";
exports.cardMap = {
    "visa": "assets/img/payment/card_visa.svg",
    "master-card": "assets/img/payment/mastercard.svg",
    "american-express": "assets/img/payment/american_express_card.svg",
    "diners-club": "assets/img/payment/diners_club.svg",
    "discover": "assets/img/payment/discover_network_card.svg",
    "jcb": "assets/img/payment/jcb2.svg",
    "unionpay": "assets/img/payment/UnionPay.svg",
    "maestro": "assets/img/payment/mastro.svg",
    "default": "assets/img/payment/white.svg"
};
exports.CHECKMAP = {
    "required": forms_1.Validators.required,
    "invalidPassword": passwordValidator_1.PasswordValidators.checkPassword,
    "invalidEmail": emailValidator_1.EmailValidator.checkEmail,
    "invalidTelephonel": telephoneValidator_1.telephoneValidator.checkTelephone,
    "mismatchedPasswords": passwordValidator_1.PasswordValidators.matchingPasswords
};
exports.DEFAULT_BACKGROUND_IMAGE = "assets/img/system/img_not_found.gif";
exports.CHECKERRORSHOWMAP = {
    "required": "is required",
    "invalidPassword": "must be alphanumeric",
    "invalidEmail": "is invalid",
    "invalidTelephonel": "is invalid",
    "mismatchedPasswords": "does not match",
    "minlength": "is not long enough"
};
exports.CodeFormMap = {
    "register": 1,
    "login": 2,
    "support": 3,
};
exports.MapApiKey = "AIzaSyDJIelrek7H4Ew9PCvbZIQLBZ3HAjkk-p4";
exports.MapApiServerKey = "AIzaSyAAVKzdIMeHhJ-Pmdk0LIzQEPKckBzswmM";
