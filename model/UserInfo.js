"use strict";
/**
 * Created by szg on 01/03/2017.
 */
var UserInfo = (function () {
    function UserInfo(email, password, isConnect, birthday, id, lastName, firstName, telephone, gender, pictureURL, createdate, externalid) {
        this.isConnect = isConnect ? isConnect : 0;
        this.id = id ? id : null;
        this.email = email;
        this.password = password;
        this.birthday = birthday ? birthday : null;
        this.lastName = lastName ? lastName : null;
        this.firstName = firstName ? firstName : null;
        this.mobilePhone = telephone ? telephone : null;
        this.gender = gender ? gender : null;
        this.pictureURL = pictureURL ? pictureURL : '';
        this.createddate = createdate ? createdate : '';
        this.externalid = externalid ? externalid : "";
    }
    ;
    return UserInfo;
}());
exports.UserInfo = UserInfo;
