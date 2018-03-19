"use strict";

console.log("get-gear.js here");

let $ = require('jquery'),
    firebase = require("./fb-config");


function getItems() {   //this method is to get data from firebase
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json?orderBy="itemMake"`
    }).done((allItems) => {
        console.log("allItems", allItems);
        var objKey = Object.keys(allItems);
        console.log("object key", objKey);
        var itemsArray = Object.values(allItems);
        itemsArray.forEach(function(item) {
            createItemCards(item);
        });
    });

}


function createItemCards(item) {
    // var key = Object.keys(item);
    // console.log("object key", key); ******this didn't work******
    let itemCard = {
        // itemId: item ? item.key : "",
        itemMake: item ? item.itemMake : "",
        itemModel: item ? item.itemModel : "",
        itemCategory: item ? item.itemCategory : "",
        itemSubCategory: item ? item.itemSubCategory : "",
        itemManualURL: item ? item.itemManualURL : "",
        itemDescription: item ? item.itemDescription : "",
        addItemBtnText: item ? "add to my gear" : "",
        addItemBtnId: item ? "save_edit_btn" : "save_new_btn"
    };
    // console.log("itemCard", itemCard);
    let form =
        `<div role="button" data-toggle="collapse" data-target="#div-${itemCard.itemId}" aria-expanded="false" aria-controls="div-${itemCard.itemId}" class="itemCard panel-heading"><h4 class="list-headline" "panel-title" "card-header">${itemCard.itemMake} ${itemCard.itemModel}</h4><button id="${itemCard.itemId}" class="addItem-btn float-right">${itemCard.addItemBtnText}</button></div>
        <div id="div-${itemCard.itemId}" class="collapse show" aria-labelledby="div-${itemCard.itemId}" data-parent="#accordion">
            <div class="card-body">
                <p>${itemCard.itemDescription}</p>
                <a href="${itemCard.itemManualURL}">${itemCard.itemMake} ${itemCard.itemModel}Product Manual</a>
            </div>
        </div> `;
    let itemListDiv = document.createElement("div");
    itemListDiv.setAttribute("class", "itemListDiv, panel, panel-default");
    itemListDiv.setAttribute("id", "${itemCard.itemId}");
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
