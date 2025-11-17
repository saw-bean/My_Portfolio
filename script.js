// Optimized JavaScript with modern ES6+ features
class PortfolioApp {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.sections = document.querySelectorAll('.section, .hero');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupNavbar();
        this.setupActiveNavigation();
        this.setupAnimations();
        this.setupParallax();
        this.setupLazyLoading();
    }

    // Smooth scroll with requestAnimationFrame for better performance
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    this.smoothScrollTo(targetPosition);
                }
            });
        });
    }

    smoothScrollTo(target) {
        const start = window.pageYOffset;
        const distance = target - start;
        const duration = 800;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    // Throttled scroll handler for navbar
    setupNavbar() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll > 50) {
                        this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                        this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                    } else {
                        this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        this.navbar.style.boxShadow = 'none';
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Active navigation highlighting
    setupActiveNavigation() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let current = '';
                    
                    this.sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        if (window.pageYOffset >= sectionTop - 150) {
                            current = section.getAttribute('id');
                        }
                    });

                    this.navLinks.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === `#${current}`) {
                            link.style.color = 'var(--apple-blue)';
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Intersection Observer for fade-in animations - simplified
    setupAnimations() {
        // Disable animations for stability - content is always visible
        // Can be re-enabled later if needed
        return;
        
        // Original animation code (disabled)
        /*
        if (!('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section, .content-box, .experience-item, .project-item, .education-item, .skill-category').forEach(el => {
            observer.observe(el);
        });
        */
    }

    // Parallax effect with throttling - disabled to prevent issues
    setupParallax() {
        // Parallax disabled for stability
        // Can be re-enabled if needed with reduced intensity
    }

    // Native lazy loading with fallback
    setupLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[src]');
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.loading = 'lazy';
                }
            });
        } else {
            // Fallback for older browsers
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize app when DOM is ready
function initApp() {
    try {
        // Ensure all content is visible and remove any inline opacity styles
        const allContent = document.querySelectorAll('*');
        allContent.forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '';
            }
        });
        
        new PortfolioApp();
    } catch (error) {
        console.error('Error initializing portfolio app:', error);
        // Fallback: ensure everything is visible
        const allContent = document.querySelectorAll('*');
        allContent.forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '';
            }
        });
        
        // Basic functionality without advanced features
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
