"use strict";

let db = require("./get-gear");
let dom = require("./dom-builder");

// // Using the REST API
// function loadItemsToDOM() {
//     console.log("Need to load some items, Bruh");
//     let currentUser = login.getUser();
//     db.getItems(currentUser)  //This loads the current users songs
//         .then((itemData) => {
//             console.log("i got items, Brosef", itemData);
//             /* var idArray = Object.keys(songData);
//             idArray.forEach((key) => {
//               songData[key].id = key;
//             }); */
//             templates.makeSongList(itemData);
//         });
// }

// loadItemsToDOM(); //<--Move to auth section after adding login btn


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
        itemMake: $("#item-Make").val(),
        itemModel: $("#item-Model").val(),
        itemCategory: $("#item-Category").val(),
        itemSubCategory: $("#item-SubCategory").val(),
        manualURL: $("").val(),
        itemDescription: $("").val()
        // uid: login.getUser()
    };
    return itemObj;
}