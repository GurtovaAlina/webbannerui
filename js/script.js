const burger = document.querySelector('.header__burger');
const menuBurger = document.querySelector('.menu__burger');
burger.addEventListener("click", function(e) {
    burger.classList.toggle('active');
    menuBurger.classList.toggle('active');
    document.body.classList.toggle('lock');
});




const popupLinks = document.querySelectorAll('.popup-link'); // ссылки на попапы (html)
const body = document.querySelector('body'); // для блокировки скролла в боди
const lockPadding = document.querySelectorAll('.lock-padding'); //для фиксированных объектов (шапка)

let unlock = true; // чтобы не было двойных нажатий

const timeout = 800; //должна быть цифра что и в css transition (0.8s) .popup, связано с блокировкой скролла

if (popupLinks.length > 0) { //проверяем наличие ссылок
    for (let index = 0; index < popupLinks.length; index++) { //бегаем по ним циклом
        const popupLink = popupLinks[index]; //получаем их
        popupLink.addEventListener("click", function(e){ //вешаем событие
            const popupName = popupLink.getAttribute('href').replace('#', ''); //берём атрибут href и убираем из него #
            const curentPopup = document.getElementById(popupName); //получаем сам попап (не ссылку)
            popupOpen(curentPopup); //отправляем в функцию открытия попапа
            e.preventDefault(); //запрещаем перезагружать страницу при нажатии на ссылку
        }); 
    } 
}

const popupCloseIcon = document.querySelectorAll('.close-popup'); //кнопка для закрытия попапа (ссылка с Х)
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function(e){
            popupClose(el.closest('.popup')); //ближайший родитель .close-popup (будет проверять вверх)
            e.preventDefault(); 
        });
    } 
}

function popupOpen(curentPopup) { // передаем попап
    if (curentPopup && unlock) { // проверяем наличие попапа и открыт ли он (true)
        const popupActive = document.querySelector('.popup.open'); // получаем открытый попап
        if (popupActive) { //если он существует
            popupClose(popupActive, false); // закрываем его
        } else {
            bodyLock(); // блокируем скролл боди
        }
        curentPopup.classList.add('open'); //к переданномк попапу добавляем класс
        curentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content')) { //отсекаем всё, кроме тёмной области (при клике внутри контента ничего не произойдёт)
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) { // передаем открытый объект, блокируем ли скролл (для попапа в попапе)
    if (unlock) {
        popupActive.classList.remove('open'); //у открытого попапа убираем класс
        if (doUnlock) {
            bodyUnLock(); //запрещаем открытому попапу скролл, если внутри него открыт другой попап
        }
    }
}



function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; //ширина сколла, который будем скрывать (чтобы не было сдвига контента)

    if (lockPadding.length > 0) { //проверяем есть ли фиксированные объекты
        for (let index = 0; index < lockPadding.length; index++) { //для фиксированных объектов (шапка)
            const el = lockPadding[index]; //html (lock-padding)
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue; //присваиваем как паддинг справа
    body.classList.add('lock'); //по этому классу убираем скролл

    unlock = false; // для того чтобы не было повторных нажатий, чтобы нормально лочился скролл
    setTimeout(function () {
        unlock = true;
    }, timeout);
}


function bodyUnLock() { //разблокируем скролл
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px'; 
        body.classList.remove('lock');
    }, timeout); // разблокируем скролл через время, чтобы не дёргался попап

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}


document.addEventListener('keydown', function (e) { //закрываем попап Esc
    if (e.which === 27) { //проверить
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


//полифилы - подгоняем под старые браузера

(function () {
    //проверяем поддержку
    if (!Element.prototype.closest) {
        //реализуем
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    //проверяем поддержку
    if (!Element.prototype.matches) {
        //реализуем
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();


