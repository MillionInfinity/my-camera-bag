"use strict";

console.log("get-gear.js here");

let $ = require('jquery'),
    firebase = require("./fb-config");


function getItems() {   //this method is to get data from firebase
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json?orderBy="itemMake"`
    }).done((allItems) => {
        allItems.forEach(function(item) {
        createItemCards(item);
        });
    });

}


function createItemCards(item) {
    let itemCard = {
        itemMake: item ? item.itemMake : "",
        itemModel: item ? item.itemModel : "",
        itemCategory: item ? item.itemCategory : "",
        itemSubCategory: item ? item.itemSubCategory : "",
        addItemBtnText: item ? "add to my gear" : "",
        addItemBtnId: item ? "save_edit_btn" : "save_new_btn"
    };
    // console.log("itemCard", itemCard);
    let form =
        `<div class="itemCard"><h4 class="list-headline">${itemCard.itemMake} ${itemCard.itemModel}</h4><button id="${itemCard.id}" class="addItem-btn">${itemCard.addItemBtnText}</button></div>`;
    let itemListDiv = document.createElement("div");
    itemListDiv.setAttribute("class", "itemListDiv");
    itemListDiv.innerHTML += form;
    // console.log("item list div", itemListDiv);
    document.getElementById("gear-div").appendChild(itemListDiv);
}


function addItem(itemFormObj) {   //this method is to add data to firebase
    return $.ajax({  // call to firebase
        url: `${firebase.getFBsettings().databaseURL}/items.json`,
        type: 'POST',    // This tells firebase we plan to post data to the json file
        data: JSON.stringify(itemFormObj),
        dataType: 'json'
    }).done((itemID) => {
        console.log("addItem() -> itemID", itemID);
        return itemID;
    });
}



getItems();
createItemCards();

module.exports = { getItems, createItemCards, addItem };
