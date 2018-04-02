"use strict";

let $ = require('jquery'),
        db = require('./get-gear');


function clearGearDiv() {
    let blankDiv = `<div></div>`;
    $("#gear-div").html(blankDiv);
}

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
                                        <p>${currentItem.itemDescription}</p></div>
                                        <h5>Product Manual</h5><p><a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Manual</a></p>
                                        
                                    </div>
                                        
                                    <div class="modal-footer">
                                        <a type="button" class="buy-btn" href="${currentItem.buyNewURL}" "target="_blank">Buy New</a>
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
                        </div>`;

        $("#gear-div").append(itemCardDiv);
    }
    
}


function makeUserItemList(allItems) {
    let userItemCardDiv;
    for (let item in allItems) {
        let currentItem = allItems[item];
        userItemCardDiv = `<div class="itemCard-wrap">
                                <div id="${item}-card" class="itemCard">
                                    <img src="${currentItem.itemImageURL}" class="listImage" alt="${currentItem.itemMake} ${currentItem.itemModel} image">
                                    <h4 class="list-headline">${currentItem.itemMake} ${currentItem.itemModel}</h4>
                                    <button id="${item}-infobtn" class="info-btn btn  btn btn-outline-secondary" data-toggle="modal" data-target="#${item}-infoModal">More Info</button>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add To Camera Bag</button>
                                        <div class="dropdown-menu" id="${item}" aria-labelledby="dropdownMenuButton">
                                            
                                        </div>
                                    </div>
                                    
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
                                        <a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a>
                                        <h5 class="infoModal-h5">User Notes</h5>
                                        <p>${currentItem.userNotes}
                                        <h5 class="infoModal-h5">Item Description</h5>
                                        <p>${currentItem.itemDescription}:</p></div>
                                        
                                    </div>
                                        
                                    <div class="modal-footer">
                                        <button type="button" id="${item}" class="btn btn-danger deleteUserItem-btn" data-dismiss="modal">Delete Item</button>
                                        <button id="${item}" data-toggle="modal" data-target="#${item}-editUserItemModal" class="btn btn-success">Edit Item</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                     
                                    <!-- Edit User Item Modal -->
                            <div class="modal fade modalStyle" id="${item}-editUserItemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            <label>Item Condition:</label><input type="text" class="modal-input" name="${currentItem.itemCondition}" id="${item}cond-input"><br>
                                            <label>User Notes:</label><input type="text" class="modal-input" name="${currentItem.itemNotes}" id="${item}notes-input">

                                        </form>

                                    <div class="modal-footer">
                                        <button type="button" id="${item}" class="btn btn-danger deleteUserItem-btn">Delete</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="${item}" class="btn btn-success submitUserEdit-btn" data-dismiss="modal">Save Changes</button>
                                    </div>
                                </div>
                            </div>

                                                  <!-- Add Item to User Bag -->
                            <div class="modal fade modalStyle" id="${item}addToBagModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Add Item To Bag</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <h4>Add Your ${currentItem.itemMake} ${currentItem.itemModel} To A Bag List</h4>
                                        <div class="selectBagList">

                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        $("#gear-div").append(userItemCardDiv);
    }

}
{/* <button id="${item}" class="addToBag-btn btn btn-outline-secondary" data-toggle="modal" data-target="#${item}addToBagModal">Add to Camera Bag</button> */}

function makeBagList(bags) {
    console.log("bags", bags);
    for (let bag in bags) {
        let currentBag = bags[bag];
        let bagCardDiv = `<div class="itemCard-wrap">
                                <div id="${bag}-card" class="bagCard">
                                <img src="/img/my-camera-bag-logo-sm.png" class="bagCardLogo" alt="camera bag image">
                                    <h4 class="bag-headline">${currentBag.title}</h4>
                                    <p class="bagCardContents">Bag Card Contents Here: </p>
                                    <div class="bagCardFooter">
                                        <button id="${bag}" class="my-bag-items btn btn-outline-secondary">View Bag Items</button><br>
                                        <button id="${bag}-infobtn" class="info-btn btn  btn btn-outline-secondary" data-toggle="modal" data-target="#${bag}-infoModal">More Info</button>
                                    </div>
                                </div>
                            </div>

                            <!-- More Info Modal -->
                            <div class="modal fade modalStyle" id="${bag}-infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div class="modal-title" id="exampleModalLabel">
                                            <h4>${currentBag.title}</h4>
                                        </div>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <img src="${currentBag.bagImageURL}" class="modal-image" alt="camera bag image">
                                            <h5 class="infoModal-h5">Bag Contents</h5>
                                        </div>
                                    </div>
                                        
                                    <div class="modal-footer">
                                        <button type="button" id="${bag}" class="btn btn-danger deletebag-btn" data-dismiss="modal">Delete Bag</button>
                                        <button id="${bag}" data-toggle="modal" data-target="#${bag}-editbagModal" class="btn btn-success">Edit Bag</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>

                                    <!-- Edit bag Modal -->
                            <div class="modal fade modalStyle" id="${bag}-editbagModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Edit Your Bag</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                        <form id="bagModalForm" class="modal-body">

                                            <label>bag Make:</label><input type="text" class="modal-input" name="${currentBag.title}" value="${currentBag.title}" id="${bag}bagTitle-input"><br>
                                            <label>bag Category</label><input type="text" class="modal-input" name="${currentBag.bagCategory}" value="${currentBag.bagCategory}" id="${bag}bagCat-input"><br>
                                            <label>bag SubCategory:</label><input type="text" class="modal-input" name="${currentBag.bagSubCategory}" value="${currentBag.bagSubCategory}" id="${bag}bagSub-input"><br>
                                            <label>bag Description:</label><input type="text" class="modal-input" name="${currentBag.bagDescription}" value="${currentBag.bagDescription}" id="${bag}bagDesc-input"><br>
                                            
                                        </form>
                                    <div class="modal-footer">
                                        <button type="button" id="${bag}" class="btn btn-secondary deletebag-btn">Delete Bag</button>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="${bag}" class="btn btn-primary submitBagEdit-btn" data-dismiss="modal">Submit Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        $("#gear-div").append(bagCardDiv);
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

function fillCreateUserItemDiv() {
    let createUserItemDiv = `<div id="createItemDiv">
                            <div id="createItemText">
                                <h2>Create Your Own Items</h2>
                                <p>Is an item you are looking for not in the master inventory list? Click the 'Create User Item' button to create an item just for you and store it in your personal inventory, 'My Gear'.</p>
                            </div>
                        <button id="createUserItem-btn" type="button" class="btn btn-lg btn btn-outline-secondary" data-toggle="modal" data-target="#EditUserItem">Create User Item</button>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade modalStyle" id="EditUserItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Create Your Item</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form id="createUserItemModal" class="modal-body">
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
                                        <button type="submit" id="submitUserItemBtn" class="btn btn-primary save_new_btn" data-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    $("#secondary-div").html(createUserItemDiv);
}

function fillMyBagsIntro() {
    let myBagsIntro = `<div id="intro-div"><h1 id="intro-header">My Bags</h1>
                        <p id="intro-p">You can have as many bags as you want. Add equipment to your bags and refer back to them later.</p>
                    </div>`;
    $("#intro-div").html(myBagsIntro);
}

function fillCreateBagDiv() {
    let createBagDiv = `<div id="createBagDiv">
                            <div id="createBagText">
                                <h2>Create New Bag</h2>
                                <p>Click the 'Create New Bag' button to add a bag to the master inventory.</p>
                            </div>
                        <button id="createBag-btn" type="button" class="btn btn-lg btn btn-outline-secondary" data-toggle="modal" data-target="#createBag">Create New Bag</button>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade modalStyle" id="createBag" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Create A New Bag</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <ul>
                                        <li>List of Gear In Bags Here</li>
                                    </ul>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    $("#secondary-div").html(createBagDiv);
}


function fillCreateItemDiv() {
    let createItemDiv = `<div id="createItemDiv">
                            <div id="createItemText">
                                <h2>Create New Item</h2>
                                <p>Is an item you are looking for not in the inventory list? Click the 'Create New Item' button to add an item to the master inventory.</p>
                            </div>
                        <button id="createItem-btn" type="button" class="btn btn-lg btn btn-outline-secondary" data-toggle="modal" data-target="#createItem">Create New Item</button>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade modalStyle" id="createItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <label>Item Description:</label><input type="text" name="item-Description" id="desc-input">
                                    </form>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" id="submitItemBtn" class="btn btn-primary save_new_btn" data-dismiss="modal">Create Item</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    $("#secondary-div").html(createItemDiv);
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
        };
        console.log("useritemObject", userItemObject);
        return userItemObject;
    });
}

function createUserBagsListSelector(uid) {
    db.getUserBags(uid)
    .then ((dataObj) => {
        let newArr = Object.values(dataObj);
        console.log("newArr", newArr);
    });
}

function makeUserBagDropdown(uid, itemID) {
    db.getUserBags(uid)
        .then((dataObj) => {
            let userBagsArr = Object.values(dataObj);
            console.log("newArr", userBagsArr);
            let userBagDropdown;
            for (let bag in userBagsArr) {
                let currentBag = userBagsArr[bag];
                userBagDropdown = `<a class="dropdown-item" id="${bag}">${currentBag.title}</a>`;
                $("#${itemID}").append(userBagDropdown);
            }
        });
}


// function buildUserItemPage(item) {
//     let userItemPage;
//     for (let item in allItems) {
//         let currentItem = allItems[item];
//         userItemPage =
//                 `<div class="div-content">
//                     <div class="div-header">
//                         <div>
//                             <h4>${currentItem.itemMake} ${currentItem.itemModel}</h4>
//                             <small>Item Category: ${currentItem.itemCategory}: ${currentItem.itemSubCategory}</small>
//                         </div>
//                     </div>
//                     <div class="div-body">
//                         <div>
//                             <img src="${currentItem.itemImageURL}" class="modal-image" alt="${currentItem.itemMake} ${currentItem.itemModel} image">
//                             <a href="${currentItem.itemManualURL}">${currentItem.itemMake} ${currentItem.itemModel} Product Manual</a>
//                             <h5>User Notes</h5>
//                             <p>${currentItem.userNotes}</p>
//                             <h5>Item Description</h5>
//                             <p>${currentItem.itemDescription}:</p>
//                             <button type="button" id="${item}" class="btn btn-danger deleteUserItem-btn" data-dismiss="modal">Delete Item</button>
//                         </div>
//                     </div>
//                 </div>`;

//     }
// }
module.exports = { makeItemList, fillHomeIntro, fillCreateItemDiv, userItemForm, makeUserItemList, fillMyBagsIntro, fillMyGearIntro, fillCreateUserItemDiv, clearGearDiv, fillCreateBagDiv, makeBagList };

// function makeModalUserItemList(items) {
//     let itemCardDiv = "";
//     for (let item in items) {
//         let currentItem = items[item];
//         itemCardDiv += `<div class="itemCard-wrap">
//                                 <div id="${item}-card" class="itemCard">
//                                     <img src="${currentItem.itemImageURL}" class="listImage" alt="${currentItem.itemMake} ${currentItem.itemModel} image">
//                                     <h4 class="list-headline">${currentItem.itemMake} ${currentItem.itemModel}</h4>
//                                     <button id="${item}" class="addToBag-btn btn btn-outline-secondary">Add Item To Camera Bag</button>
//                                     <button id="${item}-infobtn" class="info-btn btn btn-outline-secondary" data-toggle="modal" data-target="#${item}-userInfoModal">More</button>
//                                 </div>
//                             </div>

//                         <!-- Modal -->
//                             <div class="modal fade modalStyle" id="${item}-userInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                             <div class="modal-dialog" role="document">
//                                 <div class="modal-content">
//                                     <div class="modal-header">
//                                         <h5 class="modal-title" id="exampleModalLabel">Edit Your Item</h5>
//                                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                             <span aria-hidden="true">&times;</span>
//                                         </button>
//                                     </div>
//                                         <form id="userItemModalForm" class="modal-body">

//                                             <label>Item Make:</label><input type="text" class="modal-input" name="${currentItem.itemMake}" value="${currentItem.itemMake}" id="itemMake-input"><br>
//                                             <label>Item Model:</label><input type="text" class="modal-input" name="${currentItem.itemModel}" value="${currentItem.itemModel}"id="itemModel-input"><br>
//                                             <label>Item Category</label><input type="text" class="modal-input" name="${currentItem.itemCategory}" value="${currentItem.itemCategory}" id="itemCat-input"><br>
//                                             <label>Item SubCategory:</label><input type="text" class="modal-input" name="${currentItem.itemSubCategory}" value="${currentItem.itemSubCategory}" id="itemSub-input"><br>
//                                             <label>Item Manual/Instructions URL:</label><input type="text" class="modal-input" name="${currentItem.itemManualURL}" value="${currentItem.itemManualURL}" id="manual-input"><br>
//                                             <label>Item Description:</label><input type="text" class="modal-input" name="${currentItem.itemDescription}" value="${currentItem.itemDescription}" id="desc-input"><br>
//                                             <label>User Notes:</label><input type="text" class="modal-input" name="user-notes" id="desc-input"><br>

//                                         </form>
//                                     <div class="modal-footer">
//                                         <button type="button" id="${item}" class="btn btn-danger deleteUserItem-btn">Delete Item</button>
//                                         <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
//                                         <button type="submit" id="submitItemBtn" class="btn btn-primary save_new_btn" data-dismiss="modal">Save Changes</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>`;

//         $("#gear-div").html(itemCardDiv);
//     }
// }