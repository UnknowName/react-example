import {apiPrefix, AutoLogoutSecond} from './consts';

const axios = require('axios');
const tokenKey = "token";

// 引入调用会导致数据延后到达
export function requestApi(apiPath) {
    axios.get(apiPrefix + apiPath).then((response) => {
        console.log("request api data", response);
        return response.data;
    }).catch(function(error) {
        console.log("failed request", error);
        return ""
    })
}


export function createUUID() {
    const uuid = URL.createObjectURL(new Blob());
    return uuid.substring(uuid.lastIndexOf("/") + 1);
}


export function isLogin() {
    const token = localStorage.getItem(tokenKey);
    if (token === null || token === "") {
        localStorage.removeItem(tokenKey);
        return false;
    }
    const tokenObj = JSON.parse(window.atob(token));
    if (tokenObj === undefined || tokenObj === null) {
        localStorage.removeItem(tokenKey);
        return false;
    }
    const pastTime  = new Date().getTime() - tokenObj["expire"];
    if (pastTime / 1000 > AutoLogoutSecond) {
        localStorage.removeItem(tokenKey);
        return false;
    }
    return true;
}


export function setToken(token) {
    const tokenObj = {"token": token, "expire": new Date().getTime()};
    localStorage.setItem("token", window.btoa(JSON.stringify(tokenObj)));
}


export function getToken() {
    const token = localStorage.getItem("token");
    if (token === null || token === "") {
        return "";
    }
    const tokenObj = JSON.parse(window.atob(token));
    if (tokenObj === undefined || tokenObj === null || tokenObj === "") {
        return ""
    }
    return tokenObj["token"]
}


export function createItem() {

}