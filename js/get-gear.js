"use strict";

let $ = require('jquery'),
    user = require("./user"),
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


//GET A SINGLE ITEM FROM ITEMS
function getSingleItem(fbID) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items/${fbID}.json`
    }).done((item) => {
        return item;
    });
}

//GET A SINGLE USER ITEM FROM USER ITEMS
function getSingleUserItem(fbID) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems/${fbID}.json`
    }).done((item) => {
        return item;
    });
}


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
    uid = user.getUser();
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userBags.json?orderBy="uid"&equalTo="${uid}"`
    }).done((allItems) => {
        console.log("all items in getUserBags", allItems);
        return allItems;
    });
}

//THIS GETS uid AND PASSES TO GET getUserItems WHICH GETS userItems FROM FIREBASE


function getUserItems(uid) {
    uid = user.getUser();
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems.json?orderBy="uid"&equalTo="${uid}"`
    }).done((allItems) => {
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

//THIS ADDS A userItems TO A userBags
function addItemToBag (userBagObj) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userBagItems.json`,
        type: 'POST',
        data: JSON.stringify(userBagObj),
        dataType: 'json'
    }).done((userBagObj) => {
        console.log("addItemtoBag() -> itemObj", userBagObj);
        return userBagObj;
    });

}

function deleteItem(itemId) {
    console.log("delete itemId", itemId);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items/${itemId}.json`,
        method: "DELETE"
    }).done((data) => {
        return data;
    });
}


function deleteUserItem(userItemId) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems/${userItemId}.json`,
        method: "DELETE"
    }).done((data) => {
        return data;
    });
}

function deleteBag(userBagId) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userBags/${userBagId}.json`,
        method: "DELETE"
    }).done((data) => {
        return data;
    });
}


function editItem(itemObj, itemId) {
    console.log("editItem itemObj", itemObj);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items/${itemId}/.json`,
        type: 'PUT',
        data: JSON.stringify(itemObj)
    }).done((data) => {
        return data;
    });
}


function editUserItem(userItemObj, userItemId) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems/${userItemId}/.json`,
        type: 'PUT',
        data: JSON.stringify(userItemObj)
    }).done((data) => {
        return data;
    });
}


function getUserBagItems(bagID) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userBagItems.json?orderBy="bagID"&equalTo="${bagID}"`
    }).done((allItems) => {
        return allItems;
    });
}

function ajaxCalls(passedItem) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userItems/${passedItem.fbID}.json?`
    }).done((item) => {
        myGearArr.push(item);
        return item;
    });
}


function getMatchedBagItems(array) {
    let promiseArr = [];
    for (var i = 0; i < array.length; i++) {
        promiseArr.push(ajaxCalls(array[i]));
    }
    return Promise.all(promiseArr);
}


// getMatchedItems(getUserItems());

module.exports = { getItems, addItem, addUserItem, getUserItems, addItemToBag, getAllBags, deleteUserItem, getSingleItem, deleteItem, editItem, editUserItem, getUserBags, deleteBag, getUserBagItems, getMatchedBagItems, getSingleUserItem };
