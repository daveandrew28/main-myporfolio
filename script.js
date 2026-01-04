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
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

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

// Mobile Menu Functions
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    const menuIcon = menuToggle.querySelector('i');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    const menuIcon = menuToggle.querySelector('i');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
    document.body.style.overflow = '';
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
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
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            }
        });
    });
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    if (!navbar) return;
    
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
}

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
function setupImageZoom() {
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
}

// Active navigation link on scroll
function setupActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add parallax effect to hero section
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Animation for cards on scroll
function setupScrollAnimations() {
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
    document.querySelectorAll('.skill-card, .project-card, .certificate-card, .blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Setup Mobile Menu
function setupMobileMenu() {
    if (!menuToggle || !navLinks) return;
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize if switching to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

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
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup navbar scroll effects
    setupNavbarScroll();
    
    // Setup image zoom functionality
    setupImageZoom();
    
    // Setup active navigation links
    setupActiveNavLinks();
    
    // Setup parallax effect
    setupParallaxEffect();
    
    // Setup scroll animations
    setupScrollAnimations();
});