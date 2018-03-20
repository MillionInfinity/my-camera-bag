"use strict";

let db = require("./get-gear"),
    user = require("./user"),
    log = require("./log"),
    my = require("./my-gear"),
    templates = require("./dom-builder");


function loadAllItemsToDOM() {
    db.getItems()
        .then((itemData) => {
            templates.makeItemList(itemData);

        });
}

loadAllItemsToDOM();

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

// Helper functions for forms stuff. Nothing related to Firebase
// Build an item obj from form data.
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

function buildUserItemObj(uid, fbID) {
    let userItemObj = {
        uid: uid ? uid : "",
        fbID: fbID ? fbID : ""
    };
    return userItemObj;
}



//This function is to close the create item modal after submit
// $('#submitItemButton').submit(function (e) {
//     e.preventDefault();
//     // Coding
//     $('#IDModal').modal('toggle'); //or  $('#IDModal').modal('hide');
//     return false;
// });