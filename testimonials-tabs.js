// Testimonials page tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonialTabs = document.querySelectorAll('.testimonial-tab');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs
            testimonialTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide testimonial cards based on category
            testimonialCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});