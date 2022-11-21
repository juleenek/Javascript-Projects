export { addVisibleSlides, removeVisibleSlides };

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
