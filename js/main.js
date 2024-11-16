// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContent = document.querySelector('.nav-content');
    
    if (mobileMenuBtn && navContent) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navContent.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContent.contains(e.target) && !mobileMenuBtn.contains(e.target) && navContent.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navContent.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Scroll Header Transformation
    const header = document.querySelector('.header');
    const floatingHeader = document.querySelector('.floating-header');
    let lastScroll = 0;
    let scrollThreshold = 100; // Adjust this value to control when the transformation happens

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Show/hide floating header based on scroll direction and threshold
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll) {
                // Scrolling down
                header.classList.add('scrolled');
                floatingHeader.classList.add('visible');
            } else {
                // Scrolling up
                header.classList.remove('scrolled');
                floatingHeader.classList.remove('visible');
            }
        } else {
            // At the top
            header.classList.remove('scrolled');
            floatingHeader.classList.remove('visible');
        }

        lastScroll = currentScroll;
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
});
