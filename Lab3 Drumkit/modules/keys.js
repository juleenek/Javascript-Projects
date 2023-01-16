const instruction = document.querySelector('.instruction');

const sounds = {
  w: 'boom',
  a: 'clap',
  e: 'hihat',
  s: 'kick',
  r: 'openhat',
  d: 'ride',
  t: 'snare',
  f: 'tink',
  g: 'tom',
};

export const onKeyPress = async (key) => {
  const sound = sounds[key.toLowerCase()];
  playSound(sound);
};

export const playSound = async (sound) => {
  const audioTag = document.querySelector(`#${sound}`);
  const audio = new Audio(audioTag.src);
  audio.play();
};

export const getSoundsInstruction = () => {
  for (const [key, value] of Object.entries(sounds)) {
    const soundText = document.createElement('p');
    soundText.textContent = `${key}: ${value}`;
    instruction.appendChild(soundText);
  }
};
