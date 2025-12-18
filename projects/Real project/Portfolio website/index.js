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
