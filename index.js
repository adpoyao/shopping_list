'use strict';
/* global $ */

const STORE = [{name: 'apples', checked: false, editable: false},
  {name: 'oranges', checked: false, editable: false},
  {name: 'milk', checked: true, editable: false},
  {name: 'bread', checked: false, editable: false}];

function generateItemElement(item, itemIndex, template) {
  return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" contenteditable='${item.editable}'>${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-item-edit js-item-edit">
              <span class="button-label">edit</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
}

//<button class="shopping-item-hide js-item-hide">Hide Completed Items</button>

function generateShoppingItemsString(shoppingList) {  
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}
  
  
function renderShoppingList() {
  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}
  
function addItemToShoppingList(itemName) {
  STORE.push({name: itemName, checked: false});
}
  
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
  
function toggleCheckedForListItem(itemIndex) {
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}
  
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}
  
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItemFromList(itemIndex) {
  const itemToDelete = STORE.splice(itemIndex,1);
}
  
function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and 
  // delete it
  $('.js-shopping-list').on('click', '.js-item-delete', (event) => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItemFromList(itemIndex);
    renderShoppingList();
  });
}

function toggleEditItem(itemIndex) {
  STORE[itemIndex].editable = !STORE[itemIndex].editable;
}

// function toggleEditButton(itemIndex){
// //when editable is TRUE; button = save
//   const editButton = `
//     <button class="shopping-item-edit js-item-edit">
//       <span class="button-label">edit</span>
//     </button>`; //js-item-edit;
//   const saveButton = `
//     <button class="shopping-item-save js-item-save">
//       <span class="button-label">save</span>
//     </button>`; //js-item-save;
//   //STORE[itemIndex].editable ? 
//   $('.js-item-edit').replaceWith(saveButton);
//   //: $('.js-item-edit').replaceWith(editButton);
// }


// User can edit an item title
function handleEditItemClicked(){
  //  > Listen for user click on button
  $('.js-shopping-list').on('click', '.js-item-edit', (event) => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleEditItem(itemIndex);
    //toggleEditButton(itemIndex);
    renderShoppingList();
  });
}

// function handleSaveItemClicked(){
//   //Listen for new input when user click on Save Button
// }

function toggleHideButton(){
  //Toggle completed items to hide;
  $('.js-shopping-list').find('.shopping-item__checked').parent().toggle('hide_checked');
}

function handleHideItemClicked(){
// User can press a toggle switch to show all items or show only items that are unchecked
  $('.js-list-finish').on('click', (event) => {
    toggleHideButton();
  });
}
  
// > User click on "Hide Finished Item" Button
// > List toggles between "All Items" & "Unchecked Items"
// > Redo button to show "Show Finished Item" Button
// > Render List

function handleSearchTerm(){
// User can type in a search term and get a filtered item list by title
//  > Create a new field on top for filter search
//  > Another button to submit filter
//  > .filter(?) between user input & current <li>
//  > Render List
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditItemClicked();
  handleHideItemClicked();
}
  
$(handleShoppingList);