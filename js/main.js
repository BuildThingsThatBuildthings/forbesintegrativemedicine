// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Optimize performance by debouncing scroll events
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

    // Header Transformation
    const header = document.querySelector('.header');
    const consultationBtn = document.querySelector('.consultation-btn');
    const floatingHeader = document.querySelector('.floating-header');
    const mainHeader = document.querySelector('.header');
    let lastScroll = 0;
    let ticking = false;

    const updateHeader = () => {
        const currentScroll = window.pageYOffset;
        
        // Handle header visibility
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            requestAnimationFrame(() => {
                floatingHeader.classList.add('visible');
                mainHeader.classList.add('hidden');
            });
        } else if (currentScroll < lastScroll || currentScroll <= 100) {
            // Scrolling up or at top
            if (currentScroll <= 100) {
                requestAnimationFrame(() => {
                    floatingHeader.classList.remove('visible');
                    mainHeader.classList.remove('hidden');
                });
            }
        }

        // Handle consultation button
        requestAnimationFrame(() => {
            if (currentScroll > 0) {
                consultationBtn.classList.add('visible');
            } else {
                consultationBtn.classList.remove('visible');
            }
        });
        
        lastScroll = currentScroll;
        ticking = false;
    };

    const handleScroll = () => {
        if (!ticking) {
            ticking = true;
            updateHeader();
        }
    };

    // Apply debouncing to scroll events
    window.addEventListener('scroll', debounce(handleScroll, 10));

    // Mobile Menu Functionality
    function setupMobileMenu(menuBtn, navContent, navMenu) {
        if (!menuBtn || !navContent || !navMenu) return;

        const toggleMenu = () => {
            menuBtn.classList.toggle('active');
            navContent.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        };

        menuBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navContent.classList.contains('active') && 
                !navContent.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu on resize if screen becomes larger than mobile breakpoint
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768 && navContent.classList.contains('active')) {
                toggleMenu();
            }
        }, 250));
    }

    // Setup mobile menu for main header
    const mainMenuBtn = document.querySelector('.header .mobile-menu-btn');
    const mainNavContent = document.querySelector('.header .nav-content');
    const mainNavMenu = document.querySelector('.header .nav-menu');
    setupMobileMenu(mainMenuBtn, mainNavContent, mainNavMenu);

    // Setup mobile menu for floating header
    const floatingMenuBtn = document.querySelector('.floating-header .mobile-menu-btn');
    const floatingNavContent = document.querySelector('.floating-header .nav-content');
    const floatingNavMenu = document.querySelector('.floating-header .nav-menu');
    setupMobileMenu(floatingMenuBtn, floatingNavContent, floatingNavMenu);

    // Close all menus when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-content.active').forEach(content => {
                const menuBtn = content.parentElement.querySelector('.mobile-menu-btn');
                const navMenu = content.querySelector('.nav-menu');
                if (menuBtn && navMenu) {
                    content.classList.remove('active');
                    menuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    });

    // Floating Consultation Button
    const floatingBtn = document.querySelector('.floating-consultation');

    const handleFloatingBtnScroll = () => {
        const currentScroll = window.pageYOffset;
        
        // Only update if scroll position changed significantly
        if (Math.abs(currentScroll - lastScroll) > 5) {
            if (currentScroll > 0) {
                floatingBtn.classList.add('visible');
            } else {
                floatingBtn.classList.remove('visible');
            }
            lastScroll = currentScroll;
        }
    };

    window.addEventListener('scroll', debounce(handleFloatingBtnScroll, 10));

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                const navContent = document.querySelector('.nav-content');
                const navMenu = document.querySelector('.nav-menu');
                if (navContent.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navContent.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const wasActive = this.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            });

            // If the clicked item wasn't active, open it
            if (!wasActive) {
                this.classList.add('active');
                const answer = this.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Gather form data
            const formData = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                service: this.service.value,
                message: this.message.value
            };

            try {
                // Here you would typically send the data to your server
                // For now, we'll just simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                this.reset();
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again later.');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Testimonials Carousel
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialTrack && testimonialCards.length) {
        let currentSlide = 0;
        const totalSlides = testimonialCards.length;
        
        // Create dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        // Initialize first slide
        updateSlides();
        
        // Event listeners
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlides();
        });
        
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlides();
        });
        
        // Auto advance slides
        let autoAdvance = setInterval(autoAdvanceSlides, 5000);
        
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(autoAdvanceSlides, 5000);
        });
        
        function autoAdvanceSlides() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlides();
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }
        
        function updateSlides() {
            // Update track position
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active states
            testimonialCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentSlide);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }

    // Highlight animation on scroll
    function handleHighlightAnimation() {
        const highlights = document.querySelectorAll('.cta .highlight');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        highlights.forEach(highlight => observer.observe(highlight));
    }

    handleHighlightAnimation();
});
