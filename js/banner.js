(function() {
    'use strict';
    
    // Constants
    const COOKIE_NAME = 'wb_ga_consent';
    const COOKIE_DAYS = 180;
    const CONSENT_CONFIG = {
        granted: {
            'analytics_storage': 'granted',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        },
        denied: {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        }
    };
    
    // DOM elements
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    // Validate DOM elements exist
    if (!banner || !acceptBtn || !declineBtn) {
        console.warn('Cookie banner elements not found in DOM');
        return;
    }

    /**
     * Cookie utilities with improved security
     * Properly decodes cookie values and handles edge cases
     */
    const cookieUtils = {
        /**
         * Get a cookie value by name with proper decoding
         * @param {string} name - Cookie name
         * @returns {string|null} - Decoded cookie value or null
         */
        get(name) {
            try {
                const nameEQ = `${name}=`;
                const cookies = document.cookie.split(';');

                for (let cookie of cookies) {
                    cookie = cookie.trim();
                    if (cookie.startsWith(nameEQ)) {
                        return decodeURIComponent(cookie.substring(nameEQ.length));
                    }
                }
                return null;
            } catch (error) {
                console.warn(`Error reading cookie "${name}":`, error);
                return null;
            }
        },
        
        /**
         * Set a cookie with proper encoding
         * @param {string} name - Cookie name
         * @param {string} value - Cookie value
         * @param {number} days - Days until expiration
         */
        set(name, value, days) {
            try {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                const expires = `expires=${date.toUTCString()}`;
                const encodedValue = encodeURIComponent(value);
                document.cookie = `${name}=${encodedValue};${expires};path=/`;
            } catch (error) {
                console.error(`Error setting cookie "${name}":`, error);
            }
        }
    };
    
    /**
     * Update Google Analytics consent with error handling
     * @param {string} consentLevel - 'granted' or 'denied'
     */
    function updateConsent(consentLevel) {
        try {
            // Check if gtag is available (from Google Analytics script)
            if (typeof window.gtag === 'function') {
                const config = CONSENT_CONFIG[consentLevel];
                if (config) {
                    window.gtag('consent', 'update', config);
                }
            }
        } catch (error) {
            console.warn('Google Analytics consent update failed:', error);
        }
    }
    
    /**
     * Handle user consent choice
     * @param {string} consentLevel - 'granted' or 'denied'
     */
    function handleConsent(consentLevel) {
        try {
            cookieUtils.set(COOKIE_NAME, consentLevel, COOKIE_DAYS);
            banner.style.display = 'none';
            updateConsent(consentLevel);
        } catch (error) {
            console.error('Error handling consent:', error);
        }
    }
    
    /**
     * Initialize the cookie banner
     */
    function init() {
        try {
            const consent = cookieUtils.get(COOKIE_NAME);

            // Show banner if no previous consent
            if (!consent) {
                banner.style.display = 'block';
            } else if (consent === 'granted') {
                // Reapply consent on page reload
                updateConsent('granted');
            }

            // Attach event listeners
            acceptBtn.addEventListener('click', () => handleConsent('granted'));
            declineBtn.addEventListener('click', () => handleConsent('denied'));
        } catch (error) {
            console.error('Cookie banner initialization failed:', error);
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();