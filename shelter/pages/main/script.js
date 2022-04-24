// *************** imports *************** //

import {selfCheck} from '../../assets/js/selfcheckInfo.js';
import {petsArr} from '../../assets/js/pets.js';

// *************** selectors, variables *************** //

const burgerMenu = document.querySelector('.burger-menu');
const mainMenu = document.querySelector('.main-menu');
const menuLogo = document.querySelector('.menu-logo');
const overlay = document.querySelector('.overlay');

const sliderContainer = document.querySelector('.slider-container');
const buttonLeft = document.querySelector('.left');
const buttonRight = document.querySelector('.right');

// *************** burger menu functional *************** //

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

// *************** general functions *************** //

let currWidth = document.documentElement.clientWidth;

// ~~ Make randoms nums and pets objects ~~ //

function randomNums() {
    let arr = [];
    for (let i = 0; arr.length < 8; i++) {
      let num = Math.floor(Math.random() * 8);

      if (!arr.includes(num)) arr.push(num);
    }
    return arr;
}

function randomObjs(arr) {
    let numArr = randomNums();
    let finalArr = [];

    for (let i = 0; i < arr.length; i++) {
        finalArr.push(arr[numArr[i]]);
    }
    
    return finalArr;
}

// ~~ Make cards and fill cards with information ~~ //

function cardCreater() {
    let card = document.createElement('div');
    card.classList.add('card');

    let img = document.createElement('img');
    img.classList.add('card-image');
    img.src = '#';
    img.alt = 'pet-photo';

    let title = document.createElement('h4');
    title.classList.add('item-title', 'card-title');

    let button = document.createElement('button');
    button.classList.add('button', 'card-button');
    button.innerHTML = 'Learn more';

    card.append(img, title, button);
    return card;
}

function fillCard(petObj) {
    let currentCard = cardCreater();

    currentCard.querySelector('.card-title').innerHTML = petObj.name;
    currentCard.querySelector('.card-image').src = petObj.img;

    return currentCard;
}

// ~~ Make objects for containers ~~ //

function containerObjs(currObjs) {
    let pets = randomObjs(petsArr);
    let newObjs = [];

    if (currObjs) {
        for (let i = 0; newObjs.length < 3; i++) {
            if (!currObjs.includes(pets[i])) {
                newObjs.push(pets[i]);
            }
        }
    } else {
        for (let i = 0; newObjs.length < 3; i++) {
            newObjs.push(pets[i]);
        }
    }

    return newObjs;
}

function finalObjs(forwardObjs) {
    let currObjs;

    if (forwardObjs) {
        currObjs = forwardObjs;
    } else {
        currObjs = containerObjs(null);
    }

    let prevObjs = containerObjs(currObjs);
    let nextObjs = containerObjs(currObjs);

    let arrObjs = [prevObjs, currObjs, nextObjs];
    return arrObjs;
}

// ~~ Make containers and fill them ~~ //
// ~~ Consider current object case ~~ //

function fillContainer(objs) {
    let finalContainer = [];

    for (let i = 0; i < objs.length; i++) {
        finalContainer.push(fillCard(objs[i]));
    }

    return finalContainer;
}

function finalContainers(forwardObjs) {
    let objs = finalObjs(forwardObjs);

    let prevCards = fillContainer(objs[0]);
    let currCards = fillContainer(objs[1]);
    let nextCards = fillContainer(objs[2]);

    let prevContainer = document.createElement('div');
    prevContainer.classList.add('cards-container', 'prev');

    let currContainer = document.createElement('div');
    currContainer.classList.add('cards-container');

    let nextContainer = document.createElement('div');
    nextContainer.classList.add('cards-container', 'next');

    prevContainer.append(...prevCards);
    currContainer.append(...currCards);
    nextContainer.append(...nextCards);

    let containers = [prevContainer, currContainer, nextContainer];

    return containers;
}

function forwardCurrObjs(card) {
    let currCardsTitle = card.querySelectorAll('.card-title');
    let currObjs = [];

    for (let i = 0; i < petsArr.length; i++) {
        if (currCardsTitle[0].innerHTML === petsArr[i].name ||
            currCardsTitle[1].innerHTML === petsArr[i].name ||
            currCardsTitle[2].innerHTML === petsArr[i].name) {
                currObjs.push(petsArr[i]);
            }
    }

    return currObjs;
}

function containerCreater(forwardObjs) {
    let containers = finalContainers(forwardObjs);

    if (forwardObjs) {
        let replaceItems = sliderContainer.querySelectorAll('.prev');
        for (let item of replaceItems) {
            item.remove();
        }
        sliderContainer.prepend(containers[0]);
        sliderContainer.append(containers[2]);
    } else {
        sliderContainer.append(...containers);
    }
}

// *************** slider *************** //

// ~~ Make cards with project load ~~ //
// ~~ And then buttons functionals ~~ //

containerCreater();

buttonLeft.addEventListener('click', function leftListener() {
    let cards = sliderContainer.querySelectorAll('.cards-container');

    cards[1].classList.add('prev');
    cards[2].classList.remove('next');

    buttonLeft.removeEventListener('click', leftListener);

    setTimeout(() => {
        let currObjs = forwardCurrObjs(cards[2]);
        containerCreater(currObjs);

        buttonLeft.addEventListener('click', leftListener);
    }, 700);
})

buttonRight.addEventListener('click', function rightListener() {
    let cards = sliderContainer.querySelectorAll('.cards-container');

    cards[0].classList.remove('prev');
    cards[1].classList.add('next');

    buttonRight.removeEventListener('click', rightListener);

    setTimeout(() => {
        let currObjs = forwardCurrObjs(cards[0]);
        containerCreater(currObjs);

        buttonRight.addEventListener('click', rightListener);
    }, 700);
})