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
    console.log(e);
  };

  Speech.speak(speechSynthesis);
};

/**
 * @method speakBlock
 */
const speakBlock = (text) => {
  const blockSize = 200;
  for (let i = 0; i < text.length; i += blockSize) {
    let currentBlock = text.substring(i, i+blockSize);
    speak(currentBlock);
  }
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.message) {
    case 'selected': {
      if (Speech.pending || Speech.paused) {
        Speech.cancel();
      }

      const selectedText = window.getSelection().toString();
      speakBlock(selectedText);
      break;
    }
    case 'auto': {
      // Identify the selected HTMLElement, go to its parent and get the text content
      const parentElement = window.getSelection().anchorNode.parentNode;
      speakBlock(parentElement.textContent);
      break;
    }
  }
});
