// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Header Transformation
    const header = document.querySelector('.header');
    const consultationBtn = document.querySelector('.consultation-btn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
            header.classList.add('scrolled');
            consultationBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            consultationBtn.classList.remove('visible');
        }
    });

    // Floating Consultation Button
    const floatingBtn = document.querySelector('.floating-consultation');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    });

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

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContent = document.querySelector('.nav-content');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navContent.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContent.contains(e.target) && !mobileMenuBtn.contains(e.target) && navContent.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navContent.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

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
});
