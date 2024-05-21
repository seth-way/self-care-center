/* eslint-disable no-undef */
////////////////////////////////////////////////////////////////////////////////
//// GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////
var messageType;
////////////////////////////////////////////////////////////////////////////////
//// DOM VARIABLES
////////////////////////////////////////////////////////////////////////////////
var messageDisplayArea = document.querySelector('#message-display-area');
var messageTypeSelector = document.querySelector('#message-type-selector');
var receiveMsgBtn = document.querySelector('#receive-msg-btn');
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
  if (messageType) {
    document.body.classList.remove(
      'affimations-color-scheme',
      'mantras-color-scheme'
    );
    document.body.classList.add(`${messageType}-color-scheme`);
  }
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
