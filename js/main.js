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


//ADD ITEM TO MASTER IVENTORY LISTENER
$(document).on("click", ".save_new_btn", function () {
    let itemObj = buildItemObj();
    db.addItem(itemObj);
});


//ADD ITEM TO USER INVENTORY LISTENER
$(document).on("click", ".addItem-btn", function () {
    console.log("this.id", this.id);
    let userItemObj = buildUserItemObj(user.getUser(), this.id);
    console.log("userItemObj on click", userItemObj);
    db.addUserItem(userItemObj);
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

// BUILD itemObj FROM MODAL FORM DATA
// function buildItemObj(fbID) {
//     console.log("buildItemObj fbID", fbID);
//     let item;
//     // .then((item) => {
//     let itemObj = {
//         itemMake: item.itemMake ? item.itemMake : $("#itemMake-input").val(),
//         itemModel: item.itemModel ? item.itemModel : $("#itemModel-input").val(),
//         itemCategory: item.itemCategory ? item.itemCategory : $("#itemCat-input").val(),
//         itemSubCategory: item.itemSubCategory ? item.itemSubCategory : $("#itemSub-input").val(),
//         itemImageURL: item.itemImageURL ? item.itemImageURL : $("#imageURL-input").val(),
//         buyNewURL: item.buyNewURL ? item.buyNewURL : $("#buyNew-input").val(),
//         manualURL: item.manualURL ? item.manualURL : $("#manual-input").val(),
//         itemDescription: item.itemDescription ? item.itemDescription : $("#desc-input").val()
//     };
//     console.log("itemObj in buildItemObj", itemObj);
//     return itemObj;
// }

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
function buildUserItemObj(uid, fbID) {
    console.log("fbID in buildUserItemObj", fbID); //This is the correct Id for the item I want
    let item = db.getSingleItem(fbID);  //This is where I'm not getting what I need!!!
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