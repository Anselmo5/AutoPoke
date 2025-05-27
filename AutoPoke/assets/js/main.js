/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close');

/* Menu show */
navToggle.addEventListener('click', ()=>{
    navMenu.classList.add('show-menu')
})
/* Menu hidden */
navClose.addEventListener('click', ()=>{
    navMenu.classList.remove('show-menu')
})
/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header'):header.classList.remove('bg-header')
};
window.addEventListener('scroll',scrollHeader);

/*=============== HOME HEIGHT ===============*/
const homeHeight = () =>{
    const home = document.getElementById('home')
    const mockup = document.getElementById('home-mockup') 

    home.style.height = `${mockup.offsetHeight +100}vh`
}
window.addEventListener('load', homeHeight)
window.addEventListener('resize', homeHeight)

 
/*=============== MENU ===============*/


navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));

/*=============== CHANGE BACKGROUND HEADER ===============*/
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.classList.toggle('bg-header', window.scrollY >= 50);
});

/*=============== SWIPER ===============*/
const firstSwiper = new Swiper(".first-swiper", {
  loop: false,
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  on: {
    init: function () {
      setSlideBackgrounds();
    },
    slideChange: function () {
      // Nenhuma ação aqui, pois os fundos já foram definidos uma vez
    }
  }
});
/*=============== UPDATE SLIDE BACKGROUND ===============*/
function setSlideBackgrounds() {
  const slides = document.querySelectorAll('.home-slide');

  const backgrounds = [
    'CenarioCharizard.png', 
    'CenarioBlastoise.png',
    'CenarioVenozauro.png'
  ];

  slides.forEach((slide, i) => {
    slide.style.backgroundImage = `url(../assets/img/Cenario/${backgrounds[i]})`;
    slide.style.backgroundSize = 'cover';
    slide.style.backgroundPosition = 'center';
  });
}
/*=============== ANIMAÇÃO COM GSAP ===============*/
gsap.from('.home-title', {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: 'power2.out'
});
