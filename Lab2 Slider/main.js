const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
let visibleSlides = [];

slides.forEach((slide) => {
  slide.classList.add('invisible_slide');
});

function sleep(ms) {
  return new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
}

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

async function getSlides() {
  for (let i = 0; i < slides.length; i++) {
    let previous_slide, current_slide, next_slide;

    i === 0
      ? (previous_slide = slides[slides.length - 1])
      : (previous_slide = slides[i - 1]);

    current_slide = slides[i];

    i === slides.length - 1
      ? (next_slide = slides[0])
      : (next_slide = slides[i + 1]);

    visibleSlides.push(previous_slide);
    visibleSlides.push(current_slide);
    visibleSlides.push(next_slide);

    addVisibleSlides(previous_slide, current_slide, next_slide);

    await sleep(2000);

    removeVisibleSlides(previous_slide, current_slide, next_slide);

    visibleSlides = [];
  }
  getSlides();
}

getSlides();
