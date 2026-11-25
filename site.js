const slides = document.querySelectorAll('#library-slides figure');
const captions = document.querySelectorAll('.feature-list > div');
let visibleSlide = 0;

function moveScreenshot(direction) {
  slides[visibleSlide].setAttribute('aria-hidden', 'true');
  captions[visibleSlide].removeAttribute('aria-current');
  visibleSlide = (visibleSlide + direction + slides.length) % slides.length;
  captions[visibleSlide].setAttribute('aria-current', 'true');
  slides[visibleSlide].setAttribute('aria-hidden', 'false');
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let rotationTimer;

function scheduleRotation() {
  clearInterval(rotationTimer);
  if (!reducedMotion.matches) {
    rotationTimer = setInterval(() => moveScreenshot(1), 10000);
  }
}

for (const [id, direction] of [['library-prev', -1], ['library-next', 1]]) {
  const button = document.getElementById(id);
  button.addEventListener('click', () => {
    moveScreenshot(direction);
    scheduleRotation();
  });
  button.hidden = false;
}

scheduleRotation();
