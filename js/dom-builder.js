"use strict";

console.log("dom-builder.js is here");

let $ = require('jquery');
let db = require("./get-gear");

console.log("db", db);

db.getItems()
.then((items) =>{
    makeItemList(items);
});

let makeItemList = (items) => {
    let itemListDiv = document.createElement("div");
    itemListDiv.setAttribute("id", "itemListDiv");
    console.log("getItems with item data", items);
    itemListDiv.innerHTML = items.item.map(db.createItemCards);
    document.getElementById("main-div").appendChild(itemListDiv);
    // document.getElementsByClassName("meetup-button").addEventListener("click", saveMeetup());
};




