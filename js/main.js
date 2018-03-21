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

// let userItemsArr;
// let allItemsArr;

// function loadUserItemsArr() {
//     db.getUserItems()
//     .then((itemData) => {
//         var userItemsArr = Object.values(itemData); //converts the object of objects (itemData) into an array of objects
//         console.log("userItemsArr", userItemsArr);
//         return userItemsArr;
//     });
// }

// loadUserItemsArr();

// function getAllItemsArr() {
//     db.getItems()
//         .then((result) => {
//             var allItemsArr = Object.values(result);
//             console.log("allItemsArr", allItemsArr);
//             return allItemsArr;
//         });
// }

// getAllItemsArr();

function compareItems(arrayName) {
    return function (item, fbID) {
        return arrayName.includes(fbID);
    };
}


function loadUserItemsToDOM() {
    db.getUserItems()
        .then((itemData) => {
            var userItemsArr = Object.values(itemData); //converts the object of objects (itemData) into an array of objects
            console.log(".then userItemsArr", userItemsArr);
            return userItemsArr;
        })
        .then(() => {
            db.getItems()
                .then((result) => {
                    var allItemsArr = Object.values(result);
                    console.log(".then allItemsArr", allItemsArr);
                    return allItemsArr;
                });
        })
        .then(() => {
            // let matchedItems = userItemsArr.filter(compareItems(allItemsArr));

        });
        // .then(() => {
        //     userItemsArr.forEach(function(item) {
        //         console.log("item", item);
        //         console.log("item.fbID forEach", item.fbID);
        //         if (item.fbID === allItemsArr.fbID) {
        //             db.getMatchedItems(item.fbID);
        //         } else console.log("not a match", item.fbID);
        //  });
    
}


$(document).on("click", "#my-gear-btn", function () {
    console.log("my-gear-btn clicked");
    loadUserItemsToDOM();
});

$(document).on("click", "#test-btn", function () {
    console.log("test-btn clicked");
    let allItems;
    db.getItems();
    console.log("testall", allItems);
});

// function loadUserItemsToDOM() {
//     db.getUserItems()
//         .then((itemData) => {
//             console.log("load to dom item data", itemData);
//             templates.makeItemList(itemData);
//         });
// }
// $(document).on("click", "#my-gear-btn", function (){
//     console.log("my-gear-btn clicked");
//     loadUserItemsToDOM();
// });


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
