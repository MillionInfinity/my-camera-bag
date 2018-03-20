"use strict";

console.log("get-gear.js here");

let $ = require('jquery'),
    firebase = require("./fb-config");


function getItems() {   //this method is gets all items from firebase
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json?orderBy="itemMake"`
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
    });
}

getItems();

module.exports = { getItems, addItem };
