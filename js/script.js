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


const wrapper = document.querySelector('.wrapper');
wrapperWidth = wrapper.clientWidth;
wrapperHeight = wrapper.clientHeight;
console.log(wrapperWidth);
console.log(wrapperHeight);
const main = document.querySelector('.main');
if (wrapperWidth > wrapperHeight) {
    wrapper.style.cssText = `
    background: url("img/banner.png") 150% bottom / 80%  no-repeat,
                    url("img/bubble.png") top right / 50% 100% no-repeat,
                    linear-gradient(90deg, #ECF2F6 0%, #FFFFFF 100%);
    `;
    main.style.maxWidth = "60%";
} 
if  (wrapperWidth < wrapperHeight) {
    wrapper.style.cssText = `
    background: url("img/banner.png") bottom right / 100% no-repeat,
                url("img/bubble.png") top right no-repeat,
                linear-gradient(90deg, #ECF2F6 0%, #FFFFFF 100%);
    `;
    main.style.maxWidth = "100%";
}