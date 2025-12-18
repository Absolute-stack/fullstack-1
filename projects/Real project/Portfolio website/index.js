'use strict';

const allServicesWrapper = document.querySelector('.table');
const aboutSection = document.querySelector('.about-section');
const skillsetSection = document.querySelector('.skillset-section');
const exhibitionSection = document.querySelector('.exhibition-section');
const aboutTab = document.querySelector('.about-tab');
const skillsetTab = document.querySelector('.skillset-tab');
const exhibitionTab = document.querySelector('.exhibition-tab');

aboutTab.classList.add('active');

allServicesWrapper.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');

  if (!tab) return;

  if (tab === skillsetTab) {
    // Check if clicked tab matches
    skillsetTab.classList.add('active');
    aboutTab.classList.remove('active');
    exhibitionTab.classList.remove('active');
    skillsetSection.classList.add('show');
    aboutSection.style.display = 'none';
    exhibitionSection.classList.remove('show');
  } else if (tab === exhibitionTab) {
    // Check if clicked tab matches
    exhibitionTab.classList.add('active');
    aboutTab.classList.remove('active');
    skillsetTab.classList.remove('active');
    exhibitionSection.classList.add('show');
    skillsetSection.classList.remove('show');
    aboutSection.style.display = 'none';
  } else if (tab === aboutTab) {
    // Check if clicked tab matches
    aboutTab.classList.add('active');
    skillsetTab.classList.remove('active');
    exhibitionTab.classList.remove('active');
    aboutSection.style.display = 'grid';
    exhibitionSection.classList.remove('show');
    skillsetSection.classList.remove('show');
  }
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navlinkContainer = document.querySelector('.navlink-container');
const navLinks = document.querySelectorAll('.navlink-container .link a');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navlinkContainer.classList.toggle('active');
  document.body.style.overflow = navlinkContainer.classList.contains('active')
    ? 'hidden'
    : 'auto';
});

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navlinkContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navlinkContainer.contains(e.target)) {
    menuToggle.classList.remove('active');
    navlinkContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Smooth scroll behavior (already handled by CSS, but adding for older browsers)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
