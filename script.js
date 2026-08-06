(() => {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(year);
  });

  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) {
    return;
  }

  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(track.children);
  const previousButton = document.querySelector("[data-carousel-previous]");
  const nextButton = document.querySelector("[data-carousel-next]");
  const status = document.querySelector("[data-carousel-status]");
  let currentIndex = 0;

  const visibleSlides = () => (window.matchMedia("(max-width: 760px)").matches ? 1 : 3);

  const updateCarousel = () => {
    const maxIndex = Math.max(0, slides.length - visibleSlides());
    currentIndex = Math.min(currentIndex, maxIndex);
    const firstSlide = slides[0];
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const distance = firstSlide.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-currentIndex * distance}px)`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === maxIndex;
    status.textContent = `Showing screenshot ${currentIndex + 1} of ${slides.length}`;
  };

  previousButton.addEventListener("click", () => {
    currentIndex -= 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex += 1;
    updateCarousel();
  });

  let resizeFrame;
  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(updateCarousel);
  });

  updateCarousel();
})();
