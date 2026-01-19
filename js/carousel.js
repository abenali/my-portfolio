document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
});

function createCarousel(trackSelector, itemSelector, prevBtnSelector, nextBtnSelector, dotsSelector, visibleCount = 3) {
    const track = document.querySelector(trackSelector);
    const items = Array.from(document.querySelectorAll(itemSelector));
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const dots = Array.from(document.querySelectorAll(dotsSelector));

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    const maxIndex = Math.max(0, items.length - visibleCount);

    function updateCarousel(index) {
        currentIndex = Math.min(Math.max(index, 0), maxIndex);
        const itemWidth = items[0].getBoundingClientRect().width + 24;
        track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === currentIndex);
        });
    }

    prevBtn?.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateCarousel(currentIndex + 1));

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateCarousel(i));
    });

    window.addEventListener('resize', () => updateCarousel(currentIndex));
    updateCarousel(0);
}

createCarousel('.logos-track', '.logo-item', '.logos-arrow-left', '.logos-arrow-right', '.logos-dots .dot', 3);
createCarousel('.testi-track', '.testi-track .testimonial', '.testi-arrow-left', '.testi-arrow-right', '.testi-dots .testi-dot', 1);