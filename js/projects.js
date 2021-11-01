

const projectsSlider = new Swiper('.projects__slider', {
    loop: false,
    slideClass: 'projects__slide',
    wrapperClass: 'projects-wrapper',
    speed: 600,
  
    navigation: {
      nextEl: document.querySelector('.projects__button_next'),
      prevEl: document.querySelector('.projects__button_prev'),
    },
  
    breakpoints: {
      1800: {
        spaceBetween: 50,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        spaceBetween: 50,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      960: {
        spaceBetween: 50,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      650: {
        spaceBetween: 34,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      0: {
        spaceBetween: 10,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    }
  })