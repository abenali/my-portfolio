/**
 * Create a carousel component with navigation and pagination
 *
 * @param {string} trackSelector - CSS selector for the carousel track element
 * @param {string} itemSelector - CSS selector for carousel items
 * @param {string} prevBtnSelector - CSS selector for previous button
 * @param {string} nextBtnSelector - CSS selector for next button
 * @param {string} dotsContainerSelector - CSS selector for pagination dots container
 * @param {number} visibleCount - Number of items visible at once (default: 3)
 * @param {string} dotClass - CSS class for generated dots
 * @returns {Object} Carousel instance with destroy method for cleanup
 *
 * @example
 * createCarousel('.logos-track', '.logo-item', '.logos-arrow-left', '.logos-arrow-right', '.logos-dots', 3, 'dot');
 */
function createCarousel(trackSelector, itemSelector, prevBtnSelector, nextBtnSelector, dotsContainerSelector, visibleCount = 3, dotClass = 'dot') {
    // Get DOM elements with error handling
    const track = document.querySelector(trackSelector);
    const items = Array.from(document.querySelectorAll(itemSelector));
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const dotsContainer = document.querySelector(dotsContainerSelector);

    // Validate carousel elements exist
    if (!track) {
        console.warn(`[Carousel] Track element not found: ${trackSelector}`);
        return { destroy: () => {} };
    }

    if (items.length === 0) {
        console.warn(`[Carousel] No items found: ${itemSelector}`);
        return { destroy: () => {} };
    }

    let currentIndex = 0;
    const maxIndex = Math.max(0, items.length - visibleCount);
    const pageCount = maxIndex + 1;
    let dots = [];
    const eventListeners = [];

    /**
     * Build pagination dots based on the number of available pages
     */
    function buildDots() {
        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = '';
        dots = [];

        for (let i = 0; i < pageCount; i += 1) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = dotClass;
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
    }

    /**
     * Calculate horizontal movement distance between two carousel items
     * Uses actual DOM offsets and falls back to CSS gap + item width.
     * @returns {number}
     */
    function getStepSize() {
        if (items.length > 1) {
            const offsetDelta = items[1].offsetLeft - items[0].offsetLeft;
            if (offsetDelta > 0) {
                return offsetDelta;
            }
        }

        const itemWidth = items[0]?.getBoundingClientRect().width || 0;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap || trackStyle.columnGap || '0') || 0;
        return itemWidth + gap;
    }

    /**
     * Update carousel position and pagination
     * @param {number} index - Target index
     */
    function updateCarousel(index) {
        try {
            currentIndex = Math.min(Math.max(index, 0), maxIndex);
            const stepSize = getStepSize();

            if (stepSize > 0) {
                track.style.transform = `translateX(${-currentIndex * stepSize}px)`;
            }

            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === currentIndex);
            });

            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
                prevBtn.setAttribute('aria-disabled', String(currentIndex === 0));
            }

            if (nextBtn) {
                nextBtn.disabled = currentIndex === maxIndex;
                nextBtn.setAttribute('aria-disabled', String(currentIndex === maxIndex));
            }
        } catch (error) {
            console.error('[Carousel] Error updating carousel:', error);
        }
    }

    /**
     * Handle keyboard navigation (arrow keys)
     * @param {KeyboardEvent} e - Keyboard event
     */
    function handleKeyboard(e) {
        if (e.key === 'ArrowLeft' && prevBtn) {
            e.preventDefault();
            updateCarousel(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && nextBtn) {
            e.preventDefault();
            updateCarousel(currentIndex + 1);
        }
    }

    // Add event listeners for navigation
    if (prevBtn) {
        const prevListener = () => updateCarousel(currentIndex - 1);
        prevBtn.addEventListener('click', prevListener);
        eventListeners.push({ element: prevBtn, event: 'click', handler: prevListener });
    }

    if (nextBtn) {
        const nextListener = () => updateCarousel(currentIndex + 1);
        nextBtn.addEventListener('click', nextListener);
        eventListeners.push({ element: nextBtn, event: 'click', handler: nextListener });
    }

    // Add event listeners for dots
    buildDots();
    dots.forEach((dot, i) => {
        const dotListener = () => updateCarousel(i);
        dot.addEventListener('click', dotListener);
        eventListeners.push({ element: dot, event: 'click', handler: dotListener });
    });

    // Add keyboard navigation
    const keyboardListener = (e) => handleKeyboard(e);
    track.addEventListener('keydown', keyboardListener);
    eventListeners.push({ element: track, event: 'keydown', handler: keyboardListener });

    // Handle window resize
    const resizeListener = () => updateCarousel(currentIndex);
    window.addEventListener('resize', resizeListener);
    eventListeners.push({ element: window, event: 'resize', handler: resizeListener });

    // Initialize carousel
    updateCarousel(0);

    /**
     * Cleanup function to remove all event listeners
     */
    function destroy() {
        eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
    }

    return { destroy, updateCarousel, getCurrentIndex: () => currentIndex };
}

// Initialize carousels
(function() {
    try {
        createCarousel('.logos-track', '.logo-item', '.logos-arrow-left', '.logos-arrow-right', '.logos-dots', 3, 'dot');
        createCarousel('.testi-track', '.testi-track .testimonial', '.testi-arrow-left', '.testi-arrow-right', '.testi-dots', 1, 'testi-dot');
    } catch (error) {
        console.error('[Carousel] Initialization failed:', error);
    }
})();
