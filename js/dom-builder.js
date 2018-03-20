"use strict";

let $ = require('jquery');

function makeItemList(allItems) {
    for (let item in allItems) {
        let currentItem = allItems[item];
        let itemCardDiv = `<div id="${item}-card" class="itemCard panel panel-default">
                                <div class="panel-heading">
                                <h4 class="list-headline panel-title"><a role="button" data-toggle="collapse" data-target="#collapse-${item}" aria-expanded="true" aria-controls="div-${item}" href="#collapse-${item}">${currentItem.itemMake} ${currentItem.itemModel}</a></h4>
                                <button id="${item}" class="addItem-btn float-right">add to my gear</button></div>
                                <div id="collapse-${item}" class="panel-collapse collapse in"><div class="panel-body"><p>${currentItem.itemDescription}</p>
                                <div><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a></div></div>
                            </div>`;

        $("#gear-div").append(itemCardDiv);
    }
}


function createItemCards(item, itemId) {
    // return new Promise(function (resolve, reject) {
    //     let itemCard = {
    //         // itemId: item ? item.key : "",
    //         itemMake: item ? item.itemMake : "",
    //         itemModel: item ? item.itemModel : "",
    //         itemCategory: item ? item.itemCategory : "",
    //         itemSubCategory: item ? item.itemSubCategory : "",
    //         itemManualURL: item ? item.itemManualURL : "",
    //         itemDescription: item ? item.itemDescription : "",
    //         addItemBtnText: item ? "add to my gear" : "",
    //         addItemBtnId: item ? "save_edit_btn" : "save_new_btn"
    //     };
    //     console.log("itemCard", itemCard);
    //     let form =
    //         `<div role="button" data-toggle="collapse" data-target="#div-${itemId}" aria-expanded="false" aria-controls="div-${itemId}" class="itemCard panel-heading"><h4 class="list-headline" "panel-title" "card-header">${itemCard.itemMake} ${itemCard.itemModel}</h4><button id="${itemId}" class="addItem-btn float-right">${itemCard.addItemBtnText}</button></div>
    //         <div id="div-${itemId}" class="collapse show" aria-labelledby="div-${itemId}" data-parent="#accordion">
    //             <div class="card-body">
    //                 <p>${itemCard.itemDescription}</p>
    //                 <a href="${itemCard.itemManualURL}">${itemCard.itemMake} ${itemCard.itemModel}Product Manual</a>
    //             </div>
    //         </div> `;
    //     console.log("form", form);
    //     resolve(form);

    // });
}


module.exports = { makeItemList, createItemCards };
