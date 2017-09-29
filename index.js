'use strict';
/* global $ */

const STORE = [{name: 'apples', checked: false, editable: true},
  {name: 'oranges', checked: false, editable: true},
  {name: 'milk', checked: true, editable: true},
  {name: 'bread', checked: false, editable: true}];

function generateItemElement(item, itemIndex, template) {
  return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" contenteditable="${item.editable}">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
              <span class="button-label">check</span>
          </button>
          <button class="shopping-hidden-toggle js-hidden-toggle">Toggle</button>
          <button class="shopping-item-delete js-item-delete">
              <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
}
 
//<button class="shopping-item-edit js-item-edit">edit</button>

  
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
    
  return items.join('');
}
  
  
function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}
  
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}
  
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
  
function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
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
    console.log('`handleItemCheckClicked` ran');
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
  console.log('`handleDeleteItemClicked` ran');
}

// function toggleEditItem(itemIndex) {
//   STORE[itemIndex].editable = !STORE[itemIndex].editable;
//   if(STORE[itemIndex].editable === true){
//     $(this).find('.js-item-edit')
//       .html('<button class="shopping-item-save js-item-save">save</button>');//button to edit >> save
//   } 
//   if(STORE[itemIndex].editable === false){
//     $(this).find('.js-item-save')//button to save >> edit 
//       .html('<button class="shopping-item-edit js-item-edit">eit</button>');//button to edit >> save
//   }
// }

//when editable is TRUE; button = save)
//listen to click of save > user's new input > replace it to STORE w/ respective itemIndex

// User can edit an item title
// function handleEditItemClicked(){
//   //  > Listen for user click on button
//   $('.js-shopping-list').on('click', '.js-item-edit', (event) => {
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     toggleEditItem(itemIndex);
//     renderShoppingList();
//   });
// }

// User can press a toggle switch to show all items or show only items that are unchecked
// > User click on "Toggle Button"
// > List toggles between "All Items" & "Unchecked Items"
// > Render List

// User can type in a search term and get a filtered item list by title
//  > Create a new field on top for filter search
//  > Another button to submit filter
//  > .filter(?) between user input & current <li>
//  > Render List

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
//   handleEditItemClicked();
}
  
$(handleShoppingList);
  