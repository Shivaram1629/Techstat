/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show - validate if constant exists
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden - validate if constant exists
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== TESTIMONIALS SLIDER ===============*/
class TestimonialsSlider {
    constructor() {
        this.slider = document.querySelector('.testimonials__wrapper');
        this.slides = document.querySelectorAll('.testimonial__card');
        this.dots = document.querySelectorAll('.testimonials__dot');
        this.currentSlide = 0;
        this.maxSlides = this.slides.length;

        this.init();
    }

    init() {
        this.goToSlide(0);
        this.createDotHandlers();
        this.autoSlide();
    }

    goToSlide(slide) {
        this.slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`;
        });

        // Update active dot
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[slide].classList.add('active');
    }

    nextSlide() {
        if (this.currentSlide === this.maxSlides - 1) {
            this.currentSlide = 0;
        } else {
            this.currentSlide++;
        }
        this.goToSlide(this.currentSlide);
    }

    prevSlide() {
        if (this.currentSlide === 0) {
            this.currentSlide = this.maxSlides - 1;
        } else {
            this.currentSlide--;
        }
        this.goToSlide(this.currentSlide);
    }

    createDotHandlers() {
        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                this.currentSlide = i;
                this.goToSlide(i);
            });
        });
    }

    autoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
});

/*=============== SMOOTH SCROLLING FOR ANCHOR LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.QuerySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('.contact__form-button');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

/*=============== LOADING ANIMATION ===============*/
window.addEventListener('load', () => {
    // Add any loading animations or initialize other components here
    document.body.classList.add('loaded');
});

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.features__card, .testimonial__card, .about__data, .contact__form');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

/*=============== HERO STATS COUNTER ANIMATION ===============*/
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Initialize counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.hero__stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, number);
                }
            });
        }
    });
}, {
    threshold: 0.5
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollUp = debounce(scrollUp, 10);
const debouncedScrollActive = debounce(scrollActive, 10);

// Replace existing scroll listeners
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);
window.removeEventListener('scroll', scrollActive);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollUp);
window.addEventListener('scroll', debouncedScrollActive);

/*=============== KEYBOARD NAVIGATION ===============*/
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

/*=============== FOCUS MANAGEMENT ===============*/
// Trap focus in mobile menu when open
const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
};

// Apply focus trap to mobile menu
if (navMenu) {
    trapFocus(navMenu);
}

/*=============== LAZY LOADING FOR IMAGES ===============*/
// This would be used if we had actual images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could send error reports to a logging service here
});

/*=============== CONSOLE WELCOME MESSAGE ===============*/
console.log('%c🚀 ModernTech Landing Page', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with modern web technologies', 'color: #64748b; font-size: 14px;');
console.log('%cFor support, contact: hello@moderntech.com', 'color: #64748b; font-size: 12px;');
