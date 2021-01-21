"use strict";
var telephoneValidator = (function () {
    function telephoneValidator() {
    }
    telephoneValidator.checkTelephone = function (control) {
        var regMail = /^[0-9]{10}$/;
        var telehone = control.value;
        var regMail2 = /^(?!08).*$/;
        return (regMail.test(telehone) && regMail2.test(telehone)) || !telehone ? null : { "invalidTelephonel": true };
    };
    return telephoneValidator;
}());
exports.telephoneValidator = telephoneValidator;
