"use strict";


let firebase = require("firebase/app"),
    fb = require("./fb-key"),
    fbData = fb();

require("firebase/auth");
require("firebase/database");

var config = {
    apiKey: fbData.apiKey,
    authDomain: fbData.authDomain,
    databaseURL: fbData.databaseURL,
    projectId: "my-camera-bag",
    storageBucket: "my-camera-bag.appspot.com",
    messagingSenderId: "120581091919"
};


firebase.initializeApp(config);

firebase.getFBsettings = () => {
    return config;
};

module.exports = firebase;

