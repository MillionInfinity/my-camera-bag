"use strict";

let $ = require('jquery');

function makeItemList(allItems) {
    for (let item in allItems) {
        let currentItem = allItems[item];
        let itemCardDiv = `<div class="itemCard-wrap">
                                <div id="${item}-card" class="itemCard">
                                <img src="${currentItem.itemImageURL}" class="listImage" alt="${currentItem.itemMake} ${currentItem.itemModel} image">
                                <h4 class="list-headline panel-title"><a role="button" data-toggle="collapse" data-target="#collapse-${item}" aria-expanded="true" aria-controls="div-${item}" href="#collapse-${item}">${currentItem.itemMake} ${currentItem.itemModel}</a></h4>
                                <button id="${item}" class="deleteItem-btn btn-sm btn btn-outline-secondary">delete item</button>
                                <button id="${item}" class="addItem-btn btn btn-sm btn-outline-secondary">add to my gear</button></div>
                                <div id="collapse-${item}" class="panel-collapse collapse in"><div class="panel-body">
                                <br><p>${currentItem.itemDescription}</p>
                                <div><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a></div>
                                <button id="${item}" data-toggle="modal" data-target="#editItemModal"class="btn btn-outline-light">edit item</button></div>
                                </div>
                            </div>
                            
                            <!-- Modal -->
                            <div class="modal fade modalStyle" id="editItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Edit Your Item</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                        <form id="itemModalForm" class="modal-body">

                                            <label>Item Make:</label><input type="text" class="modal-input" name="${currentItem.itemMake}" value="${currentItem.itemMake}" id="itemMake-input"><br>
                                            <label>Item Model:</label><input type="text" class="modal-input" name="${currentItem.itemModel}" value="${currentItem.itemModel}"id="itemModel-input"><br>
                                            <label>Item Category</label><input type="text" class="modal-input" name="${currentItem.itemCategory}" value="${currentItem.itemCategory}" id="itemCat-input"><br>
                                            <label>Item SubCategory:</label><input type="text" class="modal-input" name="${currentItem.itemSubCategory}" value="${currentItem.itemSubCategory}" id="itemSub-input"><br>
                                            <label>Item Manual/Instructions URL:</label><input type="text" class="modal-input" name="${currentItem.itemManualURL}" value="${currentItem.itemManualURL}" id="manual-input"><br>
                                            <label>Item Description:</label><input type="text" class="modal-input" name="${currentItem.itemDescription}" value="${currentItem.itemDescription}" id="desc-input"><br>
                                            
                                        </form>
                                    <div class="modal-footer">
                                        <button type="button" id="${item}" class="btn btn-secondary deleteItem-btn">Delete</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="${item}" class="btn btn-primary submitEdit-btn" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        $("#gear-div").append(itemCardDiv);
    }
}

//MAKE USER ITEM LIST
// function makeUserItemList(items) {
//     let itemCardDiv = "";
//     for (let item in items) {
//         let currentItem = items[item];
//         itemCardDiv += `<div id="${item}-card" class="itemCard panel panel-default">
//                                 <div class="panel-heading">
//                                 <h4 class="list-headline panel-title"><a role="button" data-toggle="collapse" data-target="#collapse-${item}" aria-expanded="true" aria-controls="div-${item}" href="#collapse-${item}">${currentItem.itemMake} ${currentItem.itemModel}</a></h4>
//                                 <button id="${item}" type="button" class="btn btn-outline-light float-right" data-toggle="modal" data-target="#userItemModal">Edit</button></div>
//                                 <div id="collapse-${item}" class="panel-collapse collapse in"><div class="panel-body"><p>${currentItem.itemDescription}</p>
//                                 <div><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a></div></div></div>
//                             </div>`; 
//     }
//     $("#gear-div").html(itemCardDiv);
// }

function makeModalUserItemList(items) {
    let itemCardDiv = "";
    for (let item in items) {
        let currentItem = items[item];
        itemCardDiv += `<div id="${item}-card" class="itemCard panel panel-default">
                            <div class="panel-heading">
                            <h4 class="list-headline panel-title"><a role="button" data-toggle="collapse" data-target="#collapse-${item}" aria-expanded="true" aria-controls="div-${item}" href="#collapse-${item}">${currentItem.itemMake} ${currentItem.itemModel}</a></h4>
                            <button id="${item}" type="button" class="btn options-btn btn-outline-light float-right" data-toggle="modal" data-target="#myEditItemModal">options</button></div>
                            <div id="collapse-${item}" class="panel-collapse collapse in"><div class="panel-body"><p>${currentItem.itemDescription}</p>
                            <div><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a></div></div></div>
                        </div>

                        <!-- Modal -->
                            <div class="modal fade modalStyle" id="myEditItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Edit Your Item</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                        <form id="userItemModalForm" class="modal-body">

                                            <label>Item Make:</label><input type="text" class="modal-input" name="${currentItem.itemMake}" value="${currentItem.itemMake}" id="itemMake-input"><br>
                                            <label>Item Model:</label><input type="text" class="modal-input" name="${currentItem.itemModel}" value="${currentItem.itemModel}"id="itemModel-input"><br>
                                            <label>Item Category</label><input type="text" class="modal-input" name="${currentItem.itemCategory}" value="${currentItem.itemCategory}" id="itemCat-input"><br>
                                            <label>Item SubCategory:</label><input type="text" class="modal-input" name="${currentItem.itemSubCategory}" value="${currentItem.itemSubCategory}" id="itemSub-input"><br>
                                            <label>Item Manual/Instructions URL:</label><input type="text" class="modal-input" name="${currentItem.itemManualURL}" value="${currentItem.itemManualURL}" id="manual-input"><br>
                                            <label>Item Description:</label><input type="text" class="modal-input" name="${currentItem.itemDescription}" value="${currentItem.itemDescription}" id="desc-input"><br>
                                            <label>User Notes:</label><input type="text" class="modal-input" name="user-notes" id="desc-input"><br>
                                            
                                        </form>
                                    <div class="modal-footer">
                                        <button type="button" id="${item}" class="btn btn-secondary deleteUserItem-btn">Delete</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="submitItemBtn" class="btn btn-primary save_new_btn" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        $("#gear-div").html(itemCardDiv);
    }
}

function makeBagCards(bags) {
    for (let bag in bags) {
        let currentBag = bag[bags];
        let bagCardDiv = `<div id="${currentBag}" class="bagCard><h4 class="bag-title">${currentBag.title}</h4></div>`;

        $("#gear-div").append(bagCardDiv);
    }
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
                        <button id="createItem-btn" type="button" class="btn btn-lg btn btn-outline-secondary" data-toggle="modal" data-target="#EditItem">Create New Item</button>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade modalStyle" id="EditItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <label>Item Image URL:</label><input type="text" name="imageURL" id="imageURL-input"><br>
                                        <label>Item Manual/Instructions URL:</label><input type="text" name="manualURL" id="manual-input"><br>
                                        <label>Item Description:</label><input type="text" name="item-Description" id="desc-input"><br>

                                    </form>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="submitItemBtn" class="btn btn-primary save_new_btn" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    $("#secondary-div").append(createItemDiv);
}

function userItemForm(item, itemId) {
    return new Promise(function (resolve, reject) {
        let userItemObject = {
            // itemId: item ? item.key : "",
            itemMake: item ? item.itemMake : "",
            itemModel: item ? item.itemModel : "",
            itemCategory: item ? item.itemCategory : "",
            itemSubCategory: item ? item.itemSubCategory : "",
            itemManualURL: item ? item.itemManualURL : "",
            itemDescription: item ? item.itemDescription : "",

            // addItemBtnText: item ? "add to my gear" : "",
            // addItemBtnId: item ? "save_edit_btn" : "save_new_btn"
        };
        console.log("useritemObject", userItemObject);
        return userItemObject;
    });
}
        
        // let form =
        //     `<div role="button" data-toggle="collapse" data-target="#div-${itemId}" aria-expanded="false" aria-controls="div-${itemId}" class="itemCard panel-heading"><h4 class="list-headline" "panel-title" "card-header">${userItemObject.itemMake} ${userItemObject.itemModel}</h4><button id="${itemId}" class="addItem-btn float-right">${userItemObject.addItemBtnText}</button></div>
        //     <div id="div-${itemId}" class="collapse show" aria-labelledby="div-${itemId}" data-parent="#accordion">
        //         <div class="card-body">
        //             <p>${userItemObject.itemDescription}</p>
        //             <a href="${userItemObject.itemManualURL}">${userItemObject.itemMake} ${userItemObject.itemModel}Product Manual</a>
        //         </div>
        //     </div> `;
        // console.log("form", form);
        // resolve(form);

    

module.exports = { makeItemList, fillHomeIntro, fillCreateItemDiv, userItemForm, makeModalUserItemList };
