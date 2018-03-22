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
        return allItems;
    });
}


function ajaxCalls(passedItem){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items/${passedItem.fbID}.json?`
    }).done((item) => {
        myGearArr.push(item);
        return item;
    });
}


function getMatchedItems(array) {
        let promiseArr = [];
        for (var i = 0; i < array.length; i++) {
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

function deleteUserItem(userItemId) {
    console.log("delete userItemId", userItemId);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems/${userItemId}.json`,
        method: "DELETE"
    }).done((data) => {
        return data;
    });
}

function editUserItem(userItemObj, userItemId) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems/${userItemId}.json`,
        type: 'PUT',
        data: JSON.stringify(userItemObj)
    }).done((data) => {
        return data;
    });
}


module.exports = { getItems, addItem, addUserItem, getUserItems, getMatchedItems, addItemtoBag, getAllBags, deleteUserItem };
