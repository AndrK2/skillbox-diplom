                        // Нижнее меню    
// Установка дроплистов в хэдере
function setLoWers() {
    function whenUse(el) {
      if (el.children('.nav-catalog__another').hasClass('nav-catalog__another_is-open')) {
        //  Если этот элемент уже был выбран
        el.children('.nav-catalog__another').removeClass('nav-catalog__another_is-open').slideUp(500);
        el.children('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
      } else {
        //  Если этот элемент не был ранее выбран
        $('.nav-catalog__another').removeClass('nav-catalog__another_is-open').slideUp(100);
        $('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
        el.children('.nav-catalog__another').addClass('nav-catalog__another_is-open').slideDown(500);
        el.children('.nav-catalog__name').addClass('nav-catalog__name_is-open');
      }
    }
  
    $('.nav-catalog__items').on('click', function () {
      whenUse($(this))
    });
  
    // Закрываем выбранный элемент по клику вне его
    $(document.body).on('click', function (click) {
      if (!click.target.classList.contains('nav-catalog__name')) {
        $('.nav-catalog__another').removeClass('nav-catalog__another_is-open').slideUp(100);
        $('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
      }
    })
  
    // Устанавливаем на все дроплисты кастомные скроллы
    new SimpleBar($('.another-list')[0])
  }
  // ---
  setLoWers()
 


  
   

              // Нижнее меню прокрутки изображений
// Слайдер для фона оффера
new Swiper($('.offer-swiper')[0], {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 10000,
  },
  speed: 1500,
  simulateTouch: false,
  loop: true,
  slideClass: 'offer-first',
  wrapperClass: 'offer__swiper-wrapper',
})              