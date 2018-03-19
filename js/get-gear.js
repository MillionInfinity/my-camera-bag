"use strict";

console.log("get-gear.js here");

let $ = require('jquery'),
    firebase = require("./fb-config");


function getItems() {   //this method is to get data from firebase
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/items.json?orderBy="itemMake"`
    }).done((allItems) => {
        return allItems;
        // var objKey = Object.keys(allItems);
        // console.log("object key", objKey);
        // var itemsArray = Object.values(allItems);
        // itemsArray.forEach(function(item) {
        //     createItemCards(item);
        // });
    });

}

// function makeItemList(allItems) {
//     let itemListDiv = document.createElement("div");
//     itemListDiv.setAttribute("class", "itemListDiv, panel, panel-default");
//     for (let item in allItems) {
//         let currentItem = allItems[item],
//             itemListCard = $("div", {class: "item-card-div"}),
//             title = $("<h4/>", {class: "list-headline panel-title card-header"}).text(currentItem.itemMake + " " + currentItem.itemModel),
//             itemCardData = $("<div/>", {class: "cardData"});
         
//         itemListCard.append(
//             `<p>${currentItem.itemDescription}</p>
//             <a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel}Product Manual</a>`);
        
//         $(".itemListDiv").append(itemListCard.append(title));
//         $(".itemListDiv").append(itemListCard.append(itemCardData));
//     }
// }


// function createItemCards(item, itemId) {
//     return new Promise (function (resolve, reject) {
//         let itemCard = {
//             // itemId: item ? item.key : "",
//             itemMake: item ? item.itemMake : "",
//             itemModel: item ? item.itemModel : "",
//             itemCategory: item ? item.itemCategory : "",
//             itemSubCategory: item ? item.itemSubCategory : "",
//             itemManualURL: item ? item.itemManualURL : "",
//             itemDescription: item ? item.itemDescription : "",
//             addItemBtnText: item ? "add to my gear" : "",
//             addItemBtnId: item ? "save_edit_btn" : "save_new_btn"
//         };
//         // console.log("itemCard", itemCard);
//         let form =
//             `<div role="button" data-toggle="collapse" data-target="#div-${itemId}" aria-expanded="false" aria-controls="div-${itemId}" class="itemCard panel-heading"><h4 class="list-headline" "panel-title" "card-header">${itemCard.itemMake} ${itemCard.itemModel}</h4><button id="${itemId}" class="addItem-btn float-right">${itemCard.addItemBtnText}</button></div>
//             <div id="div-${itemId}" class="collapse show" aria-labelledby="div-${itemId}" data-parent="#accordion">
//                 <div class="card-body">
//                     <p>${itemCard.itemDescription}</p>
//                     <a href="${itemCard.itemManualURL}">${itemCard.itemMake} ${itemCard.itemModel}Product Manual</a>
//                 </div>
//             </div> `;
//         resolve(form);
//         // let itemListDiv = document.createElement("div");
//         // itemListDiv.setAttribute("class", "itemListDiv, panel, panel-default");
//         // itemListDiv.setAttribute("id", "${itemCard.itemId}");
//         // itemListDiv.innerHTML += form;
//         // document.getElementById("gear-div").appendChild(itemListDiv);
//     });
// }


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
// createItemCards();

module.exports = { getItems, addItem };
