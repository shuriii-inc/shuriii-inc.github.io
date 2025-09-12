// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Remove no-js class
    document.documentElement.classList.remove('no-js');
    
    // initialize all functionality
    initializeNavigation();
    initializeThemeToggle();
    initializeFAQ();
    initializeProcessTabs();
    initializeSmoothScrolling();
    initializeBackToTop();
    initializeMobileMenu();
    initializeProductImageModal();
});

// dark-light theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    // update toggle icon based on current theme
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle-icon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.src = 'assets/icons/light-theme-icon.svg';
            themeIcon.setAttribute('alt', 'Switch to light mode');
        } else {
            themeIcon.src = 'assets/icons/dark-theme-icon.svg';
            themeIcon.setAttribute('alt', 'Switch to dark mode');
        }
    }
}

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqContent = faqAnswer.querySelector('.faq-content');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // close all other FAQ items with smooth animation
            // faqQuestions.forEach(otherQuestion => {
            //     if (otherQuestion !== this) {
            //         const otherAnswer = otherQuestion.parentElement.querySelector('.faq-answer');
            //         otherQuestion.setAttribute('aria-expanded', 'false');
                    
            //         // smooth close animation
            //         otherAnswer.style.maxHeight = otherAnswer.scrollHeight + 'px';
            //         requestAnimationFrame(() => {
            //             otherAnswer.style.maxHeight = '0px';
            //             otherAnswer.classList.remove('open');
            //         });
            //     }
            // });
            
            // toggle current FAQ item with smooth animation
            if (isExpanded) {
                // closing animation
                this.setAttribute('aria-expanded', 'false');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    faqAnswer.style.maxHeight = '0px';
                    faqAnswer.classList.remove('open');
                });
            } else {
                // opening animation
                this.setAttribute('aria-expanded', 'true');
                faqAnswer.classList.add('open');
                
                // calculate the actual height needed
                const contentHeight = faqContent.scrollHeight;
                const paddingHeight = 40; // approximate padding
                const totalHeight = contentHeight + paddingHeight;
                
                faqAnswer.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    faqAnswer.style.maxHeight = totalHeight + 'px';
                    
                    // reset to auto after animation completes
                    setTimeout(() => {
                        if (faqAnswer.classList.contains('open')) {
                            faqAnswer.style.maxHeight = 'none';
                        }
                    }, 500);
                });
            }
        });
    });
}

// three-steps process tabs functionality
function initializeProcessTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Set up click event listeners for tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content with animation
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                // Small delay to ensure smooth transition
                setTimeout(() => {
                    targetContent.classList.add('active');
                    
                    // Re-trigger animations for the step image
                    const stepImage = targetContent.querySelector('.step-image');
                    if (stepImage) {
                        stepImage.style.animation = 'none';
                        stepImage.offsetHeight; // Trigger reflow
                        stepImage.style.animation = 'slideInRight 0.8s ease-out 0.2s forwards';
                    }
                }, 50);
            }
        });
    });
}

// navigation functionality
function initializeNavigation() {
    const header = document.querySelector('.header');
    let scrollTimer = null;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // optimized scroll handler with requestAnimationFrame
    function optimizedScroll() {
        if (scrollTimer) {
            cancelAnimationFrame(scrollTimer);
        }
        
        scrollTimer = requestAnimationFrame(function() {
            handleScroll();
        });
    }
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    // initial check
    handleScroll();
}

// smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// CSS Animation Classes
const styles = `
    .animate-fadeInUp {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .animate-fadeIn {
        opacity: 1 !important;
    }
    
    /* Ensure smooth transitions */
    .hero h1,
    .hero p,
    .hero-cta,
    .hero-visual {
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
`;

// Inject styles
if (!document.getElementById('animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// "Back to Top" floating button functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) {
        console.warn('Back to top button not found');
        return;
    }
    
    let scrollTimer = null;
    
    function toggleBackToTopVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 200) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    function optimizedScrollHandler() {
        if (scrollTimer) {
            cancelAnimationFrame(scrollTimer);
        }
        
        scrollTimer = requestAnimationFrame(toggleBackToTopVisibility);
    }
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // initial check
    toggleBackToTopVisibility();
}

function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!mobileMenuToggle || !navContent) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        navContent.classList.toggle('active');
        
        // prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navContent.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navContent.contains(e.target)) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navContent.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navContent.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

var swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

// Image Modal functionality
function initializeProductImageModal() {
    const imageFrames = document.querySelectorAll('.image-frame');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <img class="modal-image" src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalImage = modal.querySelector('.modal-image');
    const closeButton = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    imageFrames.forEach(frame => {
        const img = frame.querySelector('.placeholder-content img');
        
        if (!img) return;
        
        // Add click event to image
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Add pointer cursor to indicate clickability
        img.style.cursor = 'pointer';
    });
    
    // Close modal events
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeButton.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
