"use strict";

let db = require("./get-gear"),
    user = require("./user"),
    log = require("./log"),
    templates = require("./dom-builder");


//LOAD HOME PAGE ELEMENTS
templates.fillHomeIntro();
templates.fillCreateItemDiv();

function loadAllItemsToDOM() {
    templates.clearGearDiv();
    db.getItems()
        .then((itemData) => {
            templates.makeItemList(itemData);
        });
}

loadAllItemsToDOM();



//LOAD USER ITEMS TO DOM
function loadUserItemsToDOM() {
    templates.clearGearDiv();
    db.getUserItems()
    .then((result) => {
        templates.makeUserItemList(result);
    });
}

//LOAD USER BAGS TO DOM
function loadUserBagsToDOM() {
    templates.clearGearDiv();
    db.getUserBags()
        .then((result) => {
            templates.makeBagList(result);
        });
}

//LOAD ALL BAGS TO DOM
function loadAllBagsToDOM() {
    templates.clearGearDiv();
    db.getAllBags()
        .then((data) => {
            templates.makeItemList(data);
        });
}

//LOAD ALL ITEMS TO DOM BUTTON LISTENER
$(document).on("click", "#all-gear-btn", function () {
    templates.fillHomeIntro();
    templates.fillCreateItemDiv();
    loadAllItemsToDOM();
});

//Load All Bags To DOM BUTTON
$(document).on("click", "#all-bags-btn", function () {
    loadAllBagsToDOM();
});



//LOAD USER ITEMS (MY GEAR) TO DOM
$(document).on("click", "#my-gear-btn", function () {
    templates.fillMyGearIntro();
    templates.fillCreateUserItemDiv();
    loadUserItemsToDOM();

});

//LOAD USER BAGS LISTENER
$(document).on("click", "#user-bags-btn", function () {
    templates.fillMyBagsIntro();
    templates.fillCreateBagDiv();
    loadUserBagsToDOM();
});


//CREATE ITEM AND ADD TO MASTER IVENTORY LISTENER
$(document).on("click", "#submitItemBtn", function () {
    console.log("create new item clicked");
    let itemObj = buildItemObj();
    console.log("itemObj", itemObj);
    db.addItem(itemObj);
});


//CREATE USER ITEM LISTENER
$(document).on("click", "#submitUserItemBtn", function () {
    let userItemObj = editUserItemObj(user.getUser());
    db.addUserItem(userItemObj);
});

//ADD MASTER INVENTORY ITEM TO USER INVENTORY LISTENER
$(document).on("click", ".addItem-btn", function () {
    let item = db.getSingleItem(this.id)
    .then((item) => {
        let userItemObj = buildUserItemObj(user.getUser(), item);
        db.addUserItem(userItemObj);
    });
});

// ADD ITEM TO USER BAG LISTENER
// $(document).on("click", ".addToBag-btn", function () {
//     let userBagObj = buildUserBagObj(user.getUser(), this.id);
//     db.addItemToBag(userBagObj);
// });

//EDIT ITEM BUTTON LISTENER
$(document).on("click", ".submitEdit-btn", function() {
    let itemObj = editItemObj(this.id);
    console.log("itemObj", itemObj);
    db.editItem(itemObj, this.id);
});

//EDIT USER ITEM BUTTON LISTENER
$(document).on("click", ".submitUserEdit-btn", function () {
    let userItemObj = editUserItemObj(user.getUser(), this.id);
    db.editUserItem(userItemObj, this.id);
});


//DELETE MASTER ITEM BUTTON LISTENER
$(document).on("click", ".deleteItem-btn", function () {
    let itemId = this.id;
    db.deleteItem(itemId);
});

// DELETE USER BAG BUTTON LISTENER
$(document).on("click", ".deletebag-btn", function () {
    let userBagId = this.id;
    db.deleteBag(userBagId);
});

// DELETE USER ITEM BUTTON LISTENER
$(document).on("click", ".deleteUserItem-btn", function () {
    let userItemId = this.id;
    db.deleteUserItem(userItemId);
});


//Create New Item
function buildItemObj() {
    let itemObj = {
        itemMake: $(`#itemMake-input`).val(),
        itemModel: $(`#itemModel-input`).val(),
        itemCategory: $(`#itemCat-input`).val(),
        itemSubCategory: $(`#itemSub-input`).val(),
        itemImageURL: $(`#itemImageURL-input`).val(),
        buyNewURL: $(`#buyNew-input`).val(),
        manualURL: $(`#manual-input`).val(),
        itemDescription: $(`#desc-input`).val()
    };
    return itemObj;
}

//Create Edited Item Object
function editItemObj(fbID) {
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
    return itemObj;
}

//BUILD userItemObj FROM MASTER ITEM
function buildUserItemObj(uid, item) {
    let userItemObj = {
        itemMake: item.itemMake ? item.itemMake : "",
        itemModel: item.itemModel ? item.itemModel : "",
        itemCategory: item.itemCategory ? item.itemCategory : "",
        itemSubCategory: item.itemSubCategory ? item.itemSubCategory : "",
        itemImageURL: item.itemImageURL ? item.itemImageURL : "",
        manualURL: item.manualURL ? item.manualURL : "",
        itemDescription: item.itemDescription ? item.itemDescription : "",
        itemCondition: "",
        itemNotes: "",
        uid: uid ? uid : ""
    };
    return userItemObj;
}

function editUserItemObj(uid, fbID) {
    let userItemObj = {
        itemMake: $(`#${fbID}itemMake-input`).val(),
        itemModel: $(`#${fbID}itemModel-input`).val(),
        itemCategory: $(`#${fbID}itemCat-input`).val(),
        itemSubCategory: $(`#${fbID}itemSub-input`).val(),
        itemImageURL: $(`#${fbID}itemImageURL-input`).val(),
        buyNewURL: $(`#${fbID}buyNew-input`).val(),
        manualURL: $(`#${fbID}manual-input`).val(),
        itemDescription: $(`#${fbID}desc-input`).val(),
        itemCondition: $(`#${fbID}cond-input`).val(),
        itemNotes: $(`#${fbID}notes-input`).val(),
        uid: uid ? uid : ""
    };
    console.log("createUserItemObj userItemObj", userItemObj);
    return userItemObj;
}


//BUILD userBagObj
function buildUserBagObj(uid, fbID, bagID) {
    let userBagObj = {
        uid: uid ? uid : "",
        fbID: fbID ? fbID : "",
        bagID: bagID ? bagID : ""
    };
    return userBagObj;
}

//Build userBagDropdown LISTENER
$(document).on("click", ".dropdown-menu", function () {
    let itemID = this.id;
    templates.makeUserBagDropdown(itemID);
    });


//Get My Bag Items LISTENER
$(document).on("click", ".my-bag-items", function () {
    // templates.fillMyGearIntro();
    // templates.fillCreateUserItemDiv();
    console.log("my-bag-items clicked");
    let dataObj = db.getUserBagItems(this.id)
    .then((dataObj) => {
    let bagItemArr = Object.values(dataObj);
    console.log("newArr", bagItemArr);
    db.getMatchedBagItems(bagItemArr)
    .then((results) => {
        console.log("all done", results);
        templates.makeUserItemList(results);
    })
    .catch((e) => {
        console.log("error", e);
    });
    });
});



//LOAD USER ITEMS TO DOM
// function loadUserItemsToDOM() {
//     db.getMatchedItems()
//         .then((result) => {
//             templates.makeBagCards(result);
//         });
// }

//Get My Gear Button LISTENER
// $(document).on("click", "#my-gear-btn", function () {
//     templates.fillMyGearIntro();
//     templates.fillCreateUserItemDiv();
//     console.log("my-gear-btn clicked");
//     let dataObj = db.getUserItems()
//     .then((dataObj) => {
//     let newArr = Object.values(dataObj);
//     console.log("newArr", newArr);
//     db.getMatchedItems(newArr)
//     .then((results) => {
//         console.log("all done", results);
//         templates.makeModalUserItemList(results);
//     })
//     .catch((e) => {
//         console.log("error", e);
//     });
//     });
// });