"use strict";

let db = require("./get-gear"),
    user = require("./user"),
    log = require("./log"),
    my = require("./my-gear"),
    listen = require("./listeners"),
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
            templates.makeBagCards(result);
        });
}

//LOAD USER BAGS TO DOM
function loadUserBagsToDOM() {
    db.getUserBags()
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

//LOAD ALL ITEMS TO DOM BUTTON LISTENER
$(document).on("click", "#all-gear-btn", function () {
    console.log("Browse Gear clicked");
    templates.fillHomeIntro();
    templates.fillCreateItemDiv();
    loadAllItemsToDOM();
});

//Load All Bags To DOM BUTTON
$(document).on("click", "#all-bags-btn", function () {
    console.log("Browse Bags clicked");
    loadAllBagsToDOM();
});


//Get My Gear Button LISTENER
$(document).on("click", "#my-gear-btn", function () {
    templates.fillMyGearIntro();
    templates.fillCreateUserItemDiv();
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

//LOAD USER BAGS LISTENER LISTENER
$(document).on("click", "#user-bags-btn", function () {
    console.log("Browse Bags clicked");
    templates.fillMyBagsIntro();
    loadUserBagsToDOM();
});


//CREATE ITEM AND ADD TO MASTER IVENTORY LISTENER
$(document).on("click", ".save_new_btn", function () {
    let itemObj = buildItemObj();
    db.addItem(itemObj);
});


//CREATE USER ITEM LISTENER
$(document).on("click", "#submitUserItemBtn", function () {
    let userItemObj = createUserItemObj(user.getUser());
    console.log("userItemObj on click", userItemObj);
    db.addUserItem(userItemObj);
});

//ADD MASTER INVENTORY ITEM TO USER INVENTORY LISTENER
$(document).on("click", ".addItem-btn", function () {
    console.log("this.id", this.id);
    let item = db.getSingleItem(this.id)
    .then((item) => {
        let userItemObj = buildUserItemObj(user.getUser(), item);
        console.log("userItemObj on click", userItemObj);
        db.addUserItem(userItemObj);
    });
});

// ADD ITEM TO USER BAG LISTENER
$(document).on("click", ".addToBag-btn", function () {
    console.log("this.id", this.id);
    let userBagObj = buildUserBagObj(user.getUser(), this.id);
    db.addItemtoBag(userBagObj);
});

//EDIT ITEM BUTTON LISTENER
$(document).on("click", ".submitEdit-btn", function() {
    console.log("edit item this.id", this.id);
    let itemObj = buildItemObj(this.id);
    console.log("itemObj in edit button click", itemObj);
    db.editItem(itemObj, this.id);
});

//DELETE MASTER ITEM BUTTON LISTENER
$(document).on("click", ".deleteItem-btn", function () {
    let itemId = this.id;
    console.log("itemId", itemId);
    db.deleteItem(itemId);
});

// DELETE USER ITEM BUTTON LISTENER
$(document).on("click", ".deleteUserItem-btn", function () {
    let userItemId = Object.keys(this);  //WAS let userItemId = this.id BUT DIDN'T WORK;
    console.log("userItemId", userItemId);
    db.deleteUserItem(userItemId);
});


function buildItemObj(fbID) {
    console.log("buildItemObj fbID", fbID);
    // .then((item) => {
    // console.log(".val", $("#" + ${fbID} + "itemMake-input"));
    let itemObj = {
        itemMake: $(`#${fbID}itemMake-input`).val(),
        itemModel: $(`#${fbID}itemModel-input`).val(),
        itemCategory: $(`#${fbID}itemCat-input`).val(),
        itemSubCategory: $(`#${fbID}itemSub-input`).val(),
        itemImageURL: $(`#${fbID}itemImageURL-input`).val(),
        buyNewURL: $(`#${fbID}buyNew-input`).val(),
        manualURL: $(`#${fbID}manual-input`).val(),
        itemDescription: $(`#${fbID}desc-input`).val()
    };
    console.log("itemObj in buildItemObj", itemObj);
    return itemObj;
}

//BUILD userItemObj FROM uid and fbID
function buildUserItemObj(uid, item) {
    let userItemObj = {
        itemMake: item.itemMake ? item.itemMake : "",
        itemModel: item.itemModel ? item.itemModel : "",
        itemCategory: item.itemCategory ? item.itemCategory : "",
        itemSubCategory: item.itemSubCategory ? item.itemSubCategory : "",
        itemImageURL: item.itemImageURL ? item.itemImageURL : "",
        manualURL: item.manualURL ? item.manualURL : "",
        itemDescription: item.itemDescription ? item.itemDescription : "",
        uid: uid ? uid : ""
    };
    console.log("buildUserItemObj userItemObj", userItemObj);
    return userItemObj;
}

function createUserItemObj(uid) {
    let userItemObj = {
        itemMake: $(`#itemMake-input`).val(),
        itemModel: $(`#itemModel-input`).val(),
        itemCategory: $(`#itemCat-input`).val(),
        itemSubCategory: $(`#itemSub-input`).val(),
        itemImageURL: $(`#itemImageURL-input`).val(),
        buyNewURL: $(`#buyNew-input`).val(),
        manualURL: $(`#manual-input`).val(),
        itemDescription: $(`#desc-input`).val(),
        uid: uid ? uid : ""
    };
    console.log("createUserItemObj userItemObj", userItemObj);
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