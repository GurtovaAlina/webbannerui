const burger = document.querySelector('.header__burger');
const menuBurger = document.querySelector('.menu__burger');
burger.addEventListener("click", function(e) {
    burger.classList.toggle('active');
    menuBurger.classList.toggle('active');
    document.body.classList.toggle('lock');
});



const popupLinkOpen = document.querySelector('.popup-link');
const popupLinkClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

popupLinkOpen.addEventListener("click", function(e) {
    popup.classList.add('open');
    document.body.classList.add('lock');
});

popupLinkClose.addEventListener("click", function(e) {
    popup.classList.remove('open');
    document.body.classList.remove('lock');
});

popup.addEventListener("click", function(e) {
    if (!e.target.closest('.popup__content')) {
        popup.classList.remove('open');
        document.body.classList.remove('lock');
    }
});

