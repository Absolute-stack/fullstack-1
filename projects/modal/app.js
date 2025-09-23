const modal = document.querySelector('.modal');

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-btn')) {
    modal.classList.add('display');
  }

  if (e.target.classList.contains('close-btn')) {
    modal.classList.remove('display');
  }
});
