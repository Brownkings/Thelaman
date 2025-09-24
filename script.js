// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Handle hash links (both #services and index.html#services)
        if (href.includes('#')) {
            e.preventDefault();
            
            const hash = href.split('#')[1];
            const target = document.getElementById(hash);
            
            // If link points to index.html but we're not there
            if (href.includes('index.html') && !window.location.pathname.endsWith('index.html')) {
                window.location.href = 'index.html#' + hash;
                return;
            }
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, '#' + hash);
                
                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !service || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create mailto link
        const subject = `Inquiry about ${service} service`;
        const body = `Dear Thelaman Holdings,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;
        
        const mailtoLink = `mailto:Thelamanholdings@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your inquiry! Your email client should open with a pre-filled message.');
        
        // Reset form
        this.reset();
    });
}

// Animate service cards on scroll
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

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Load images
    loadServiceImages();
});

// Function to load service images
function loadServiceImages() {
    const imageMapping = {
        'toilets-img': 'attached_assets/stock_images/portable_toilet_cons_1e701ebe.jpg',
        'civil-img': 'attached_assets/stock_images/civil_engineering_co_34bed14f.jpg',
        'building-img': 'attached_assets/stock_images/building_constructio_9f71bfb3.jpg',
        'maintenance-img': 'attached_assets/stock_images/industrial_cleaning__9cdec6f8.jpg',
        'about-img': 'attached_assets/stock_images/construction_site_wo_b8c5e299.jpg'
    };
    
    Object.entries(imageMapping).forEach(([id, src]) => {
        const img = document.getElementById(id);
        if (img) {
            img.src = src;
            img.alt = img.alt || 'Service image';
        }
    });
}