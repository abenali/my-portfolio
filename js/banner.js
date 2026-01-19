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
    
    // Cookie utilities
    const cookieUtils = {
        get(name) {
            const cookieString = document.cookie.split('; ')
                .find(row => row.startsWith(name + '='));
            return cookieString ? cookieString.split('=')[1] : null;
        },
        
        set(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
        }
    };
    
    // Google Analytics consent update
    function updateConsent(consentLevel) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', CONSENT_CONFIG[consentLevel]);
        }
    }
    
    // Handle consent choice
    function handleConsent(consentLevel) {
        cookieUtils.set(COOKIE_NAME, consentLevel, COOKIE_DAYS);
        banner.style.display = 'none';
        updateConsent(consentLevel);
    }
    
    // Initialize banner
    function init() {
        const consent = cookieUtils.get(COOKIE_NAME);
        
        if (!consent) {
            banner.style.display = 'block';
        } else if (consent === 'granted') {
            updateConsent('granted');
        }
        
        // Event listeners
        acceptBtn.addEventListener('click', () => handleConsent('granted'));
        declineBtn.addEventListener('click', () => handleConsent('denied'));
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();