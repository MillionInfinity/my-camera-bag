"use strict";

let firebase = require("./fb-config"),
    db = require("./db-interactions"),
    $ = require("jquery");

let currentUser = {
    uid: null,
    zipCode: null,
    fbID: null
};

// call logout when page loads to avoid currentUser.uid
// db.logOut();
//listen for changed state
firebase.auth().onAuthStateChanged((user) => {
    console.log("onAuthStateChanged", user);
    if (user) {
        currentUser.uid = user.uid;
        console.log("current user Logged in?", currentUser);
    } else {
        currentUser.uid = null;
        currentUser.zipCode = null;
        currentUser.fbID = null;
        console.log("current user NOT logged in:", currentUser);
    }
});


function getUser() {
    return currentUser.uid;
}

function setUser(val) {
    currentUser.uid = val;
}


function getUserObj() {
    return currentUser;
}

function setUserVars(obj) {
    console.log("user.setUserVars: obj", obj);
    return new Promise((resolve, reject) => {
        currentUser.zipCode = obj.zipCode ? obj.zipCode : currentUser.zipCode;
        currentUser.fbID = obj.fbID ? obj.fbID : currentUser.fbID;
        currentUser.uid = obj.uid ? obj.uid : currentUser.uid;
        resolve(currentUser);
    });
}

function showUser(obj) {
    let userDetails = getUserObj();
    console.log("user.showUser: userDetails:", userDetails);
}

function checkUserFB(uid) {
    console.log("uid", uid);
    db.getFBDetails(uid)
        .then((result) => {
            let data = Object.values(result);
            console.log("user: any data?", data.length);
            if (data.length === 0) {
                console.log("need to add this user to FB", data);
                db.addUserFB(makeUserObj(uid))
                    .then((result) => {
                        console.log("user: user added", uid, result.name);
                        let tmpUser = {
                            zipCode: null,
                            fbID: result.name,
                            uid: uid
                        };
                        return tmpUser;
                    }).then((tmpUser) => {
                        return setUserVars(tmpUser);
                    });
            } else {
                console.log("user: already a user", data);
                var key = Object.keys(result);
                data[0].fbID = key[0];
                setUserVars(data[0]);
            }
            //only show once a user is logged in
            $("#zip-container").removeClass("is-hidden");
        });
}


function makeUserObj(uid) {
    let userObj = {
        uid: uid,
        zipCode: null
    };
    return userObj;
}
/////////////////// Login with email and password
function emailRegister() {
    console.log("you clicked register");
    if ($("#email-input").val() != "" && $("#password-input").val() != "") {
        db.createUser({
            email: $("#email-input").val(),
            password: $("#password-input").val()
        })
            .then((userData) => {
                checkUserFB(userData.uid);
            }, (error) => {
                console.log("Error creating user:", error);
            });
    }
}

function emailLogin() {
    console.log("you clicked email login");
    if ($("#email-input").val() != "" && $("#password-input").val() != "") {
        let account = {
            email: $("#email-input").val(),
            password: $("#password-input").val()
        };
        db.loginUser(account)
            .then((userData) => {
                checkUserFB(userData.uid);
            }, (error) => {
                console.log("Error with login:", error);
            });
    }
}


module.exports = {
    checkUserFB,
    emailRegister,
    emailLogin,
    getUser,
    setUser,
    setUserVars,
    getUserObj,
    showUser,
};