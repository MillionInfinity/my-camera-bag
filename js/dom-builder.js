"use strict";

let $ = require('jquery');

function makeItemList(allItems) {
    let itemCardDiv;
    for (let item in allItems) {
        let currentItem = allItems[item];
        itemCardDiv = `<div class="itemCard-wrap">
                                <div id="${item}-card" class="itemCard">
                                    <img src="${currentItem.itemImageURL}" class="listImage" alt="${currentItem.itemMake} ${currentItem.itemModel} image">
                                    <h4 class="list-headline">${currentItem.itemMake} ${currentItem.itemModel}</h4>
                                    <button id="${item}" class="addItem-btn btn btn-outline-secondary">Add Item To My Gear</button>
                                    <button id="${item}-infobtn" class="info-btn btn  btn btn-outline-secondary" data-toggle="modal" data-target="#${item}-infoModal">More Info</button>
                                </div>
                            </div>

                            <!-- More Info Modal -->
                            <div class="modal fade modalStyle" id="${item}-infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div class="modal-title" id="exampleModalLabel">
                                            <h4>${currentItem.itemMake} ${currentItem.itemModel}</h4>
                                            <small>Item Category: ${currentItem.itemCategory}: ${currentItem.itemSubCategory}</small>
                                        </div>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                        <img src="${currentItem.itemImageURL}" class="modal-image" alt="${currentItem.itemMake} ${currentItem.itemModel} image">
                                        <h5 class="infoModal-h5">Item Description</h5>
                                        <p>${currentItem.itemDescription}:</p></div>
                                        <a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a>
                                        
                                    </div>
                                        
                                    <div class="modal-footer">
                                        <a type="button" class="btn btn-success" href="${currentItem.buyNewURL}" "target="_blank">Buy New</a>
                                        <button type="button" id="${item}" class="btn btn-danger deleteItem-btn" data-dismiss="modal">Delete</button>
                                        <button id="${item}" data-toggle="modal" data-target="#${item}-editItemModal" class="btn btn-success">Edit Item</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>




                                    <!-- Edit Item Modal -->
                            <div class="modal fade modalStyle" id="${item}-editItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Edit Your Item</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                        <form id="itemModalForm" class="modal-body">

                                            <label>Item Make:</label><input type="text" class="modal-input" name="${currentItem.itemMake}" value="${currentItem.itemMake}" id="${item}itemMake-input"><br>
                                            <label>Item Model:</label><input type="text" class="modal-input" name="${currentItem.itemModel}" value="${currentItem.itemModel}"id="${item}itemModel-input"><br>
                                            <label>Item Category</label><input type="text" class="modal-input" name="${currentItem.itemCategory}" value="${currentItem.itemCategory}" id="${item}itemCat-input"><br>
                                            <label>Item SubCategory:</label><input type="text" class="modal-input" name="${currentItem.itemSubCategory}" value="${currentItem.itemSubCategory}" id="${item}itemSub-input"><br>
                                            <label>Item Image URL:</label><input type="text" class="modal-input" name="${currentItem.itemImageURL}" value="${currentItem.itemImageURL}" id="${item}itemImageURL-input"><br>
                                            <label>Buy New URL:</label><input type="text" class="modal-input" name="${currentItem.buyNewURL}" value="${currentItem.buyNewURL}" id="${item}buyNew-input"><br>
                                            <label>Item Manual/Instructions URL:</label><input type="text" class="modal-input" name="${currentItem.itemManualURL}" value="${currentItem.itemManualURL}" id="${item}manual-input"><br>
                                            <label>Item Description:</label><input type="text" class="modal-input" name="${currentItem.itemDescription}" value="${currentItem.itemDescription}" id="${item}desc-input"><br>
                                            
                                        </form>
                                    <div class="modal-footer">
                                        <button type="button" id="${item}" class="btn btn-secondary deleteItem-btn">Delete</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="${item}" class="btn btn-primary submitEdit-btn" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                                        
                            
                            <!-- Edit Item Modal -->
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

                                            <label>Item Make:</label><input type="text" class="modal-input" name="${currentItem.itemMake}" value="${currentItem.itemMake}" id="${item}-itemMake-input"><br>
                                            <label>Item Model:</label><input type="text" class="modal-input" name="${currentItem.itemModel}" value="${currentItem.itemModel}"id="${item}-itemModel-input"><br>
                                            <label>Item Category</label><input type="text" class="modal-input" name="${currentItem.itemCategory}" value="${currentItem.itemCategory}" id="${item}-itemCat-input"><br>
                                            <label>Item SubCategory:</label><input type="text" class="modal-input" name="${currentItem.itemSubCategory}" value="${currentItem.itemSubCategory}" id="${item}-itemSub-input"><br>
                                            <label>Item Image URL:</label><input type="text" class="modal-input" name="${currentItem.itemImageURL}" value="${currentItem.itemImageURL}" id="${item}-itemImageURL-input"><br>
                                            <label>Item Manual/Instructions URL:</label><input type="text" class="modal-input" name="${currentItem.itemManualURL}" value="${currentItem.itemManualURL}" id="${item}-manual-input"><br>
                                            <label>Item Description:</label><input type="text" class="modal-input" name="${currentItem.itemDescription}" value="${currentItem.itemDescription}" id="${item}-desc-input"><br>
                                            
                                        </form>
                                    <div class="modal-footer">
                                        <button type="button" id="${item}" class="btn btn-secondary deleteItem-btn">Delete Item</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="${item}" class="btn btn-primary submitEdit-btn" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        $("#gear-div").append(itemCardDiv);
    }
    
}

function makeModalUserItemList(items) {
    let itemCardDiv = "";
    for (let item in items) {
        let currentItem = items[item];
        itemCardDiv += `<div class="itemCard-wrap">
                                <div id="${item}-card" class="itemCard">
                                    <img src="${currentItem.itemImageURL}" class="listImage" alt="${currentItem.itemMake} ${currentItem.itemModel} image">
                                    <h4 class="list-headline">${currentItem.itemMake} ${currentItem.itemModel}</h4>
                                    <button id="${item}" class="addToBag-btn btn btn-outline-secondary">Add Item To Camera Bag</button>
                                    <button id="${item}-infobtn" class="info-btn btn btn-outline-secondary" data-toggle="modal" data-target="#${item}-userInfoModal">More</button>
                                </div>
                            </div>

                        <!-- Modal -->
                            <div class="modal fade modalStyle" id="${item}-userInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <button type="button" id="${item}" class="btn btn-danger deleteUserItem-btn">Delete Item</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="submitItemBtn" class="btn btn-primary save_new_btn" data-dismiss="modal">Save Changes</button>
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

        $("#gear-div").html(bagCardDiv);
    }
}


function fillHomeIntro() {
    let homeIntro = `<div id="intro-div"><h1 id="intro-header">Welcome to My Camera Bags</h1>
                        <p id="intro-p">My Camera Bags is a tool for photographers to organize and reference their photography gear. Login with your Google Account and begin sorting your gear into 'camera bags' so you have all the info you need to help you prepare for your photography shoots. Create a different bag for each different type of shoot, scenario, enviorment you work with.</p>
                    </div>`;
    $("#intro-div").html(homeIntro);
}

function fillMyGearIntro() {
    let myGearIntro = `<div id="intro-div"><h1 id="intro-header">My Gear</h1>
                        <p id="intro-p">This is your master inventory of your personal gear. Organize your gear by adding items to bags that you create.</p>
                    </div>`;
    $("#intro-div").html(myGearIntro);
}

function fillMyBagsIntro() {
    let myBagsIntro = `<div id="intro-div"><h1 id="intro-header">My Bags</h1>
                        <p id="intro-p">You can have as many bags as you want. Add equipment to your bags and refer back to them later.</p>
                    </div>`;
    $("#intro-div").html(myBagsIntro);
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

    

module.exports = { makeItemList, fillHomeIntro, fillCreateItemDiv, userItemForm, makeModalUserItemList, fillMyBagsIntro, fillMyGearIntro };
