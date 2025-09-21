document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step, .feature, .testimonial');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effect to CTA button
    const ctaButton = document.querySelector('.cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Add counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const animateCounter = (element, target) => {
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target > 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K+';
            } else if (target > 1000000) {
                element.textContent = '$' + (current / 1000000).toFixed(1) + 'M+';
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 20);
    };

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const text = statElement.textContent;

                if (text.includes('$2.3M+')) {
                    animateCounter(statElement, 2300000);
                } else if (text.includes('15,000+')) {
                    animateCounter(statElement, 15000);
                } else if (text.includes('94%')) {
                    animateCounter(statElement, 94);
                }

                statsObserver.unobserve(statElement);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Video placeholder click handler
    const videoPlaceholder = document.querySelector('.video-frame');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Placeholder for video modal or redirect to actual video
            alert('Video coming soon! This would open a demo video showing real success stories.');
        });
    }
});