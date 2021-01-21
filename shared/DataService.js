"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var browser_1 = require("@angular/platform-browser/src/facade/browser");
var config_1 = require("./config");
var DataService = (function () {
    function DataService() {
        this.param = {
            name: 'data.db',
            location: 'default',
        };
        this.db = config_1.isMobile ? this.db = browser_1.window.sqlitePlugin.openDatabase(this.param) : this.db = browser_1.window.openDatabase('dataWeb.db', '1.0', 'database', 1024 * 1024);
    }
    DataService.prototype.operator = function (req) {
        if (this.db) {
            this.db.transaction(function (t) {
                t.executeSql(req);
            });
        }
        else {
            console.log("WebSQL has problem");
        }
    };
    ;
    DataService.prototype.getAll = function (req, callback) {
        if (this.db) {
            this.db.transaction(function (t) {
                t.executeSql(req, [], function (t, results) {
                    callback(results);
                }, null);
            });
        }
        else {
            console.log("WebSQL has problem");
        }
    };
    ;
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
