"use strict";
/**
 * Created by szg on 21/03/2017.
 */
var Utils = (function () {
    function Utils() {
    }
    Utils.clone = function (obj) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj)
            return obj;
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr))
                    copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };
    Utils.saveImage = function (path) {
        var img = new Image();
        img.src = path;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
            localStorage.setItem(path, dataURL);
        };
    };
    Utils.getImage = function (path) {
        var dataImage = localStorage.getItem(path);
        return "data:image/png;base64," + dataImage;
    };
    Utils.paserArray = function (array, map) {
        var result = [];
        for (var i in array) {
            if (map[array[i]]) {
                result.push(map[array[i]]);
            }
            else {
                console.log(array[i]);
            }
        }
        return result;
    };
    Utils.compare = function (property) {
        return function (obj1, obj2) {
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value1 - value2;
        };
    };
    return Utils;
}());
exports.Utils = Utils;
