/* eslint-disable no-undef */
////////////////////////////////////////////////////////////////////////////////
//// GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////
var messageType;
////////////////////////////////////////////////////////////////////////////////
//// DOM VARIABLES
////////////////////////////////////////////////////////////////////////////////
var messageTypeSelector = document.querySelector('#message-type-selector');
var receiveMsgBtn = document.querySelector('#receive-msg-btn');
var messageDisplayArea = document.querySelector('#message-display-area');
////////////////////////////////////////////////////////////////////////////////
//// EVENT LISTENERS
////////////////////////////////////////////////////////////////////////////////
messageTypeSelector.addEventListener('change', updateMessageType);
receiveMsgBtn.addEventListener('click', receiveMessage);
////////////////////////////////////////////////////////////////////////////////
//// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
function updateMessageType(e) {
  e.preventDefault();
  messageType = e.target.id;
}

function receiveMessage() {
  if (!messageType) return;

  messageDisplayArea.innerHTML = `<p>${getRandomMessage(
    messages[messageType]
  )}</p>`;
}

function getRandomMessage(array) {
  return array[Math.floor(Math.random() * array.length)];
}
