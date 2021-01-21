"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 02/03/2017.
 */
var core_1 = require('@angular/core');
var ShowHideInput = (function () {
    function ShowHideInput(el) {
        this.el = el;
        this.type = "password";
    }
    ShowHideInput.prototype.changeType = function (type) {
        this.type = type;
        this.el.nativeElement.children[0].type = this.type;
    };
    __decorate([
        core_1.HostBinding()
    ], ShowHideInput.prototype, "type", void 0);
    ShowHideInput = __decorate([
        core_1.Directive({
            selector: '[show-hide-input]'
        })
    ], ShowHideInput);
    return ShowHideInput;
}());
exports.ShowHideInput = ShowHideInput;
