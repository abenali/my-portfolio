/**
 * Main app initialization and navigation
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        try {
            yearElement.textContent = new Date().getFullYear();
        } catch (error) {
            console.error('Error setting footer year:', error);
        }
    }

    // Mobile navigation toggle with improved accessibility
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) {
        console.warn('Navigation elements not found');
        return;
    }

    try {
        /**
         * Toggle navigation menu visibility
         */
        function toggleNav() {
            navLinks.classList.toggle('nav-open');
            // Update aria-expanded for accessibility
            const isOpen = navLinks.classList.contains('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        }

        /**
         * Close navigation menu
         */
        function closeNav() {
            navLinks.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }

        // Toggle menu on button click
        navToggle.addEventListener('click', toggleNav);

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => closeNav());
        });

        // Close menu when scrolling (improve mobile UX)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                closeNav();
            }, 100);
        }, { passive: true });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
                closeNav();
            }
        });
    } catch (error) {
        console.error('Navigation initialization failed:', error);
    }
});

/**
 * Enable smooth scrolling for anchor links
 * (CSS: scroll-behavior: smooth will handle the animation)
 */
if (!CSS.supports('scroll-behavior', 'smooth')) {
    // Fallback for browsers that don't support smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

