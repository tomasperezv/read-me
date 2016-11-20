// Initialize voices
const Speech = window.speechSynthesis;
var voices = Speech.getVoices();

/**
 * @method speak
 */
const speak = (text) => {
  var speechSynthesis = new SpeechSynthesisUtterance();
  speechSynthesis.voice = voices[2];
  speechSynthesis.voiceURI = 'native';
  speechSynthesis.volume = 1;
  speechSynthesis.text = text;
  speechSynthesis.lang = 'en-US';

  speechSynthesis.onerror = speechSynthesis.onpause = speechSynthesis.onresume =
  speechSynthesis.onboundary = speechSynthesis.onmark = (e) => {
    debugger;
  };

  Speech.speak(speechSynthesis);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.message) {
    case 'selected': {
      if (Speech.pending || Speech.paused) {
        Speech.cancel();
      }

      const selectedText = window.getSelection().toString();
      const blockSize = 200;
      for (let i = 0; i < selectedText.length; i += blockSize) {
        let currentBlock = selectedText.substring(i, i+blockSize);
        speak(currentBlock);
      }

      break;
    }
    case 'auto': {
      speak('auto');
      break;
    }
  }
});
