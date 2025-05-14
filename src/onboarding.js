const slides = document.querySelectorAll('[data-slide]');
const indicators = document.querySelectorAll('[data-indicator]');
const indicatorContainer = document.getElementById('carousel-indicators');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.hidden = i !== index;
  });

  if (index >= 2) {
    indicatorContainer.style.display = 'flex';
    const indicatorIndex = index - 2;

    indicators.forEach((dot, i) => {
      dot.classList.toggle('bg-black', i === indicatorIndex);
      dot.classList.toggle('bg-gray-400', i !== indicatorIndex);
    });
  } else {
    indicatorContainer.style.display = 'none';
  }

  current = index;
}

window.nextSlide = function () {
  if (current < slides.length - 1) {
    showSlide(current + 1);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  showSlide(0);

  setTimeout(() => {
    showSlide(1);

    setTimeout(() => {
      showSlide(2);
    }, 3000);
  }, 3000);
});
