/* eslint-disable no-undef */
////////////////////////////////////////////////////////////////////////////////
//// GLOBAL VARIABLES
////////////////////////////////////////////////////////////////////////////////
var messageType;
var buttonClickEnabled = true;
////////////////////////////////////////////////////////////////////////////////
//// DOM VARIABLES
////////////////////////////////////////////////////////////////////////////////
/* ------ backgrounds ------ */
var backgrounds = {};
backgrounds.default = document.querySelector('#bg-default');
backgrounds.affirmations = document.querySelector('#bg-affirmations');
backgrounds.mantras = document.querySelector('#bg-mantras');
/* ------ message display area ------ */
var messageTypeSelector = document.querySelector('#message-type-selector');
var receiveMsgBtn = document.querySelector('#receive-msg-btn');
/* ------ message type selection area ------ */
var displayMessageText = document.querySelector('#display-message-text');
var messageLoadingImg = document.querySelector('#message-loading-img');
////////////////////////////////////////////////////////////////////////////////
//// EVENT LISTENERS
////////////////////////////////////////////////////////////////////////////////
messageTypeSelector.addEventListener('change', updateMessageType);
receiveMsgBtn.addEventListener('click', receiveMessage);
////////////////////////////////////////////////////////////////////////////////
//// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
/* ------ logic functions ------ */
function getRandomMessage(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateMessageType(e) {
  e.preventDefault();
  messageType = e.target.id;
  updateBackground();
}

async function receiveMessage() {
  if (!messageType || !buttonClickEnabled) return;

  buttonClickEnabled = false;
  if (messageLoadingImg.classList.contains('shown')) {
    await startImageAnimation();
    await hideImageShowMessage();
  } else {
    await hideMessageShowImage();
    await hideImageShowMessage();
  }

  buttonClickEnabled = true;
}
/* ------ DOM functions ------ */
function updateBackground() {
  for (const bg in backgrounds) {
    if (bg === messageType) {
      backgrounds[bg].classList.add('current');
    } else {
      backgrounds[bg].classList.remove('current');
    }
  }
}

async function startImageAnimation() {
  messageLoadingImg.classList.add('animate');
  return await pauseForCSSTransition(2);
}

async function hideImageShowMessage() {
  await hideElement(messageLoadingImg, 0.75);
  displayMessageText.innerText = `${getRandomMessage(messages[messageType])}`;
  return await showElement(displayMessageText, 1);
}

async function hideMessageShowImage() {
  await hideElement(displayMessageText, 0.75);
  return await showElement(messageLoadingImg, 2.5);
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


