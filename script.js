const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voice");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const textInput = document.getElementById("text-input");

let voices = [];

function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

let utterance;

function speakText() {
  if (synth.speaking) synth.cancel();
  utterance = new SpeechSynthesisUtterance(textInput.value);
  utterance.voice = voices[voiceSelect.value];
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  synth.speak(utterance);
}

function pauseSpeech() {
  if (synth.speaking && !synth.paused) synth.pause();
}

function resumeSpeech() {
  if (synth.paused) synth.resume();
}

function stopSpeech() {
  synth.cancel();
}
