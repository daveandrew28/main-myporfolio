// DOM Elements
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const themeToggle = document.getElementById('themeToggle');
const logoImg = document.getElementById('logo-img');
const profilePic = document.getElementById('profile-pic');
const body = document.body;
const typingText = document.getElementById('typing-text');
const cursor = document.querySelector('.cursor');

// Theme state
let isDarkMode = false;

// Logo images
const lightLogo = 'images/logo/rikia2.jpg';
const darkLogo = 'images/logo/rukia2.jpg';

// Profile images
const lightProfile = 'images/My profile/dave.png';
const darkProfile = 'images/My profile/dave2.jpg';

// Typing Animation
function startTypingAnimation() {
    if (!typingText) return;
    
    const text = "UI/UX Developer";
    let charIndex = 0;
    let isTypingForward = true;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        if (isTypingForward) {
            // Typing forward
            if (charIndex <= text.length) {
                typingText.textContent = text.substring(0, charIndex);
                charIndex++;
                setTimeout(type, 150);
            } else {
                // Finished typing, pause then delete
                isTypingForward = false;
                setTimeout(() => {
                    isPaused = false;
                    type();
                }, 1500); // Pause at full text
                isPaused = true;
            }
        } else {
            // Deleting
            if (charIndex >= 0) {
                typingText.textContent = text.substring(0, charIndex);
                charIndex--;
                setTimeout(type, 100);
            } else {
                // Finished deleting, pause then type again
                isTypingForward = true;
                setTimeout(() => {
                    isPaused = false;
                    type();
                }, 500); // Pause at empty
                isPaused = true;
            }
        }
    }
    
    // Start animation after 1 second delay
    setTimeout(type, 1000);
}

// Check for saved theme preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

// Enable dark mode
function enableDarkMode() {
    body.classList.add('dark-mode');
    isDarkMode = true;
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    
    // Change logo
    if (logoImg) {
        logoImg.src = darkLogo;
        logoImg.alt = 'Dark Mode Logo';
    }
    
    // Change profile picture
    if (profilePic) {
        profilePic.src = darkProfile;
    }
    
    // Save to localStorage
    localStorage.setItem('theme', 'dark');
}

// Disable dark mode
function disableDarkMode() {
    body.classList.remove('dark-mode');
    isDarkMode = false;
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Change logo
    if (logoImg) {
        logoImg.src = lightLogo;
        logoImg.alt = 'Logo';
    }
    
    // Change profile picture
    if (profilePic) {
        profilePic.src = lightProfile;
    }
    
    // Save to localStorage
    localStorage.setItem('theme', 'light');
}

// Toggle theme
function toggleTheme() {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Logo click to toggle theme
function setupLogoClick() {
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', toggleTheme);
        logo.style.cursor = 'pointer';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '1rem 0';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0.5rem 0';
    }
    
    lastScroll = currentScroll;
});

// Image zoom functionality
function openImageModal(imageSrc) {
    if (modal && modalImage) {
        modal.style.display = 'flex';
        modalImage.src = imageSrc;
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Add click event to all project images
document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', function() {
        openImageModal(this.src);
    });
});

// Add click event to all certificate images
document.querySelectorAll('.certificate-img').forEach(img => {
    img.addEventListener('click', function() {
        openImageModal(this.src);
    });
});

// Add click event to all skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('.skill-logo');
        if (img) {
            openImageModal(img.src);
        }
    });
});

// Close modal when clicking the X
if (closeModal) {
    closeModal.addEventListener('click', closeImageModal);
}

// Close modal when clicking outside the image
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeImageModal();
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Animation for cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, .certificate-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Initialize theme
    initTheme();
    
    // Setup theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Setup logo click
    setupLogoClick();
    
    // Start typing animation
    startTypingAnimation();
});