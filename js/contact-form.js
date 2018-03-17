"use strict";

console.log("cotact-form.js here");

// let $ = require('jquery'),
//     firebase = require("firebase/app"),
//     fb = require("./fb-key"),
//     fbData = fb();

// $(document).ready(function () {
//     if ($('#newContact').length > 0) {
//         contactScript('forcontact');
//     }
// });
// //firebase
// function contactScript(value) {
//     var a = {
//         apiKey: fbData.getKey,
//         authDomain: fbData.authDomain,
//         databaseURL: fbData.databaseURL,
//         projectId: "my-camera-bag",
//         storageBucket: "my-camera-bag.appspot.com",
//         messagingSenderId: "120581091919"
//     };
//     firebase.initializeApp(a);
//     var b = firebase.database().ref("messages");
//     $("#newContact").submit(function (a) { $(this), console.log("Submit to Firebase");
//         var c = $("#name").val(),
//             d = $("#email").val(),
//             f = { name: c, email: d };
//         return b.push(f).then(function (a) {
//             $(".sucess").css("display", "block"),
//                 $(".sucess-none").css("display", "none")}), !1
//     })
// }