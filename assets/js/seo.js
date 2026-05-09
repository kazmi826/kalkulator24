/**
 * SEO Optimization JavaScript
 * Lazy loading, performance optimization, and analytics tracking
 */

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Internal link tracking for analytics
function initLinkTracking() {
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track internal link clicks
            const href = this.getAttribute('href');
            const linkText = this.textContent.trim();
            
            // Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'internal_link_click', {
                    link_url: href,
                    link_text: linkText
                });
            }
            
            // Track in local storage for analytics
            const linkData = JSON.parse(localStorage.getItem('linkClicks') || '[]');
            linkData.push({
                url: href,
                text: linkText,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('linkClicks', JSON.stringify(linkData));
        });
    });
}

// Page load performance optimization
function optimizePageLoad() {
    // Defer non-critical CSS
    const criticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    criticalCSS.forEach(link => {
        link.rel = 'preload';
        link.as = 'style';
        link.onload = function() {
            this.rel = 'stylesheet';
        };
    });

    // Preload important resources
    const preloadResources = [
        { href: '/assets/css/style.css', as: 'style' },
        { href: '/assets/js/calc.js', as: 'script' }
    ];
    
    preloadResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}

// SEO-friendly URL handling
function initSEOURLs() {
    // Ensure trailing slashes for consistency
    if (window.location.pathname === '/' || !window.location.pathname.endsWith('/')) {
        // Keep as is for root and non-directory URLs
    }
    
    // Track page views
    const pageData = {
        url: window.location.pathname,
        title: document.title,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // Store page view data
    const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
    pageViews.push(pageData);
    
    // Keep only last 100 page views
    if (pageViews.length > 100) {
        pageViews.splice(0, pageViews.length - 100);
    }
    
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
    
    // Send to Google Analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: window.location.pathname
        });
    }
}

// Search engine optimization helpers
function initSEOHelpers() {
    // Add structured data for breadcrumbs if not present
    if (!document.querySelector('[type="application/ld+json"]')) {
        const breadcrumbs = document.querySelector('.breadcrumb');
        if (breadcrumbs) {
            const breadcrumbLinks = breadcrumbs.querySelectorAll('a');
            const breadcrumbList = [];
            
            breadcrumbLinks.forEach((link, index) => {
                breadcrumbList.push({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": link.textContent.trim(),
                    "item": window.location.origin + link.getAttribute('href')
                });
            });
            
            const structuredData = document.createElement('script');
            structuredData.type = 'application/ld+json';
            structuredData.textContent = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbList
            });
            
            document.head.appendChild(structuredData);
        }
    }
    
    // Add meta description if missing
    if (!document.querySelector('meta[name="description"]')) {
        const firstParagraph = document.querySelector('p');
        if (firstParagraph) {
            const metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            metaDesc.content = firstParagraph.textContent.substring(0, 160);
            document.head.appendChild(metaDesc);
        }
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
                if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
                if (entry.entryType === 'layout-shift') {
                    console.log('CLS:', entry.value);
                }
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
}

// Initialize all SEO optimizations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initLinkTracking();
    optimizePageLoad();
    initSEOURLs();
    initSEOHelpers();
    initPerformanceMonitoring();
});

// Initialize some optimizations immediately
(function() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        if (!img.src || img.src === window.location.href) {
            img.loading = 'lazy';
        }
    });
    
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontPreload.as = 'style';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);
})();

// Export functions for external use if needed
window.SEO = {
    initLazyLoading,
    initLinkTracking,
    optimizePageLoad,
    initSEOURLs,
    initSEOHelpers,
    initPerformanceMonitoring
};
