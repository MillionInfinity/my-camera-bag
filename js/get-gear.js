"use strict";

let $ = require('jquery'),
    user = require("./user"),
    firebase = require("./fb-config");


//GET ALL ITEMS FROM FIREBASE
function getItems() { 
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json`
    }).done((allItems) => {
        return allItems;
    });

}

getItems();


//THIS GETS uid AND PASSES TO GET getUserItems WHICH GETS userItems FROM FIREBASE
// let uid = user.getUser();

function getUserItems() {
    let uid = user.getUser();
    console.log("getUserItems uid", uid);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems.json?orderBy="uid"&equalTo="${uid}"`
    }).done((allItems) => {
        console.log("users allItems", allItems);
        return allItems;
    });
}

getUserItems();

function getMatchedItems(fbID) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json?orderBy="fbId"&equalTo="${fbID}"`
    }).done((allItems) => {
        console.log("users allItems", allItems);
        return allItems;
    });
}


//THIS ADDS AN ITEM TO THE MASTER INVENTORY items IN FIREBASE
function addItem(itemFormObj) {   
    return $.ajax({ 
        url: `${firebase.getFBsettings().databaseURL}/items.json`,
        type: 'POST', 
        data: JSON.stringify(itemFormObj),
        dataType: 'json'
        }).done((itemID) => {
        return itemID;
    //can I do a .then reload data?? run getItems again?
    // }).then function getItems(allItems) {
    //     console.log("got items again", allItems)
    // }
    });
}

//THIS ADDS A userItem TO FIREBASE
function addUserItem(userItemObj) {   
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


module.exports = { getItems, addItem, addUserItem, getUserItems, getMatchedItems };
