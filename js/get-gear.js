"use strict";

console.log("get-gear.js here");

let $ = require('jquery'),
    user = require("./user"),
    firebase = require("./fb-config");


function getItems() {   //this method is gets all items from firebase
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json`
    }).done((allItems) => {
        return allItems;
    });

}


function addItem(itemFormObj) {   //this method is to add an item to the master inventory in firebase
    return $.ajax({ 
        url: `${firebase.getFBsettings().databaseURL}/items.json`,
        type: 'POST', 
        data: JSON.stringify(itemFormObj),
        dataType: 'json'
        }).done((itemID) => {
        console.log("addItem() -> itemID", itemID);
        return itemID;
    //can I do a .then reload data?? run getItems again?
    // }).then function getItems(allItems) {
    //     console.log("got items again", allItems)
    // }
    });
}


getItems();


//THIS NEEDS WORK
// function getUserItems(uid) {
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/userItems/.json?equalto="uid"`
//     }).done((allItems) => {
//         return allItems;
//     });
// }



function addUserItem(userItemObj) {   //this method is to add an item to the master inventory in firebase
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems.json`,
        type: 'POST',
        data: JSON.stringify(userItemObj),
        dataType: 'json'
    }).done((itemID) => {
        console.log("addUserItem() -> itemID", itemID);
        return itemID;
    });
}


module.exports = { getItems, addItem, addUserItem };
