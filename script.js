// Mobile menu functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');

    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${(index / navLinks.length + 0.3)}s`;
        }
    });

    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Contact form submission logic
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        fetch('https://example.com/submit-form', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('There was an issue submitting your message. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error submitting the form:', error);
            alert('An error occurred. Please try again later.');
        });
    });
}

// Theme switching functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark' && toggleSwitch) {
        toggleSwitch.checked = true;
    }
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme);
}

// "Back to Top" button functionality
const toTopButton = document.getElementById('to-top');
if (toTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            toTopButton.classList.add('visible');
        } else {
            toTopButton.classList.remove('visible');
        }
    });

    toTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project card toggle functionality
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    function toggleCard(card) {
        projectCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });
        card.classList.toggle('active');
    }

    projectCards.forEach(card => {
        const header = card.querySelector('.project-header');
        header.addEventListener('click', () => toggleCard(card));
    });
}

// CTA button functionality
const ctaButton = document.querySelector(".cta-button");
const projectsSection = document.querySelector("#projects");

if (ctaButton && projectsSection) {
    ctaButton.addEventListener("click", (event) => {
        event.preventDefault();
        projectsSection.scrollIntoView({ behavior: "smooth" });
    });
} else {
    console.warn('Warning: Either .cta-button or #projects element is missing in the DOM.');
}