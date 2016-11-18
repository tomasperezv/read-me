// Initialize voices
const Speech = window.speechSynthesis;
var voices = Speech.getVoices();

/**
 * @method speak
 */
const speak = (text) => {
  var msg = new SpeechSynthesisUtterance();
  msg.voice = voices[2];
  msg.voiceURI = 'native';
  msg.volume = 1;
  msg.text = text;
  msg.lang = 'en-US';

  Speech.speak(msg);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.message) {
    case 'selected': {
      const selectedText = window.getSelection().toString();
      speak(selectedText);
      break;
    }
    case 'auto': {
      speak('auto');
      break;
    }
  }
});
