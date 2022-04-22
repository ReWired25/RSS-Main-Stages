// *************** selectors, variables *************** //

const burgerMenu = document.querySelector('.burger-menu');
const mainMenu = document.querySelector('.main-menu');
const menuLogo = document.querySelector('.menu-logo');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
    let arr = [burgerMenu, mainMenu, menuLogo, overlay, document.body];
    for (let elem of arr) {
        elem.classList.toggle('open');
    }
}

burgerMenu.addEventListener('click', () => {
        toggleMenu();
})

mainMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu__link')) {
        toggleMenu();
    }
})

overlay.addEventListener('click', () => {
    toggleMenu();
})