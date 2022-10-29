const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const dotsContainer = document.querySelector('.dots');
const container = document.querySelector('.container');
const videoSlide = document.querySelectorAll('.video_slide');

let slideIndex = 0;
let changeSlideTime = 3000;
let previous_slide, current_slide, next_slide;
let visibleSlides = [];
let autoplayState;
let timer;
let highlightedDot;

slides.forEach((slide) => {
  slide.classList.add('invisible_slide');
  addLightBox(slide);
});

function addLightBox(slide) {
  slide.addEventListener('click', function () {
    const lightbox = slide.cloneNode(true);
    container.appendChild(lightbox);
    lightbox.classList.add('lightbox');
    autoplayStop();

    lightbox.addEventListener('click', function () {
      container.removeChild(lightbox);
      lightbox.classList.remove('lightbox');
      autoplayStart();
    });
  });
}

function createDots() {
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.classList.add(`dot_${i}`);
    dotsContainer.appendChild(dot);
  }
  highlightedDot = document.querySelector(`.dot_${slideIndex}`);
  highlightedDot.classList.toggle('highlight_dot');
}

function addVisibleSlides(previous_slide, current_slide, next_slide) {
  playVideos();
  slider.appendChild(previous_slide);
  slider.appendChild(current_slide);
  slider.appendChild(next_slide);
  previous_slide.classList.toggle('invisible_slide');
  current_slide.classList.toggle('invisible_slide');
  next_slide.classList.toggle('invisible_slide');

  previous_slide.classList.toggle('previous_slide');
  current_slide.classList.toggle('current_slide');
  next_slide.classList.toggle('next_slide');
}

function removeVisibleSlides(previous_slide, current_slide, next_slide) {
  slider.removeChild(previous_slide);
  slider.removeChild(current_slide);
  slider.removeChild(next_slide);
  previous_slide.classList.toggle('invisible_slide');
  current_slide.classList.toggle('invisible_slide');
  next_slide.classList.toggle('invisible_slide');

  previous_slide.classList.toggle('previous_slide');
  current_slide.classList.toggle('current_slide');
  next_slide.classList.toggle('next_slide');

  highlightedDot.classList.toggle('highlight_dot');
}

function getSlides() {
  slideIndex === 0
    ? (previous_slide = slides[slides.length - 1])
    : (previous_slide = slides[slideIndex - 1]);

  current_slide = slides[slideIndex];

  slideIndex === slides.length - 1
    ? (next_slide = slides[0])
    : (next_slide = slides[slideIndex + 1]);

  visibleSlides.push(previous_slide);
  visibleSlides.push(current_slide);
  visibleSlides.push(next_slide);

  addVisibleSlides(previous_slide, current_slide, next_slide);
}

function nextSlides() {
  removeVisibleSlides(previous_slide, current_slide, next_slide);
  visibleSlides = [];
  slideIndex++;
  if (slideIndex > slides.length - 1) slideIndex = 0;
  highlightedDot = document.querySelector(`.dot_${slideIndex}`);
  highlightedDot.classList.toggle('highlight_dot');
  getSlides();
}

function previousSlides() {
  removeVisibleSlides(previous_slide, current_slide, next_slide);
  visibleSlides = [];
  slideIndex--;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  highlightedDot = document.querySelector(`.dot_${slideIndex}`);
  highlightedDot.classList.toggle('highlight_dot');
  getSlides();
}

function autoplayStart() {
  timer = setInterval(() => nextSlides(), changeSlideTime);
  autoplayState = true;
}
function autoplayStop() {
  clearInterval(timer);
  autoplayState = false;
}

function playVideos() {
  videoSlide.forEach((video) => {
    video.play();
  });
}

nextButton.addEventListener('click', function () {
  setTimeout(autoplayStop(), 5000);
  nextSlides();
  autoplayStart();
});

previousButton.addEventListener('click', function () {
  setTimeout(autoplayStop(), 5000);
  previousSlides();
  autoplayStart();
});

startButton.addEventListener('click', function () {
  if (autoplayState === false) {
    autoplayStart();
    pauseButton.classList.toggle('pressed_button');
  }
});
pauseButton.addEventListener('click', function () {
  if (autoplayState === true) {
    autoplayStop();
    pauseButton.classList.toggle('pressed_button');
  }
});

getSlides();
autoplayStart();
createDots();
