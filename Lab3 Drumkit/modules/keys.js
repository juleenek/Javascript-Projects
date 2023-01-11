const STOP_RECORDING_KEY = '2';

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
