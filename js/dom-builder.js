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

//MAKE USER ITEM LIST
function makeUserItemList(items) {
    let itemCardDiv = "";
    for (let item in items) {
        let currentItem = items[item];
        itemCardDiv += `<div id="${item}-card" class="itemCard panel panel-default">
                                <div class="panel-heading">
                                <h4 class="list-headline panel-title"><a role="button" data-toggle="collapse" data-target="#collapse-${item}" aria-expanded="true" aria-controls="div-${item}" href="#collapse-${item}">${currentItem.itemMake} ${currentItem.itemModel}</a></h4>
                                <button id="${item}" class="addToBag-btn float-right">add to my bag</button></div>
                                <div id="collapse-${item}" class="panel-collapse collapse in"></div><div class="panel-body"><p>${currentItem.itemDescription}</p>
                                <div><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a></div></div>
                            </div>`; 
    }
    $("#gear-div").html(itemCardDiv);
}

function makeGoodUserItemList(items, userBagList) {
    for (let item in items) {
        let currentItem = items[item];
        let itemCardDiv = `<div id="${item}-card" class="itemCard panel panel-default">
                                <div class="panel-heading">
                                <h4 class="list-headline panel-title"><a role="button" data-toggle="collapse" data-target="#collapse-${item}" aria-expanded="true" aria-controls="div-${item}" href="#collapse-${item}">${currentItem.itemMake} ${currentItem.itemModel}</a></h4>
                                <button id="${item}" type="button" class="btn" data-toggle="modal" data-target="#userItemModal">options</button></div>
                                <div id="collapse-${item}" class="panel-collapse collapse in"><div class="panel-body"><p>${currentItem.itemDescription}</p>
                                <div><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a></div></div>
                            </div>

                        <!-- Modal -->
                            <div class="modal fade" id="userItemModal" tabindex="-1" role="dialog" aria-labelledby="userItemModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="userItemModalLabel">Create A New Item</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form id="userItemModal" class="modal-body">
                                            <select name="Add Item To Bag">
                                                <option value="${userBagList[0]}">${userBagList[0]}</option>
                                                <option value="${userBagList[0]}">${userBagList[0]}</option>
                                            </select>

                                            <label>Item Make:</label><input type="text" name="item-Make" id="itemMake-input"><br>
                                            <label>Item Model:</label><input type="text" name="item-Model" id="itemModel-input"><br>
                                            <label>Item Category</label><input type="text" name="item-Category" id="itemCat-input"><br>
                                            <label>Item SubCategory:</label><input type="text" name="item-SubCategory" id="itemSub-input"><br>
                                            <label>Item Manual/Instructions URL:</label><input type="text" name="manualURL" id="manual-input"><br>
                                            <label>Item Description:</label><input type="text" name="item-Description" id="desc-input"><br>
                                            
                                        </form>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            <button type="submit" id="submitItemBtn" class="btn btn-primary save_new_btn">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

        $("#gear-div").append(itemCardDiv);
    }
}

function makeBagCards(bags) {
    for (let bag in bags) {
        let currentBag = bag[bags];
        let bagCardDiv = `<div id="${currentBag}" class="bagCard><h4 class="bag-title">${currentBag.title}</h4></div>`;

        $("#gear-div").append(bagCardDiv);
    }
}

// function makeUserItemList(allItems) {
//     for (let item in allItems) {
//         let currentItem = allItems[item];
//         let itemCardDiv = `<div id="${item}-card" class="itemCard panel panel-default">
//                                 <div class="panel-heading">
//                                 <h4 class="list-headline panel-title"><a role="button" data-toggle="collapse" data-target="#collapse-${item}" aria-expanded="true" aria-controls="div-${item}" href="#collapse-${item}">${currentItem.itemMake} ${currentItem.itemModel}</a></h4>
//                                 <button id="${item}" class="addItem-btn float-right">add to my gear</button></div>
//                                 <div id="collapse-${item}" class="panel-collapse collapse in"><div class="panel-body"><p>${currentItem.itemDescription}</p>
//                                 <div><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a></div></div>
//                             </div>`;

//         $("#my-gear-div").append(itemCardDiv);
//     }
// }

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


function fillHomeIntro() {
    let homeIntro = `<div id="intro-div"><h1 id="intro-header">Welcome to My Camera Bag</h1>
                        <p id="intro-p">My Camera Bag is a tool for photographers to organize and reference their photography gear. Login with your Google Account and begin sorting your gear into 'camera bags' so you have all the info you need to help you prepare for your photography shoots. Create a different bag for each different type of shoot, scenario, enviorment you work with.</p>
                    </div>`;
    $("#intro-div").append(homeIntro);
}

function fillCreateItemDiv() {
    let createItemDiv = `<div id="createItemDiv">
                            <div id="createItemText">
                                <h2>Create New Item</h2>
                                <p>Is an item you are looking for not in the inventory list? Click the 'Create New Item' button to add an item to the master inventory.</p>
                            </div>
                        <button id="createItem-btn" type="button" class="btn btn-lg" data-toggle="modal" data-target="#myModal">Create New Item</button>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Create A New Item</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form id="createItemModal" class="modal-body">
                                        <label>Item Make:</label><input type="text" name="item-Make" id="itemMake-input"><br>
                                        <label>Item Model:</label><input type="text" name="item-Model" id="itemModel-input"><br>
                                        <label>Item Category</label><input type="text" name="item-Category" id="itemCat-input"><br>
                                        <label>Item SubCategory:</label><input type="text" name="item-SubCategory" id="itemSub-input"><br>
                                        <label>Item Manual/Instructions URL:</label><input type="text" name="manualURL" id="manual-input"><br>
                                        <label>Item Description:</label><input type="text" name="item-Description" id="desc-input"><br>

                                    </form>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="submitItemBtn" class="btn btn-primary save_new_btn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    $("#secondary-div").append(createItemDiv);
}

module.exports = { makeItemList, createItemCards, fillHomeIntro, fillCreateItemDiv, makeUserItemList };
