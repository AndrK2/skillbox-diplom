
                                  // Событие

// Показываем все карточки событий при нажатии на кнопку
function setEventsBtn() {
    $('.events__all').on('click', function () {
      $(this).css('display', 'none');
      $('.events__item').addClass('events__item_is-open');
    });
  }
  // ---
  // Устанавливает свайпер для событий на мобильные устройства
  function setSliderEvents() {
    const eventsSlider = $('.events__container')[0];
    let mySwiperEvents;
  
    function mobileSlider() {
      if (window.innerWidth <= 650 && eventsSlider.dataset.mobile === 'false') {
        mySwiperEvents = new Swiper(eventsSlider, {
          slideClass: 'events__item',
          wrapperClass: 'events__list',
          speed: 600,
          loop: false,
          simulateTouch: true,
          spaceBetween: 20,
          slidesPerColumn: 1,
          slidesPerView: 1,
          slidesPerGroup: 1,
  
          pagination: {
            el: $('.events__pagination')[0],
            type: 'bullets',
            bulletClass: 'events__paginator',
            bulletActiveClass: 'events__paginator_is-active',
            clickable: true,
          }
        });
        eventsSlider.dataset.mobile = 'true';
      }
  
      if (window.innerWidth > 650) {
        eventsSlider.dataset.mobile = 'false';
        if ($('.events__container').hasClass('swiper-container-initialized')) {
          mySwiperEvents.destroy();
        }
      }
    }
  
    mobileSlider();
    window.addEventListener('resize', () => {
      mobileSlider();
    });
  }
  // ---
  setEventsBtn();
  setSliderEvents();
