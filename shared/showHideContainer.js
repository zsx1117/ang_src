"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by szg on 06/03/2017.
 */
var core_1 = require('@angular/core');
var showHideInput_1 = require('./directive/showHideInput');
var ShowHideContainer = (function () {
    function ShowHideContainer() {
        this.show = false;
    }
    ShowHideContainer.prototype.toggleShow = function () {
        this.show = !this.show;
        if (this.show) {
            this.input.changeType("text");
        }
        else {
            this.input.changeType("password");
        }
    };
    __decorate([
        core_1.ContentChild(showHideInput_1.ShowHideInput)
    ], ShowHideContainer.prototype, "input", void 0);
    ShowHideContainer = __decorate([
        core_1.Component({ selector: 'show-hide-container',
            template: "<a (click)=\"toggleShow($event)\">show/hide</a>",
            styles: ['.show-hide {padding-right: 16px;}'],
        })
    ], ShowHideContainer);
    return ShowHideContainer;
}());
exports.ShowHideContainer = ShowHideContainer;
