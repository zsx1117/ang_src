"use strict";
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.checkEmail = function (control) {
        var regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var email = control.value;
        return regMail.test(email) || !email ? null : { "invalidEmail": true };
    };
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
