/* eslint-disable no-undef */
////////////////////////////////////////////////////////////////////////////////
//// GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////
var messageType;
var messageElement;
var buttonClickEnabled = true;
////////////////////////////////////////////////////////////////////////////////
//// DOM VARIABLES
////////////////////////////////////////////////////////////////////////////////
var displayMessageText = document.querySelector('#display-message-text');
var messageLoadingImg = document.querySelector('#message-loading-img');
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

async function receiveMessage() {
  if (!messageType || !buttonClickEnabled) return;
  console.log('click registered');
  buttonClickEnabled = false;
  if (messageLoadingImg.classList.contains('shown')) {
    await hideElement(messageLoadingImg, 0.75);
    displayMessageText.innerText = `${getRandomMessage(messages[messageType])}`;
    await showElement(displayMessageText, 1);
  } else {
    await hideElement(displayMessageText, 0.75);
    await showElement(messageLoadingImg, 1.5);
    await hideElement(messageLoadingImg, 0.75);
    displayMessageText.innerText = `${getRandomMessage(messages[messageType])}`;
    await showElement(displayMessageText, 1);
  }
  buttonClickEnabled = true;
}

async function hideElement(element, delay = 0) {
  element.classList.remove('shown');
  element.classList.add('hidden');
  return await pauseForCSSTransition(delay);
}

async function showElement(element, delay = 0) {
  element.classList.remove('hidden');
  element.classList.add('shown');
  return await pauseForCSSTransition(delay);
}

function pauseForCSSTransition(miliseconds) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, miliseconds * 1000)
  );
}

function getRandomMessage(array) {
  return array[Math.floor(Math.random() * array.length)];
}
