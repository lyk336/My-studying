'use strict';

const burgerMenu = document.querySelector('.menu__icon');

burgerMenu.addEventListener('click', () => {
  const header = document.querySelector('.header__container');

  header.classList.toggle('menu-open');
});
