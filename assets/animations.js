// ==================== Smooth Scroll ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Intersection Observer for Scroll Animations ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.classList.add('scale-in');
    observer.observe(card);
});

// ==================== Navbar Effects ==================== //
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 82, 204, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 82, 204, 0.2)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== Button Ripple Effect ==================== //
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== Active Navigation Link ==================== //
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Counter Animation ==================== //
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observe counters if they exist
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const end = parseInt(entry.target.getAttribute('data-target')) || 0;
            animateValue(entry.target, 0, end, 2000);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(element => {
    counterObserver.observe(element);
});

// ==================== Mouse Move Effect ==================== //
const heroSection = document.querySelector('.hero');
if (heroSection) {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth) * 10;
        const moveY = (e.clientY / window.innerHeight) * 10;
        heroSection.style.backgroundPosition = `${moveX}% ${moveY}%`;
    });
}

// ==================== Video Lazy Loading ==================== //
const videos = document.querySelectorAll('iframe');
videos.forEach(video => {
    video.classList.add('lazy-video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.style.opacity = '0';
                setTimeout(() => {
                    video.style.opacity = '1';
                }, 100);
                observer.unobserve(video);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(video);
});

// ==================== Stagger Animation for Cards ==================== //
const staggerAnimation = (elements, delay = 100) => {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delay}ms`;
    });
};

staggerAnimation(document.querySelectorAll('.feature-card'), 150);

// ==================== Page Load Animation ==================== //
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add a class when document is ready
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dom-ready');
});
