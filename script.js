// Mobile Menu Toggle - Works on all pages
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate menu button
        if (navLinks.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth Scroll for Navigation Links - Enhanced for all pages
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (window.innerWidth <= 768 && navLinks && menuBtn) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('nav')?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks && menuBtn) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
    });
});

// Enhanced scroll animations - Mobile optimized
if (!document.querySelector('.legal-page')) {
    const animateElements = document.querySelectorAll('.service-card, .about-content, .testimonial-slider, .stat-item, .footer-section');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = window.innerWidth <= 768 ? index * 50 : index * 100;
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, delay);
            }
        });
    }, {
        threshold: window.innerWidth <= 768 ? 0.05 : 0.1,
        rootMargin: window.innerWidth <= 768 ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        element.classList.add('fade-in');
        animateObserver.observe(element);
    });
}

// Enhanced Service Card Effects - Mobile optimized
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    
    // Only add complex hover effects on non-touch devices
    if (!('ontouchstart' in window)) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    }
    
    // Simple click effect for all devices
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            if ('ontouchstart' in window) {
                this.style.transform = 'scale(1)';
            } else {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }
        }, 200);
    });
});

// Adjust content padding for navbar - Works on all pages
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        function adjustPadding() {
            const navHeight = nav.offsetHeight;
            // Only adjust for main page, not legal pages
            if (!document.querySelector('.legal-page')) {
                document.body.style.paddingTop = navHeight + 'px';
            }
        }
        
        adjustPadding();
        
        // Re-adjust on window resize
        window.addEventListener('resize', adjustPadding);
    }
});

// Enhanced Navbar with scroll effects - Mobile optimized
let ticking = false;

function updateNavbar() {
    const nav = document.querySelector('nav');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
    
    // Only apply parallax on desktop and main page
    if (window.innerWidth > 768 && !document.querySelector('.legal-page')) {
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Enhanced social media icons effects - Touch friendly
document.querySelectorAll('.social-links a').forEach((link, index) => {
    if ('ontouchstart' in window) {
        // Touch device - simpler interactions
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    } else {
        // Desktop - hover effects
        link.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    }
});

// Testimonial Slider - Only on main page
if (!document.querySelector('.legal-page')) {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoSlideInterval;

    // Hide all slides except the first one
    function showSlide(n) {
        testimonialSlides.forEach((slide, index) => {
            if (index === n) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === n) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (testimonialSlides.length > 0) {
        // Initialize slider
        showSlide(currentSlide);

        // Click event for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                // Reset auto slide timer
                clearInterval(autoSlideInterval);
                startAutoSlide();
            });
        });

        // Auto slide function
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialSlides.length;
                showSlide(currentSlide);
            }, 5000);
        }

        // Start auto slide
        startAutoSlide();

        // Pause auto slide when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(autoSlideInterval);
            } else {
                startAutoSlide();
            }
        });
    }
}

// Form submission - Enhanced validation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input');
        const email = emailInput.value.trim();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && emailRegex.test(email)) {
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                button.innerHTML = originalText;
                button.style.background = '';
            }, 1000);
        } else {
            // Show error
            emailInput.style.borderColor = '#dc3545';
            emailInput.placeholder = 'Please enter a valid email';
            
            setTimeout(() => {
                emailInput.style.borderColor = '';
                emailInput.placeholder = 'Enter your email';
            }, 3000);
        }
    });
}

// Enhanced page initialization - Mobile optimized
document.addEventListener('DOMContentLoaded', function() {
    // Only scroll to home on main page (index.html), not legal pages
    if (!document.querySelector('.legal-page')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Remove any hash from URL on main page only
        if (window.location.hash) {
            history.replaceState(null, null, window.location.pathname);
        }
    }
    
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    document.body.classList.add('loaded');
    
    // Only animate numbers on main page
    if (!document.querySelector('.legal-page')) {
        const statNumbers = document.querySelectorAll('.stat-number');
        const animateNumbers = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseInt(target.textContent.replace(/\D/g, ''));
                    const suffix = target.textContent.replace(/\d/g, '');
                    let current = 0;
                    const increment = finalNumber / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            current = finalNumber;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 30);
                    observer.unobserve(target);
                }
            });
        };
        
        const numberObserver = new IntersectionObserver(animateNumbers, { 
            threshold: window.innerWidth <= 768 ? 0.3 : 0.5 
        });
        statNumbers.forEach(number => numberObserver.observe(number));
    }
    
    // Improve page speed by lazy loading non-critical images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.removeAttribute('data-src');
                    img.removeAttribute('data-srcset');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
        });
    }
}); 
// Cursor trail effect - Performance optimized
function createCursorTrail() {
    const trail = [];
    const trailLength = 6; // Reduced for better performance
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: linear-gradient(45deg, var(--ydm-orange), var(--ydm-teal));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${0.8 - i / trailLength};
            transition: opacity 0.2s ease;
            will-change: transform;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(updateTrail);
        }
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }, index * 8);
        });
        isMoving = false;
    }
}

// Initialize cursor trail on desktop only
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    createCursorTrail();
}

// Add loading and mobile styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
    .touch-device .service-card.touch-active {
        transform: scale(0.98) !important;
        transition: transform 0.2s ease;
    }
    @media (max-width: 768px) {
        .hero {
            min-height: calc(100vh - 80px);
            min-height: calc(var(--vh, 1vh) * 100 - 80px);
        }
    }
`;
document.head.appendChild(loadingStyles);

// Typing effect for tagline - Mobile optimized
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    // Faster typing on mobile
    const mobileSpeed = window.innerWidth <= 768 ? speed * 0.7 : speed;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, mobileSpeed);
        }
    }
    type();
}

// Initialize typing effect - Only on main page
window.addEventListener('load', () => {
    const tagline = document.querySelector('.tagline');
    if (tagline && !document.querySelector('.legal-page')) {
        const originalText = tagline.textContent;
        setTimeout(() => {
            typeWriter(tagline, originalText, 80);
        }, 1500);
    }
});

// Touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    // Add touch class to body for CSS targeting
    document.body.classList.add('touch-device');
    
    // Improve touch interactions for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
    });
}

// Viewport height fix for mobile browsers
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);