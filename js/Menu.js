
                         // Верхнее меню    
// Установка дроплистов в хэдере
function setDropLists() {
    function whenUse(el) {
      if (el.children('.nav-catalog__droplist').hasClass('nav-catalog__droplist_is-open')) {
        //  Если этот элемент уже был выбран
        el.children('.nav-catalog__droplist').removeClass('nav-catalog__droplist_is-open').slideUp(500);
        el.children('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
      } else {
        //  Если этот элемент не был ранее выбран
        $('.nav-catalog__droplist').removeClass('nav-catalog__droplist_is-open').slideUp(100);
        $('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
        el.children('.nav-catalog__droplist').addClass('nav-catalog__droplist_is-open').slideDown(500);
        el.children('.nav-catalog__name').addClass('nav-catalog__name_is-open');
      }
    }
  
    $('.nav-catalog__items').on('click', function () {
      whenUse($(this))
    });
  
    // Закрываем выбранный элемент по клику вне его
    $(document.body).on('click', function (click) {
      if (!click.target.classList.contains('nav-catalog__name')) {
        $('.nav-catalog__droplist').removeClass('nav-catalog__droplist_is-open').slideUp(100);
        $('.nav-catalog__name').removeClass('nav-catalog__name_is-open');
      }
    })
  
    // Устанавливаем на все дроплисты кастомные скроллы
    new SimpleBar($('.droplist__list')[0])
  }
  // ---
  // Установка кнопки бургера
  function setBurger() {
    $('.burger__button').on('click', function () {
      $('.burger__icon').toggleClass('burger__icon_is-open');
      $('.menu').slideToggle(300);
    })
  }
  // ---
  // Установка выдвижного поиска для мобильный устройств
  function setSearchOnMobile() {
    $('.search-button').on('click', function () {
      $('.search').fadeIn(200);
    });
    $('.search__back').on('click', function () {
      $('.search').fadeOut(200);
    })
  }
  // ---
  setDropLists();
  setBurger();
  setSearchOnMobile()
   


              // Нижнее меню прокрутки изображений
// Слайдер для фона оффера
new Swiper($('.offer-slider')[0], {
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
    slideClass: 'offer-slider__item',
    wrapperClass: 'offer-slider__list',
  })              