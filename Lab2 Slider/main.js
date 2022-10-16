const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');

let index = 0;
let previous_slide, current_slide, next_slide;
let visibleSlides = [];
let timer;

slides.forEach((slide) => {
  slide.classList.add('invisible_slide');
});

function addVisibleSlides(previous_slide, current_slide, next_slide) {
  slider.appendChild(previous_slide);
  slider.appendChild(current_slide);
  slider.appendChild(next_slide);
  previous_slide.classList.toggle('invisible_slide');
  current_slide.classList.toggle('invisible_slide');
  next_slide.classList.toggle('invisible_slide');
}

function removeVisibleSlides(previous_slide, current_slide, next_slide) {
  slider.removeChild(previous_slide);
  slider.removeChild(current_slide);
  slider.removeChild(next_slide);
  previous_slide.classList.toggle('invisible_slide');
  current_slide.classList.toggle('invisible_slide');
  next_slide.classList.toggle('invisible_slide');
}

function getSlides() {
  index === 0
    ? (previous_slide = slides[slides.length - 1])
    : (previous_slide = slides[index - 1]);

  current_slide = slides[index];

  index === slides.length - 1
    ? (next_slide = slides[0])
    : (next_slide = slides[index + 1]);

  visibleSlides.push(previous_slide);
  visibleSlides.push(current_slide);
  visibleSlides.push(next_slide);

  addVisibleSlides(previous_slide, current_slide, next_slide);
}

function nextSlides() {
  removeVisibleSlides(previous_slide, current_slide, next_slide);
  visibleSlides = [];
  index++;
  if (index > slides.length - 1) index = 0;
  getSlides();
}

function previousSlides() {
  removeVisibleSlides(previous_slide, current_slide, next_slide);
  visibleSlides = [];
  index--;
  if (index < 0) index = slides.length - 1;
  getSlides();
}

function autoplayStart() {
  timer = setInterval(() => nextSlides(), 4000);
}
function autoplayStop() {
  clearInterval(timer);
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
  autoplayStart();
});
pauseButton.addEventListener('click', function () {
  autoplayStop();
});

getSlides();
autoplayStart();
