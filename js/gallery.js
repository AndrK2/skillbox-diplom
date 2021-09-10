// GALLERY   


                               // Галлерея
// Слайдер для галереи
new Swiper($('.gallery-slider')[0], {
    loop: false,
    slideClass: 'gallery-slider__item',
    wrapperClass: 'gallery-slider__list',
    speed: 600,
    autoHeight: false,
    nextSlideMessage: 'Следующий слайд',
    prevSlideMessage: 'Предыдущий слайд',
    firstSlideMessage: 'Первый слайд',
    lastSlideMessage: 'Последний слайд',
  
    pagination: {
      el: document.querySelector('.gallery-slider__fractions'),
      type: 'fraction',
    },
  
    navigation: {
      nextEl: document.querySelector('.gallery-slider__button-next'),
      prevEl: document.querySelector('.gallery-slider__button-prev'),
    },
  
    breakpoints: {
      1800: {
        spaceBetween: 50,
        slidesPerColumn: 2,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
  
      1200: {
        spaceBetween: 60,
        slidesPerColumn: 2,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
  
      650: {
        spaceBetween: 34,
        slidesPerColumn: 2,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
  
      440: {
        spaceBetween: 1,
        slidesPerColumn: 1,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
  
      1: {
        spaceBetween: 1,
        slidesPerColumn: 1,
        slidesPerView: 1,
        slidesPerGroup: 1,
      }
    }
  })
  // ---
  // Кастомный селектор для секции галереи
  new Choices($('.filter-selector')[0], {
    searchEnabled: false,
    itemSelectText: '',
    classNames: {
      containerOuter: 'filter-select',
      containerInner: 'filter-select__inner',
      placeholder: 'filter-select__placeholder',
      list: 'filter-select__list',
      item: 'filter-select__item',
      listDropdown: 'filter-select__list--dropdown',
      itemChoice: 'filter-select__item--choice',
    },
  })
  // ---  Галлерея
  // Установка карточки при нажатии на картины из галереи
  function setCardsOnGallery() {
    $('.gallery-slider__item').on('click', function () {
      const thisDataGallery = $(this)[0].dataset.gallery;
      if (thisDataGallery !== undefined) {
        $(`[data-gallery="${thisDataGallery + '-content'}"]`).addClass('more_is-active');
        $('body').addClass('dark');
      }
    })
  
    // Закрывает карточку с описанием
    function closeWindow() {
      $('.more').removeClass('more_is-active');
      $('.dark').removeClass('dark');
    }
  
    // Закрываем окно по клику на крестик
    $('.more__back').on('click', function () {
      closeWindow();
    })
  
    // Закрываем окно при клике вне карточки с описанием
    $('body').on('click', function (click) {
      if ($(this).hasClass('dark') && click.target.classList.contains('dark')) {
        closeWindow();
      }
    })
  }
  // ---
  setCardsOnGallery();