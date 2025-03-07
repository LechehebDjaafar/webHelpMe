document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const header = document.querySelector('.header');
    const statsNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    
    // ======================================
    // Mobile Navigation Toggle
    // ======================================
    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile nav when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            navToggle.querySelector('i').classList.add('fa-bars');
            navToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // ======================================
    // Sticky Header on Scroll
    // ======================================
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // ======================================
    // FAQ Accordions
    // ======================================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const currentlyActive = document.querySelector('.faq-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            item.classList.toggle('active');
        });
    });
    
    // ======================================
    // Testimonials Slider
    // ======================================
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        // Update current testimonial index
        currentTestimonial = index;
    }
    
    // Event listeners for dots
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Event listeners for prev/next buttons
    testimonialPrev.addEventListener('click', function() {
        let index = currentTestimonial - 1;
        if (index < 0) index = testimonialItems.length - 1;
        showTestimonial(index);
    });
    
    testimonialNext.addEventListener('click', function() {
        let index = currentTestimonial + 1;
        if (index >= testimonialItems.length) index = 0;
        showTestimonial(index);
    });
    
    // Auto rotate testimonials every 5 seconds
    setInterval(function() {
        let index = currentTestimonial + 1;
        if (index >= testimonialItems.length) index = 0;
        showTestimonial(index);
    }, 5000);
    
    // ======================================
    // Animated Counter for Stats
    // ======================================
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    let counted = false;
    
    function animateCounters() {
        if (counted) return;
        
        const statsSection = document.querySelector('.stats');
        
        if (isInViewport(statsSection)) {
            statsNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 20)); // Update every 20ms
                
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        stat.textContent = current.toLocaleString();
                    }
                }, 20);
            });
            
            counted = true;
        }
    }
    
    // Initial check and scroll event listener
    animateCounters();
    window.addEventListener('scroll', animateCounters);
    
    // ======================================
    // Smooth Scrolling for Nav Links
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // ======================================
    // Contact Form Submission
    // ======================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For demonstration, we'll just show an alert
            alert('شكرًا لتواصلك معنا! سنرد عليك قريبًا.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ======================================
    // Emergency Button Animation
    // ======================================
    const emergencyBtn = document.querySelector('.emergency-btn');
    
    if (emergencyBtn) {
        // Pulse animation effect
        setInterval(() => {
            emergencyBtn.classList.add('pulse');
            
            setTimeout(() => {
                emergencyBtn.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }
    
    // ======================================
    // Lazy Loading for Images
    // ======================================
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
    
    // ======================================
    // Back to Top Button
    // ======================================
    const backToTopBtn = document.createElement('div');git
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
});