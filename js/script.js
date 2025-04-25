// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    }

    // Initial check and scroll event listener
    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);

    // Skill Progress Animation
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                bar.style.width = `${progress}%`;
            }
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-text, .skill-progress, .project-card, .service-card').forEach(el => {
        if (el) {
            observer.observe(el);
        }
    });

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }

        // Initial check and scroll event listener
        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop);

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Slideshow functionality
    const slideshowWrappers = document.querySelectorAll('.slideshow-wrapper');
    
    slideshowWrappers.forEach(slideshowWrapper => {
        const slides = slideshowWrapper.querySelectorAll('.slideshow-image');
        const prevButton = slideshowWrapper.parentElement.querySelector('.slideshow-nav.prev');
        const nextButton = slideshowWrapper.parentElement.querySelector('.slideshow-nav.next');
        
        if (slides.length > 0 && prevButton && nextButton) {
            let currentSlide = 0;
            const totalSlides = slides.length;

            // Function to update slideshow position with smooth transition
            function updateSlideshow() {
                const slideWidth = 100 / totalSlides; // Calculate width for each slide
                slideshowWrapper.style.transition = 'transform 0.5s ease-in-out';
                slideshowWrapper.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            }

            // Function to handle slide change
            function changeSlide(direction) {
                currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
                updateSlideshow();
            }

            // Navigation button click handlers
            prevButton.addEventListener('click', () => changeSlide(-1));
            nextButton.addEventListener('click', () => changeSlide(1));

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    changeSlide(-1);
                } else if (e.key === 'ArrowRight') {
                    changeSlide(1);
                }
            });

            // Touch swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            slideshowWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            slideshowWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        changeSlide(1); // Swipe left
                    } else {
                        changeSlide(-1); // Swipe right
                    }
                }
            }

            // Initialize first slide
            updateSlideshow();

            // Add slide indicators
            const indicators = document.createElement('div');
            indicators.className = 'slideshow-indicators';
            
            slides.forEach((_, index) => {
                const indicator = document.createElement('span');
                indicator.className = 'indicator';
                if (index === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', () => {
                    currentSlide = index;
                    updateSlideshow();
                    updateIndicators();
                });
                
                indicators.appendChild(indicator);
            });

            slideshowWrapper.parentElement.appendChild(indicators);

            // Function to update indicators
            function updateIndicators() {
                const indicators = slideshowWrapper.parentElement.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }

            // Update indicators when slide changes
            slideshowWrapper.addEventListener('transitionend', updateIndicators);
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Add your form submission logic here
        console.log('Form submitted:', formValues);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

// Typing Animation for Hero Text
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing animation when page loads
    window.addEventListener('load', () => {
        typeWriter();
    });
}

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });
}

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    }
});

// Add scroll to top button styles
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: var(--transition);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .dark-mode-toggle {
        position: fixed;
        bottom: 20px;
        right: 80px;
        background: var(--gradient);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: var(--transition);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .dark-mode-toggle:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .success-message {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gradient);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(scrollToTopStyle);
