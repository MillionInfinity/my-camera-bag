"use strict";

console.log("dom-builder.js is here");

let $ = require('jquery');

function makeItemList(allItems) {
    let itemListDiv = document.createElement("div");
    itemListDiv.setAttribute("class", "itemListDiv, panel-group");
    document.getElementById("gear-div").appendChild(itemListDiv);
    console.log("itemListDiv", itemListDiv);
    for (let item in allItems) {
        console.log("item", item);
        let currentItem = allItems[item],
            itemCardDiv = `<div class="itemCard panel panel-default">`,
            itemCardHead = `<div <h4 class="list-headline panel-heading">${currentItem.itemMake} ${currentItem.itemModel}</h4>
                            <button id="${currentItem.id}" class="addItem-btn float-right">${currentItem.addItemBtnText}</button></div>`,
            itemCardData = `<div class="panel-body"><p>${currentItem.itemDescription}</p>
                            <a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel}Product Manual</a></div>`;
        console.log("itemCardHead", itemCardHead);
        
        $(".itemListDiv").append(itemCardDiv.append(itemCardHead));
        $(".itemListDiv").append(itemCardDiv.append(itemCardData));
    }
}


function createItemCards(item, itemId) {
    return new Promise (function (resolve, reject) {
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
        console.log("itemCard", itemCard);
        let form =
            `<div role="button" data-toggle="collapse" data-target="#div-${itemId}" aria-expanded="false" aria-controls="div-${itemId}" class="itemCard panel-heading"><h4 class="list-headline" "panel-title" "card-header">${itemCard.itemMake} ${itemCard.itemModel}</h4><button id="${itemId}" class="addItem-btn float-right">${itemCard.addItemBtnText}</button></div>
            <div id="div-${itemId}" class="collapse show" aria-labelledby="div-${itemId}" data-parent="#accordion">
                <div class="card-body">
                    <p>${itemCard.itemDescription}</p>
                    <a href="${itemCard.itemManualURL}">${itemCard.itemMake} ${itemCard.itemModel}Product Manual</a>
                </div>
            </div> `;
        console.log("form", form);
        resolve(form);

    });
}

module.exports = { makeItemList, createItemCards};

