// Dynamic Rotating Text Effect
const dynamicText = document.querySelector('.dynamic-text');
const words = ['innovate.', 'create.', 'solve problems.', 'inspire.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);

    dynamicText.textContent = displayedText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
    } else if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Pause before deleting
        return;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 150);
}

typeEffect();

// Smooth Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Progress Bars Animation with Debounce
const progressBars = document.querySelectorAll('.progress');
progressBars.forEach(bar => {
    const progress = bar.style.width;
    bar.style.width = 0;

    window.addEventListener('scroll', () => {
        const rect = bar.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0 && bar.style.width === '0px') {
            bar.style.width = progress;
        }
    });
});

// Testimonial Carousel
let currentSlide = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const totalSlides = testimonialSlides.length;
const progressBar = document.querySelector('.progress-bar');

function showSlide(slideIndex) {
    testimonialSlides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    updateProgressBar();
}

function updateProgressBar() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';
    }, 50);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    updateProgressBar();
});

// Snapping Scroll Progress Indicator for Timeline Section
const timelineSection = document.querySelector('#timeline');
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineProgress = document.querySelector('.timeline-progress');

function updateTimelineProgress() {
    const sectionTop = timelineSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop <= windowHeight && sectionTop + timelineSection.offsetHeight >= 0) {
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop <= windowHeight / 2) {
                timelineProgress.style.height = `${((index + 1) / timelineItems.length) * 100}%`;
            }
        });
    }
}

window.addEventListener('scroll', updateTimelineProgress);
