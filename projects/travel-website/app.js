'use strict';

const preloader = document.querySelector('.preloader');
const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');
let ticking = false;

window.addEventListener('load', () => {
  addLoadedToPreloader();
});

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      autoAddActiveToHeader();
      ticking = false;
    });
  }
  ticking = true;
});

window.addEventListener('click', (e) => {
  const target = e.target;
  toggleNav(target);
});

function addLoadedToPreloader() {
  preloader.classList.add('loaded');
}

function autoAddActiveToHeader() {
  if (window.scrollY > 50) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

function toggleNav(target) {
  if (target.closest('.nav-toggle-btn')) {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
  }
}
