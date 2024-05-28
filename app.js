const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
const voiSelect = document.querySelector('select');

const speech = new SpeechSynthesisUtterance();

let voices = [];

// Kiểm tra nếu đã có sẵn giọng nói
if (window.speechSynthesis.getVoices().length !== 0) {
    populateVoiceList();
} else {
    // Lắng nghe sự kiện khi giọng nói đã sẵn sàng
    window.speechSynthesis.onvoiceschanged = populateVoiceList;
}

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, index) => {
        voiSelect.options[index] = new Option(voice.name, index);
    });

    // Đặt giọng nói mặc định nếu có
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

voiSelect.addEventListener('change', () => {
    speech.voice = voices[voiSelect.value];
    console.log(`Voice changed to: ${speech.voice.name}`);
});

button.addEventListener('click', () => {
    speech.text = textarea.value;
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;
    console.log(`Speaking text: ${speech.text}`);
    window.speechSynthesis.speak(speech);
});
