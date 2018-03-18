"use strict";

let db = require("./get-gear"),
    user = require("./user"),
    log = require("./log"),
    my = require("./my-gear");


$(document).on("click", ".save_new_btn", function () {
    console.log("click worked");
    let itemObj = buildItemObj();
    db.addItem(itemObj)
        .then((itemID) => {
            console.log("what is from Firebase", itemID);
            console.log("itemObj", itemObj);
            db.createItemCards();
        });
});

// Helper functions for forms stuff. Nothing related to Firebase
// Build a song obj from form data.
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