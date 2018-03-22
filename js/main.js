"use strict";

let db = require("./get-gear"),
    user = require("./user"),
    log = require("./log"),
    my = require("./my-gear"),
    templates = require("./dom-builder");


//LOAD INTRO TO DOM
templates.fillHomeIntro();
templates.fillCreateItemDiv();

//LOAD ALL ITEMS TO DOM
function loadAllItemsToDOM() {
    db.getItems()
        .then((itemData) => {
            templates.makeItemList(itemData);
        });
}

loadAllItemsToDOM();

//LOAD USER ITEMS TO DOM
function loadUserItemsToDOM() {
    db.getMatchedItems()
        .then((result) => {
            templates.makeUserItemList(result);
        });
}

//LOAD ALL BAGS TO DOM
function loadAllBagsToDOM() {
    db.getAllBags()
        .then((data) => {
            templates.makeItemList(data);
        });
}

//LOAD ALL ITEMS TO DOM BUTTON
$(document).on("click", "#all-gear-btn", function () {
    console.log("Browse Gear clicked");
    loadAllItemsToDOM();
});

//Load All Bags To DOM BUTTON
$(document).on("click", "#all-bags-btn", function () {
    console.log("Browse Bags clicked");
    loadAllBagsToDOM();
});


//TEST TEST TEST TEST TEST TEST TEST TEST 
$(document).on("click", "#my-gear-btn", function () {
    console.log("my-gear-btn clicked");
    let dataObj = db.getUserItems()
    .then((dataObj) => {
    let newArr = Object.values(dataObj);
    console.log("newArr", newArr);
    db.getMatchedItems(newArr)
    .then((results) => {
        console.log("all done", results);
        templates.makeModalUserItemList(results);
    })
    .catch((e) => {
        console.log("error", e);
    });
    });
});


//ADD ITEM TO MASTER IVENTORY
$(document).on("click", ".save_new_btn", function () {
    let itemObj = buildItemObj();
    db.addItem(itemObj);
});


//ADD ITEM TO USER INVENTORY
$(document).on("click", ".addItem-btn", function () {
    console.log("this.id", this.id);
    let userItemObj = buildUserItemObj(user.getUser(), this.id);
    db.addUserItem(userItemObj);
});

// ADD ITEM TO USER BAG
$(document).on("click", ".addBagItem-btn", function () {
    console.log("this.id", this.id);
    let userBagObj = buildUserBagObj(user.getUser(), this.id);
    db.addItemtoBag(userBagObj);
});

// DELETE USER ITEM BUTTON
$(document).on("click", ".deleteItem-btn", function () {
    let userItemId = this.id;
    console.log("userItemId", userItemId);
    db.deleteUserItem(userItemId);
});

// BUILD itemObj FROM MODAL FORM DATA
function buildItemObj() {
    let itemObj = {
        itemMake: $("#itemMake-input").val(),
        itemModel: $("#itemModel-input").val(),
        itemCategory: $("#itemCat-input").val(),
        itemSubCategory: $("#itemSub-input").val(),
        manualURL: $("#manual-input").val(),
        itemDescription: $("#desc-input").val()
        // uid: login.getUser()
    };
    return itemObj;
}

//BUILD userItemObj FROM uid and fbID
function buildUserItemObj(uid, fbID) {
    let userItemObj = {
        uid: uid ? uid : "",
        fbID: fbID ? fbID : ""
    };
    return userItemObj;
}


//BUILD userBagObj
function buildUserBagObj(uid, fbID) {
    let userBagObj = {
        uid: uid ? uid : "",
        fbID: fbID ? fbID : ""
    };
    return userBagObj;
}