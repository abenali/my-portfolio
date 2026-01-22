/**
 * Create a carousel component with navigation and pagination
 *
 * @param {string} trackSelector - CSS selector for the carousel track element
 * @param {string} itemSelector - CSS selector for carousel items
 * @param {string} prevBtnSelector - CSS selector for previous button
 * @param {string} nextBtnSelector - CSS selector for next button
 * @param {string} dotsSelector - CSS selector for pagination dots
 * @param {number} visibleCount - Number of items visible at once (default: 3)
 * @returns {Object} Carousel instance with destroy method for cleanup
 *
 * @example
 * createCarousel('.logos-track', '.logo-item', '.logos-arrow-left', '.logos-arrow-right', '.logos-dots .dot', 3);
 */
function createCarousel(trackSelector, itemSelector, prevBtnSelector, nextBtnSelector, dotsSelector, visibleCount = 3) {
    // Get DOM elements with error handling
    const track = document.querySelector(trackSelector);
    const items = Array.from(document.querySelectorAll(itemSelector));
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const dots = Array.from(document.querySelectorAll(dotsSelector));

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
    const eventListeners = [];

    /**
     * Update carousel position and pagination
     * @param {number} index - Target index
     */
    function updateCarousel(index) {
        try {
            currentIndex = Math.min(Math.max(index, 0), maxIndex);
            const itemWidth = items[0]?.getBoundingClientRect().width + 24 || 0;

            if (itemWidth > 0) {
                track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
            }

            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === currentIndex);
            });
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
        createCarousel('.logos-track', '.logo-item', '.logos-arrow-left', '.logos-arrow-right', '.logos-dots .dot', 3);
        createCarousel('.testi-track', '.testi-track .testimonial', '.testi-arrow-left', '.testi-arrow-right', '.testi-dots .testi-dot', 1);
    } catch (error) {
        console.error('[Carousel] Initialization failed:', error);
    }
})();
