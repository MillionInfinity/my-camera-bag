"use strict";

let db = require("./get-gear"),
    user = require("./user"),
    log = require("./log"),
    my = require("./my-gear"),
    templates = require("./dom-builder");


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
    console.log("db", db);
    db.getUserItems()
        .then((itemData) => {
            templates.makeUserItemList(itemData);
        });
}

loadUserItemsToDOM();

//ADD ITEM TO MASTER IVENTORY
$(document).on("click", ".save_new_btn", function () {
    let itemObj = buildItemObj();
    db.addItem(itemObj);
});


//ADD ITEM TO USER INVENTORY
$(document).on("click", ".addItem-btn", function() {
    console.log("this.id", this.id);
    let userItemObj = buildUserItemObj(user.getUser(), this.id);
    db.addUserItem(userItemObj);
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
