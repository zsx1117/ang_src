/**
 * Created by szg on 10/03/2017.
 */
"use strict";
var PasswordValidators = (function () {
    function PasswordValidators() {
    }
    PasswordValidators.matchingPasswords = function (g) {
        return g.get('password').value === g.get('confirmPassword').value || !g.get('confirmPassword').value ? null : { "mismatchedPasswords": true };
    };
    PasswordValidators.checkPassword = function (control) {
        var regMail = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
        var password = control.value;
        return !regMail.test(password) && (password && password.length >= 6) ? { "invalidPassword": true } : null;
    };
    return PasswordValidators;
}());
exports.PasswordValidators = PasswordValidators;
