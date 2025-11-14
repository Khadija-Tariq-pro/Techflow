// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggle(savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeToggle('dark');
    }
}

function updateThemeToggle(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

// Mobile Navigation
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll for Navigation Links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                closeMobileNav();
            }
        });
    });
}

// Testimonials Slider
let currentSlideIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % testimonials.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

function initializeTestimonialSlider() {
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    showSlide(0);
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    clearError('name');
    clearError('email');
    clearError('message');
    
    // Validate name
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    if (validateContactForm()) {
        // Simulate form submission
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll('.feature-card, .testimonial, .pricing-card, .stat');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Button Hover Effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Toggle mobile menu with Enter key when hamburger is focused
        if (e.key === 'Enter' && document.activeElement === hamburger) {
            toggleMobileNav();
        }
        
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileNav();
        }
        
        // Navigate testimonials with arrow keys when dots are focused
        if (document.activeElement.classList.contains('dot')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const currentIndex = Array.from(dots).indexOf(document.activeElement);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
                currentSlide(prevIndex + 1);
                dots[prevIndex].focus();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const currentIndex = Array.from(dots).indexOf(document.activeElement);
                const nextIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
                currentSlide(nextIndex + 1);
                dots[nextIndex].focus();
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();
    
    // Initialize navigation
    initializeSmoothScroll();
    
    // Initialize testimonial slider
    initializeTestimonialSlider();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize button effects
    initializeButtonEffects();
    
    // Initialize keyboard navigation
    initializeKeyboardNavigation();
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileNav);
    contactForm.addEventListener('submit', handleContactFormSubmit);
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    // Close mobile nav when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
    
    // Add focus styles for better accessibility
    document.addEventListener('focusin', (e) => {
        if (e.target.matches('button, a, input, textarea, select')) {
            e.target.style.outline = '2px solid var(--primary-color)';
            e.target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.matches('button, a, input, textarea, select')) {
            e.target.style.outline = '';
            e.target.style.outlineOffset = '';
        }
    });
});

// Real-time form validation
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            const name = nameInput.value.trim();
            if (name && name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
            } else {
                clearError('name');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
            } else {
                clearError('email');
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', () => {
            const message = messageInput.value.trim();
            if (message && message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
            } else {
                clearError('message');
            }
        });
    }
});

// Expose currentSlide function globally for dot navigation
window.currentSlide = currentSlide;