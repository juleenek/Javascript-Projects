const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
let visibleSlides = [];

slides.forEach((slide) => {
  slide.classList.add('invisible_slide');
});

function sleep(ms) {
  return new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
}

async function getVisibleSlides() {
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

    visibleSlides.forEach((slide) => {
      console.log(slide.textContent);
    });
    console.log("");

    await sleep(3000);

    visibleSlides = [];
  }
}

getVisibleSlides();
