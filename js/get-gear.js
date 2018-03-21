"use strict";

let $ = require('jquery'),
    user = require("./user"),
    // templates = require('./dom-builder'),
    firebase = require("./fb-config");

let myGearArr = [];

//GET ALL ITEMS FROM FIREBASE
function getItems() { 
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json`
    }).done((allItems) => {
        return allItems;
    });

}

getItems();

//GET allBags
function getAllBags() {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userBags.json`
    }).done((allItems) => {
        return allItems;
    });
}

//GET userBags
function getUserBags(uid) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userBags.json`
    }).done((allItems) => {
        return allItems;
    });

}

//THIS GETS uid AND PASSES TO GET getUserItems WHICH GETS userItems FROM FIREBASE

function getUserItems() {
    let uid = user.getUser();
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems.json?orderBy="uid"&equalTo="${uid}"`
    }).done((allItems) => {
        console.log("users allItems", allItems);
        return allItems;
    });
}


function ajaxCalls(passedItem){
    console.log("passed item", passedItem);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items/${passedItem.fbID}.json?`
    }).done((item) => {
        console.log("users item", item);
        myGearArr.push(item);
        return item;
    });
}


function getMatchedItems(array) {
        console.log("getMatchedItems here", array);
        let promiseArr = [];
        for (var i = 0; i < array.length; i++) {
            console.log("array[i]", array[i]);
            promiseArr.push(ajaxCalls(array[i])); 
        }
        return Promise.all(promiseArr);
}


// getMatchedItems(getUserItems());


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

//THIS ADDS A userItems TO A userBags
function addItemtoBag (userBagObj) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userBags.json`,
        type: 'POST',
        data: JSON.stringify(userBagObj),
        dataType: 'json'
    }).done((userBagObj) => {
        console.log("addItemtoBag() -> itemObj", userBagObj);
        return userBagObj;
    });

}


module.exports = { getItems, addItem, addUserItem, getUserItems, getMatchedItems, addItemtoBag, getAllBags };
