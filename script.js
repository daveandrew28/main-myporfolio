// DOM Elements
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const themeToggle = document.getElementById('themeToggle');
const logoImg = document.getElementById('logo-img');
const profilePic = document.getElementById('profile-pic');
const body = document.body;
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

// ========== ADVANCED TYPING ANIMATION ==========
function startTypingAnimation() {
    const words = [
        { text: "Full Stack Developer", color: "#6366f1" },
        { text: "Creative Thinker", color: "#8b5cf6" },
        { text: "Problem Solver", color: "#10b981" },
        { text: "UI/UX Developer", color: "#f59e0b" },
        { text: "Future Game Developer", color: "#ef4444" }
    ];
    
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.typing-animation-wrapper .cursor');
    const typingWrapper = document.querySelector('.typing-animation-wrapper');
    
    // Check if elements exist
    if (!typedTextElement) {
        console.error('Typed text element (.typed-text) not found');
        return;
    }
    
    if (!cursorElement) {
        console.error('Cursor element (.cursor) not found');
        return;
    }
    
    if (!typingWrapper) {
        console.error('Typing wrapper (.typing-animation-wrapper) not found');
        return;
    }
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let isTyping = false;
    let typeInterval;
    
    // Typing speed configuration
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 1500;
    
    // Create word highlight element
    const highlight = document.createElement('div');
    highlight.className = 'word-highlight';
    typingWrapper.appendChild(highlight);
    
    function type() {
        if (isPaused) return;
        
        isTyping = true;
        typingWrapper.classList.add('typing-active');
        
        const currentWord = words[wordIndex];
        
        if (!isDeleting) {
            // Typing forward
            typedTextElement.textContent = currentWord.text.substring(0, charIndex + 1);
            typedTextElement.style.background = `linear-gradient(90deg, ${currentWord.color}, ${getComplementaryColor(currentWord.color)})`;
            typedTextElement.style.webkitBackgroundClip = 'text';
            typedTextElement.style.webkitTextFillColor = 'transparent';
            charIndex++;
            
            // Update highlight width
            if (currentWord.text.length > 0) {
                highlight.style.width = `${(charIndex / currentWord.text.length) * 100}%`;
            }
            
            // If word is complete
            if (charIndex === currentWord.text.length) {
                isDeleting = true;
                isPaused = true;
                isTyping = false;
                typingWrapper.classList.remove('typing-active');
                
                // Pause at the end of word
                setTimeout(() => {
                    isPaused = false;
                    type();
                }, pauseTime);
                return;
            }
        } else {
            // Deleting backward
            typedTextElement.textContent = currentWord.text.substring(0, charIndex - 1);
            charIndex--;
            
            // Update highlight width
            if (currentWord.text.length > 0) {
                highlight.style.width = `${(charIndex / currentWord.text.length) * 100}%`;
            }
            
            // If word is fully deleted
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                isPaused = true;
                isTyping = false;
                typingWrapper.classList.remove('typing-active');
                
                // Reset highlight
                highlight.style.width = '0';
                
                // Brief pause before typing next word
                setTimeout(() => {
                    isPaused = false;
                    type();
                }, 500);
                return;
            }
        }
        
        // Calculate next delay (add randomness for natural feel)
        let delay = isDeleting ? deleteSpeed : typeSpeed;
        delay += Math.random() * 30; // Add slight randomness
        
        // Continue animation
        clearTimeout(typeInterval);
        typeInterval = setTimeout(type, delay);
    }
    
    // Helper function to get complementary color
    function getComplementaryColor(hex) {
        try {
            // Convert hex to RGB
            let r = parseInt(hex.slice(1, 3), 16);
            let g = parseInt(hex.slice(3, 5), 16);
            let b = parseInt(hex.slice(5, 7), 16);
            
            // Convert to HSL
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            
            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            
            // Shift hue by 180 degrees
            h = (h + 0.5) % 1;
            
            // Convert back to RGB
            let r2, g2, b2;
            if (s === 0) {
                r2 = g2 = b2 = l; // achromatic
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r2 = hue2rgb(p, q, h + 1/3);
                g2 = hue2rgb(p, q, h);
                b2 = hue2rgb(p, q, h - 1/3);
            }
            
            // Convert to hex
            const toHex = (x) => {
                const hex = Math.round(x * 255).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            
            return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
        } catch (error) {
            console.warn('Error calculating complementary color:', error);
            return '#6366f1'; // Fallback to primary color
        }
    }
    
    // Add skip button
    const skipButton = document.createElement('button');
    skipButton.className = 'skip-animation';
    skipButton.textContent = 'Skip →';
    skipButton.title = 'Skip to next word';
    skipButton.type = 'button';
    skipButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        clearTimeout(typeInterval);
        
        if (isTyping) {
            // Skip current word
            charIndex = isDeleting ? 0 : words[wordIndex].text.length;
            isDeleting = !isDeleting;
            isPaused = false;
            highlight.style.width = '0';
            setTimeout(type, 100);
        }
    });
    
    // Add skip button to container
    const typingContainer = document.querySelector('.typing-container');
    if (typingContainer && !typingContainer.querySelector('.skip-animation')) {
        typingContainer.appendChild(skipButton);
    }
    
    // Initialize first word
    typedTextElement.textContent = '';
    typedTextElement.style.background = `linear-gradient(90deg, ${words[0].color}, ${getComplementaryColor(words[0].color)})`;
    typedTextElement.style.webkitBackgroundClip = 'text';
    typedTextElement.style.webkitTextFillColor = 'transparent';
    
    // Start after initial delay
    setTimeout(() => {
        type();
    }, 1000);
    
    // Pause animation on hover
    typingWrapper.addEventListener('mouseenter', () => {
        isPaused = true;
        cursorElement.style.animation = 'none';
        cursorElement.style.opacity = '1';
        cursorElement.style.boxShadow = '0 0 15px var(--primary)';
    });
    
    typingWrapper.addEventListener('mouseleave', () => {
        isPaused = false;
        cursorElement.style.animation = 'blink 0.8s infinite, pulse 2s infinite, cursorGlow 1.5s infinite';
        // Resume typing after a moment
        setTimeout(type, 100);
    });
    
    // Click to manually trigger animation
    typingWrapper.addEventListener('click', (e) => {
        if (e.target === skipButton || e.target.closest('.skip-animation')) return;
        
        e.stopPropagation();
        e.preventDefault();
        
        clearTimeout(typeInterval);
        
        if (isTyping) {
            // Speed up current animation
            isDeleting = true;
            charIndex = words[wordIndex].text.length;
        } else {
            // Trigger immediate skip to next word
            wordIndex = (wordIndex + 1) % words.length;
            charIndex = 0;
            isDeleting = false;
            isPaused = false;
            highlight.style.width = '0';
        }
        setTimeout(type, 50);
    });
}
// ========== THEME MANAGEMENT ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

function enableDarkMode() {
    body.classList.add('dark-mode');
    isDarkMode = true;
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
    
    if (logoImg) {
        logoImg.src = darkLogo;
        logoImg.alt = 'Dark Logo';
    }
    if (profilePic) {
        profilePic.src = darkProfile;
        profilePic.alt = 'Dark Profile Picture';
    }
    
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    isDarkMode = false;
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    
    if (logoImg) {
        logoImg.src = lightLogo;
        logoImg.alt = 'Light Logo';
    }
    if (profilePic) {
        profilePic.src = lightProfile;
        profilePic.alt = 'Light Profile Picture';
    }
    
    localStorage.setItem('theme', 'light');
}

function toggleTheme() {
    isDarkMode ? disableDarkMode() : enableDarkMode();
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    if (!navLinks || !menuToggle) return;
    
    const isActive = navLinks.classList.toggle('active');
    const menuIcon = menuToggle.querySelector('i');
    
    if (menuIcon) {
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    }
    
    document.body.style.overflow = isActive ? 'hidden' : '';
    
    // Update aria attributes
    menuToggle.setAttribute('aria-expanded', isActive);
    navLinks.setAttribute('aria-hidden', !isActive);
}

function closeMobileMenu() {
    if (!navLinks || !menuToggle) return;
    
    navLinks.classList.remove('active');
    const menuIcon = menuToggle.querySelector('i');
    
    if (menuIcon) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
    
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
}

function setupMobileMenu() {
    if (!menuToggle || !navLinks) return;
    
    // Set initial aria attributes
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
    
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeMobileMenu();
        });
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ========== SMOOTH SCROLLING ==========
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Get navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
                
                if (window.innerWidth <= 768) closeMobileMenu();
            }
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.5rem 0';
        }
        
        // Optional: Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// ========== IMAGE ZOOM FUNCTIONALITY ==========
function openImageModal(imageSrc) {
    if (modal && modalImage) {
        modal.style.display = 'flex';
        modalImage.src = imageSrc;
        modalImage.alt = 'Zoomed image';
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus trap for accessibility
        closeModal.focus();
    }
}

function closeImageModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.setAttribute('aria-hidden', 'true');
    }
}

function setupImageZoom() {
    // Project images
    document.querySelectorAll('.project-img').forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src);
        });
        
        // Add keyboard support
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageModal(this.src);
            }
        });
    });
    
    // Certificate images
    document.querySelectorAll('.certificate-img').forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src);
        });
        
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageModal(this.src);
            }
        });
    });
    
    // Skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.skill-logo');
            if (img) openImageModal(img.src);
        });
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = this.querySelector('.skill-logo');
                if (img) openImageModal(img.src);
            }
        });
    });
    
    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', closeImageModal);
        
        closeModal.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeImageModal();
            }
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeImageModal();
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                closeImageModal();
            }
        });
        
        // Trap focus inside modal
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// ========== ACTIVE NAV LINKS ==========
function setupActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return;
    
    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set initial active link
    setActiveLink();
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill progress bars when visible
                if (entry.target.classList.contains('skill-card')) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    if (skillProgress) {
                        const skillName = entry.target.getAttribute('data-skill');
                        let width = '80%';
                        
                        switch(skillName) {
                            case 'java': width = '85%'; break;
                            case 'mysql': width = '80%'; break;
                            case 'python': width = '75%'; break;
                            case 'html': width = '90%'; break;
                            case 'css': width = '85%'; break;
                            case 'javascript': width = '80%'; break;
                            default: width = '80%';
                        }
                        
                        setTimeout(() => {
                            skillProgress.style.width = width;
                        }, 300);
                    }
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .blog-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ========== SKILLS ANIMATION ==========
function setupSkillsAnimation() {
    const skillsTrack = document.querySelector('.skills-track');
    if (!skillsTrack) return;
    
    const skillsContainer = skillsTrack.closest('.desktop-only');
    
    if (skillsContainer) {
        skillsContainer.addEventListener('mouseenter', () => {
            skillsTrack.style.animationPlayState = 'paused';
        });
        
        skillsContainer.addEventListener('mouseleave', () => {
            skillsTrack.style.animationPlayState = 'running';
        });
    }
    
    function adjustAnimationSpeed() {
        if (!skillsTrack) return;
        
        if (window.innerWidth > 1200) {
            skillsTrack.style.animationDuration = '25s';
        } else if (window.innerWidth > 768) {
            skillsTrack.style.animationDuration = '35s';
        }
    }
    
    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);
    
    // Skill logo click effect
    document.querySelectorAll('.skill-logo').forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const skillCard = this.closest('.skill-card');
            if (!skillCard) return;
            
            const skillIcon = skillCard.querySelector('.skill-icon');
            if (skillIcon) {
                skillIcon.style.transition = 'transform 0.8s ease';
                skillIcon.style.transform = 'rotateY(720deg) scale(1.2)';
                
                setTimeout(() => {
                    skillIcon.style.transform = '';
                    setTimeout(() => {
                        if (skillIcon.style.transition) {
                            skillIcon.style.transition = '';
                        }
                    }, 100);
                }, 800);
            }
        });
        
        // Add keyboard support
        logo.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Skill card hover effect for progress bars
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const progress = this.querySelector('.skill-progress');
            if (progress) {
                const currentWidth = progress.style.width;
                progress.style.transition = 'width 0.8s ease';
                progress.style.width = currentWidth;
            }
        });
        
        // Add focus effect for accessibility
        card.addEventListener('focus', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.2)';
        });
        
        card.addEventListener('blur', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// ========== CONTACT FORM ==========
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const formStatus = document.getElementById('formStatus');
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            errorElement.setAttribute('aria-live', 'assertive');
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
            el.removeAttribute('aria-live');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccess(message) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            formStatus.setAttribute('aria-live', 'polite');
            
            // Announce to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('class', 'sr-only');
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    }
    
    function resetFormState() {
        if (btnText) btnText.style.display = 'inline-block';
        if (btnLoading) btnLoading.style.display = 'none';
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.setAttribute('aria-busy', 'false');
        }
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
        }
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        if (!name) {
            showError('nameError', 'Please enter your name');
            isValid = false;
        }
        
        if (!email) {
            showError('emailError', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message) {
            showError('messageError', 'Please enter your message');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-block';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
        }
        
        // Simulate sending with timeout
        setTimeout(() => {
            const mailtoLink = `mailto:dave.serafin@hcdc.edu.ph?subject=${encodeURIComponent(subject || 'Message from Portfolio')}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            
            // Try to open email client
            try {
                window.location.href = mailtoLink;
                showSuccess('Email client opened! Please send your message.');
            } catch (error) {
                showSuccess('Form submitted successfully! Your message is ready to send.');
            }
            
            contactForm.reset();
            resetFormState();
            
            setTimeout(() => {
                if (formStatus) {
                    formStatus.textContent = '';
                    formStatus.style.display = 'none';
                }
            }, 5000);
        }, 1500);
    });
    
    // Real-time validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
            } else {
                const errorElement = document.getElementById('emailError');
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            }
        });
    }
    
    // Clear errors on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    });
    
    // Add form validation on blur
    contactForm.querySelectorAll('input[required], textarea[required]').forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                const errorId = this.id + 'Error';
                showError(errorId, 'This field is required');
            }
        });
    });
}

// ========== INITIALIZE EVERYTHING ==========
function initializePortfolio() {
    console.log('Portfolio initialized successfully!');
    
    // Initialize theme
    initTheme();
    
    // Setup event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    if (logoImg) {
        logoImg.addEventListener('click', toggleTheme);
        logoImg.setAttribute('role', 'button');
        logoImg.setAttribute('tabindex', '0');
        logoImg.setAttribute('aria-label', 'Toggle theme');
        
        logoImg.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Start animations
    startTypingAnimation();
    
    // Setup functionality
    setupMobileMenu();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupImageZoom();
    setupActiveNavLinks();
    setupScrollAnimations();
    setupSkillsAnimation();
    setupContactForm();
    
    // Initialize navbar padding
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.pageYOffset <= 0) {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 0';
        }
        navbar.style.transition = 'all 0.3s ease';
    }
    
    // Add loading animation for page
    document.body.classList.add('loaded');
    
    // Log initialization
    console.log('All features initialized:', {
        typingAnimation: document.querySelector('.typing-animation-wrapper') ? 'Loaded' : 'Not found',
        mobileMenu: menuToggle ? 'Loaded' : 'Not found',
        contactForm: document.getElementById('contactForm') ? 'Loaded' : 'Not found',
        skillsAnimation: document.querySelector('.skills-track') ? 'Loaded' : 'Not found'
    });
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again, you could restart animations here if needed
        console.log('Page is now visible');
    }
});