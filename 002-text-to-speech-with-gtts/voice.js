const gTTS = require('gtts');

const text = "Hello. Nice to meet you. How are you? I'm fine, thank you. And you?";

const gtts = new gTTS(text, 'en');
gtts.save('voice-test.mp3', (err, res) => {
  if(err) {
    throw new Error(err);
  } else {
    console.log('Successful converted!');
  }
});
