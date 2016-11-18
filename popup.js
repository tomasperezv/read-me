/**
 * @method sendSpeakCommand
 * @param {String} id
 */
const sendSpeakCommand = (id) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { 'message': id });
  });
};

/**
 * @param {String} id
 * @method listenToClickEvent
 */
const listenAndSendCommand = (id) => {
  document.getElementById(id).addEventListener('click', () => {
    sendSpeakCommand(id);
  });
};

/**
 * TTS selected text
 */
listenAndSendCommand('selected');

/**
 * TTS auto mode
 */
listenAndSendCommand('auto');
