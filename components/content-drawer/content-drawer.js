"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ContentDrawer = (function () {
    function ContentDrawer(element, renderer, domCtrl, platform) {
        this.element = element;
        this.renderer = renderer;
        this.domCtrl = domCtrl;
        this.platform = platform;
        this.handleHeight = 50;
        this.bounceBack = true;
        this.thresholdTop = 200;
        this.thresholdBottom = 200;
        this.percentageLeftWhenUp = 35;
        this.percentageLeftWhenDown = 85;
    }
    ContentDrawer.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.options.handleHeight) {
            this.handleHeight = this.options.handleHeight;
        }
        if (this.options.bounceBack) {
            this.bounceBack = this.options.bounceBack;
        }
        if (this.options.thresholdFromBottom) {
            this.thresholdBottom = this.options.thresholdFromBottom;
        }
        if (this.options.thresholdFromTop) {
            this.thresholdTop = this.options.thresholdFromTop;
        }
        if (this.options.percentageLeftWhenUp) {
            this.percentageLeftWhenUp = this.options.percentageLeftWhenUp;
        }
        if (this.options.percentageLeftWhenDown) {
            this.percentageLeftWhenDown = this.options.percentageLeftWhenDown;
        }
        this.renderer.setElementStyle(this.element.nativeElement, 'top', ((this.platform.height() - this.handleHeight) * this.percentageLeftWhenDown / 100) + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'padding-top', this.handleHeight + 'px');
        var hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
        hammer.on('pan', function (ev) {
            _this.handlePan(ev);
        });
    };
    ContentDrawer.prototype.handlePan = function (ev) {
        var _this = this;
        var newTop = ev.center.y;
        var bounceToBottom = false;
        var bounceToTop = false;
        if (this.bounceBack && ev.isFinal) {
            var topDiff = newTop - this.thresholdTop;
            var bottomDiff = (this.platform.height() - this.thresholdBottom) - newTop;
            var topDiffForBounce = topDiff / 6;
            topDiffForBounce >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
        }
        if ((newTop < this.thresholdTop && ev.additionalEvent === "panup") || bounceToTop) {
            this.domCtrl.write(function () {
                _this.renderer.setElementStyle(_this.element.nativeElement, 'transition', 'top 1s');
                _this.renderer.setElementStyle(_this.element.nativeElement, 'top', ((_this.platform.height() - _this.handleHeight) * _this.percentageLeftWhenUp / 100) + 'px');
            });
        }
        else if (((this.platform.height() - newTop) < this.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom) {
            this.domCtrl.write(function () {
                _this.renderer.setElementStyle(_this.element.nativeElement, 'transition', 'top 1s');
                _this.renderer.setElementStyle(_this.element.nativeElement, 'top', ((_this.platform.height() - _this.handleHeight) * _this.percentageLeftWhenDown / 100) + 'px');
            });
        }
        else {
            this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'none');
            if (newTop > 0 && newTop < (this.platform.height() - this.handleHeight)) {
                if (ev.additionalEvent === "panup" || ev.additionalEvent === "pandown") {
                    this.domCtrl.write(function () {
                        _this.renderer.setElementStyle(_this.element.nativeElement, 'top', newTop + 'px');
                    });
                }
            }
        }
    };
    __decorate([
        core_1.Input('options')
    ], ContentDrawer.prototype, "options", void 0);
    ContentDrawer = __decorate([
        core_1.Component({
            selector: 'content-drawer',
            templateUrl: 'content-drawer.html'
        })
    ], ContentDrawer);
    return ContentDrawer;
}());
exports.ContentDrawer = ContentDrawer;
