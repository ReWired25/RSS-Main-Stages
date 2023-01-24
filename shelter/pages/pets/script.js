// *************** imports *************** //

import {petsArr} from '../../assets/js/pets.js';

// *************** selectors, variables *************** //

const burgerMenu = document.querySelector('.burger-menu');
const mainMenu = document.querySelector('.main-menu');
const menuLogo = document.querySelector('.menu-logo');
const overlay = document.querySelector('.overlay');

const sliderContainer = document.querySelector('.our-friends__slider');
const sliderButtons = document.querySelector('.slider-buttons');

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
    if (event.target.classList.contains('menu__link') && mainMenu.classList.contains('open')) {
        toggleMenu();
    }
})

overlay.addEventListener('click', () => {
    toggleMenu();
})

// *************** cards functions *************** //

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

// *************** pagination *************** //

let arrTest = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// *************** randoms *************** //

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

// *************** Make a ready array for pagination *************** //

function fortyEightObjs(objs) {
    let arr = [];

    for (let i = 0; i < 6; i++) {
        let randomArr = randomObjs(objs);
        arr.push(randomArr);
    }

    return arr;
}


function readyArr(arr) {
    let currArr = arr;

    let secondMassiveOne = arr[1].slice(0, 4);
    let secondMassiveTwo = arr[1].slice(4);

    currArr[0] = isEqualLast(currArr[0], secondMassiveOne);
    currArr[2] = isEqualFirst(currArr[2], secondMassiveTwo);

    let fiveMassiveOne = arr[4].slice(0, 4);
    let fiveMassiveTwo = arr[4].slice(4);

    currArr[3] = isEqualLast(currArr[3], fiveMassiveOne);
    currArr[5] = isEqualFirst(currArr[5], fiveMassiveTwo);

    return currArr;
}

function isEqualLast(examArr, objs) {
    let arr = examArr;

    if (objs.includes(arr[6]) || objs.includes(arr[7])) {
        let randomArr = randomObjs(arr);
        return isEqualLast(randomArr, objs);
    } else {
        return arr;
    }
}

function isEqualFirst(examArr, objs) {
    let arr = examArr;

    if (objs.includes(arr[0]) || objs.includes(arr[1])) {
        let randomArr = randomObjs(arr);
        return isEqualFirst(randomArr, objs);
    } else {
        return arr;
    }
}

function objsRandomCreater() {
    let objs = fortyEightObjs(petsArr);
    let verifiedObjs = readyArr(objs);

    let veryfiedArr = [];
    for (let item of verifiedObjs) {
        veryfiedArr.push(...item);
    }

    return veryfiedArr;
}

// *************** Make ready cards and place them on page *************** //

class arrCountClass {
    constructor(array, actualCount) {
        this.arr = array;
        this.count = actualCount;
        this.width = 1280;
    }

    countNow(nowCount) {
        this.count = nowCount;
    }

    countForward() {
        this.count += 1;
    }

    countBack() {
        this.count -= 1;
    }

    finalArr() {
        return this.arr;
    }

    currCount() {
        return this.count;
    }

    widthNow(width) {
        this.width = width;
    }

    currWidth() {
        return this.width;
    }
}

let mainClass = new arrCountClass(objsRandomCreater(), 1);

function loadWidht() {
    if (document.documentElement.clientWidth >= 1280) {
        mainClass.widthNow(1280);
    } else if (document.documentElement.clientWidth >= 768) {
        mainClass.widthNow(768);
    } else if (document.documentElement.clientWidth < 768) {
        mainClass.widthNow(320);
    }
}

loadWidht();

window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > 1280 &&
        document.documentElement.clientWidth < 1370 ) {
        mainClass.widthNow(1280);

        sliderContainer.innerHTML = '';
        sliderContainer.append(...(cardsOnPage(mainClass.finalArr(), mainClass.currWidth(), mainClass.currCount())));
    } else if (document.documentElement.clientWidth > 768 &&
                document.documentElement.clientWidth < 800 ||
                document.documentElement.clientWidth > 1100 &&
                document.documentElement.clientWidth < 1279) {
        mainClass.widthNow(768);

        sliderContainer.innerHTML = '';
        sliderContainer.append(...(cardsOnPage(mainClass.finalArr(), mainClass.currWidth(), mainClass.currCount())));
    } else if (document.documentElement.clientWidth < 768 &&
        document.documentElement.clientWidth > 720) {
        mainClass.widthNow(320);

        sliderContainer.innerHTML = '';
        sliderContainer.append(...(cardsOnPage(mainClass.finalArr(), mainClass.currWidth(), mainClass.currCount())));
    }
})

function funcPages(arr, width, currPages = 1) {
    let numCards;

    console.log(width);

    if (width >= 1280) numCards = 8;
    else if (width >= 768) numCards = 6;
    else numCards = 3;

    let currCards = numCards * currPages;

    let currArr = arr.slice(currCards - numCards, currCards);;

    return currArr;
}

function cardsOnPage(arr, width, currCount) {
    let finalArr = arr;
    let count = currCount;

    let currCardsObjs = funcPages(finalArr, width, count);
    let cardPages = [];

    for (let item of currCardsObjs) {
        cardPages.push(fillCard(item));
    }

    return cardPages;
}

sliderContainer.append(...(cardsOnPage(mainClass.finalArr(), mainClass.currWidth(), mainClass.currCount())));

// *************** Pagination listener *************** //

sliderButtons.addEventListener('click', (event) => {
    let infoCircle = sliderButtons.querySelector('.slider-page-info');

    if (!event.target.classList.contains('disabled')) {
        if (event.target.classList.contains('button-full-right')) {
            if (mainClass.currWidth() === 1280) {
                mainClass.countNow(6);
            } else if (mainClass.currWidth() === 768) {
                mainClass.countNow(8)
            } else if (mainClass.currWidth() === 320) {
                mainClass.countNow(16);
            }
            infoCircle.innerHTML = `${mainClass.currCount()}`;
            sliderButtons.querySelector('.button-full-right').classList.add('disabled');
            sliderButtons.querySelector('.button-right').classList.add('disabled');
            sliderButtons.querySelector('.button-full-left').classList.remove('disabled');
            sliderButtons.querySelector('.button-left').classList.remove('disabled');
        } else if (event.target.classList.contains('button-right')) {
            mainClass.countForward();
            infoCircle.innerHTML = `${mainClass.currCount()}`;
            sliderButtons.querySelector('.button-full-left').classList.remove('disabled');
            sliderButtons.querySelector('.button-left').classList.remove('disabled');
            if (mainClass.currCount() === 6 && mainClass.currWidth() === 1280 ||
                mainClass.currCount() === 8 && mainClass.currWidth() === 768 ||
                mainClass.currCount() === 16 && mainClass.currWidth() === 320) {
                sliderButtons.querySelector('.button-full-right').classList.add('disabled');
                sliderButtons.querySelector('.button-right').classList.add('disabled');
            }
        } else if (event.target.classList.contains('button-full-left')) {
            mainClass.countNow(1);
            infoCircle.innerHTML = `${mainClass.currCount()}`;
            sliderButtons.querySelector('.button-full-left').classList.add('disabled');
            sliderButtons.querySelector('.button-left').classList.add('disabled');
            sliderButtons.querySelector('.button-full-right').classList.remove('disabled');
            sliderButtons.querySelector('.button-right').classList.remove('disabled');
        } else if (event.target.classList.contains('button-left')) {
            mainClass.countBack();
            infoCircle.innerHTML = `${mainClass.currCount()}`;
            sliderButtons.querySelector('.button-full-right').classList.remove('disabled');
            sliderButtons.querySelector('.button-right').classList.remove('disabled');
            if (mainClass.currCount() === 1) {
                sliderButtons.querySelector('.button-full-left').classList.add('disabled');
                sliderButtons.querySelector('.button-left').classList.add('disabled');
            }
        }
    }

    sliderContainer.innerHTML = '';
    sliderContainer.append(...(cardsOnPage(mainClass.finalArr(), mainClass.currWidth(), mainClass.currCount())));
})

// *************** modal window functional *************** //

function modalCreator(currObj) {
    let obj = currObj;

    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    let modalButton = document.createElement('button');
    modalButton.classList.add('slider__button', 'modal-button');

    let buttonIcon = document.createElement('img');
    buttonIcon.classList.add('modal-button-icon');
    buttonIcon.src = '../../assets/svg/modal-button.svg';
    buttonIcon.alt = 'modal-button-icon'

    modalButton.append(buttonIcon);

    let genBlock = document.createElement('div');
    genBlock.classList.add('modal');

    let petImg = document.createElement('img');
    petImg.classList.add('modal-pet');
    petImg.src = obj.img;
    petImg.alt = 'modal-pet';

    let infoBlock = document.createElement('div');
    infoBlock.classList.add('modal-info');

    let infoTitle = document.createElement('h3');
    infoTitle.classList.add('section-title', 'modal-title');
    infoTitle.innerHTML = obj.name;

    let breedTitle = document.createElement('h4');
    breedTitle.classList.add('item-title', 'modal-breed-title');
    breedTitle.innerHTML = `${obj.type} - ${obj.breed}`;

    let infoText = document.createElement('p');
    infoText.classList.add('modal-text');
    infoText.innerHTML = obj.description;

    let ulBlock = document.createElement('ul');
    ulBlock.classList.add('modal-list');

    let liArr = [];
    for (let i = 0; i < 4; i++) {
        let liBlock = document.createElement('li');
        liBlock.classList.add('modal-li');
        liArr.push(liBlock);
    }

    liArr[0].innerHTML = `Age: ${obj.age}`;
    liArr[1].innerHTML = `Inoculations: ${obj.inoculations}`;
    liArr[2].innerHTML = `Diseases: ${obj.diseases}`;
    liArr[3].innerHTML = `Parasites: ${obj.parasites}`;

    for (let i = 0; i < liArr.length; i++) {
        ulBlock.append(liArr[i]);
    }

    infoBlock.append(infoTitle, breedTitle, infoText, ulBlock);
    genBlock.append(petImg, infoBlock);
    modalContainer.append(modalButton, genBlock);

    return modalContainer;
}

sliderContainer.addEventListener('click', function sliderListener(event) {
    let currCard;

    if (!event.target.parentElement) {
        return;
    }

    if (event.target.classList.contains('card')) {
        currCard = event.target;
    } else if (event.target.parentElement.classList.contains('card')) {
        currCard = event.target.parentElement;
    }

    if (currCard) {
        let name = currCard.querySelector('.card-title').innerHTML;
        let obj;

        for (let i = 0; i < petsArr.length; i++) {
            if (name === petsArr[i].name) {
                obj = petsArr[i];
            }
        }

        let newModal = modalCreator(obj);
        sliderContainer.append(newModal);
        document.body.classList.add('open');

        currModalListener();
    }
})

function currModalListener() {
    let modal = sliderContainer.querySelector('.modal-container');

    setTimeout(() => {
        modal.classList.add('modal-active');
    }, 100);

    let modalWindow = modal.querySelector('.modal');
    modalWindow.addEventListener('mouseenter', () => {
        modal.querySelector('.modal-button').classList.add('modal-on');
    })
    modalWindow.addEventListener('mouseleave', () => {
        modal.querySelector('.modal-button').classList.remove('modal-on');
    })

    modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-container') ||
            event.target.classList.contains('modal-button') ||
            event.target.classList.contains('modal-button-icon')) {
                modal.remove();
                document.body.classList.remove('open');
            }
    })
}
