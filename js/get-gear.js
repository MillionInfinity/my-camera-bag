"use strict";

console.log("get-gear.js here");

let $ = require('jquery'),
    firebase = require("./fb-config");

function getItems() {   //this method is to get data from firebase
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json?orderBy="itemMake"`
    }).done((allItems) => {
        console.log("allItems", allItems);
        allItems.forEach(function(item) {
        createItemCards(item);
        });
    });

}

function createItemCards(item) {
    console.log("items", item);
    let itemCard = {
        itemMake: item ? item.itemMake : "",
        itemModel: item ? item.itemModel : "",
        itemCategory: item ? item.itemCategory : "",
        itemSubCategory: item ? item.itemSubCategory : "",
        addItemBtnText: item ? "add to my gear" : "add to my gear",
        addItemBtnId: item ? "save_edit_btn" : "save_new_btn"
    };
    console.log("itemCard", itemCard);
    let form =
        `<h3 class="list-headline">${item.itemMake} ${item.itemModel}</h3>
            <button id="${item.id}" class="addItem-btn">${item.addItemBtnText}</button>`;
    let itemListDiv = document.createElement("div");
    itemListDiv.setAttribute("id", "itemListDiv");
    console.log("getItems with item data", item);
    // itemListDiv.innerHTML = items.item.map(createItemCards);
    document.getElementById("main-div").appendChild(itemListDiv);
}

getItems();

module.exports = { getItems, createItemCards };
