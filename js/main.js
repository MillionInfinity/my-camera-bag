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


//Get My Gear Button
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

//EDIT ITEM BUTTON
$(document).on("click", ".editItem-btn", function() {
    console.log("edit item this.id", this.id);
    let itemObj = buildItemObj(this.id);
    console.log("itemObj in edit button click", itemObj);
    db.editItem(itemObj, this.id);
});

//DELETE MASTER ITEM BUTTON
$(document).on("click", ".deleteItem-btn", function () {
    let itemId = this.id;
    console.log("itemId", itemId);
    db.deleteItem(itemId);
});

// DELETE USER ITEM BUTTON
$(document).on("click", ".deleteUserItem-btn", function () {
    let userItemId = this.id;
    console.log("userItemId", userItemId);
    db.deleteUserItem(userItemId);
});

// BUILD itemObj FROM MODAL FORM DATA
function buildItemObj(fbID) {
    console.log("buildItemObj fbID", fbID);
    let item = db.getSingleItem(fbID);
    // .then((item) => {
    console.log("buildItemObj item", item);
    let itemObj = {
        itemMake: item.itemMake ? item.itemMake : $("#itemMake-input").val(),
        itemModel: item.itemModel ? item.itemModel : $("#itemModel-input").val(),
        itemCategory: item.itemCategory ? item.itemCategory : $("#itemCat-input").val(),
        itemSubCategory: item.itemSubCategory ? item.itemSubCategory : $("#itemSub-input").val(),
        itemImageURL: item.itemImageURL ? item.itemImageURL : $("#imageURL-input").val(),
        manualURL: item.manualURL ? item.manualURL : $("#manual-input").val(),
        itemDescription: item.itemDescription ? item.itemDescription : $("#desc-input").val()
    };
    return itemObj;
}

//BUILD userItemObj FROM uid and fbID
function buildUserItemObj(uid, fbID) {
    console.log("fbID", fbID);
    let item = db.getSingleItem(fbID);
    console.log("item in build user", item);
    let userItemObj = {
        itemMake: item.itemMake ? item.itemMake : "",
        itemModel: item.itemModel ? item.itemModel : "",
        itemCategory: item.itemCategory ? item.itemCategory : "",
        itemSubCategory: item.itemSubCategory ? item.itemSubCategory : "",
        itemImageURL: item.itemImageURL ? item.itemImageURL : "",
        manualURL: item.manualURL ? item.manualURL : "",
        itemDescription: item.itemDescription ? item.itemDescription : "",
        uid: uid ? uid : "",
        fbID: fbID ? fbID : ""
    };
    console.log("buildUserItemObj userItemObj", userItemObj);
    return userItemObj;
}


let itemTest = {};
itemTest = db.getSingleItem();
console.log("itemTest", itemTest);

//BUILD userBagObj
function buildUserBagObj(uid, fbID) {
    let userBagObj = {
        uid: uid ? uid : "",
        fbID: fbID ? fbID : ""
    };
    return userBagObj;
}