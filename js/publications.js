
// Установка свайпера
const mySwiperPublications = new Swiper($('.publications__slider-container')[0], {
    loop: false,
    slideClass: 'publications__item',
    wrapperClass: 'publications__list',
    speed: 600,
    autoHeight: false,
  
    pagination: {
      el: $('.publications__fractions')[0],
      type: 'fraction',
    },
  
    navigation: {
      nextEl: $('.publications__button-next')[0],
      prevEl: $('.publications__button-prev')[0],
    },
  
    breakpoints: {
      1800: {
        spaceBetween: 50,
        slidesPerColumn: 1,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        spaceBetween: 50,
        slidesPerColumn: 1,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      960: {
        spaceBetween: 49,
        slidesPerColumn: 1,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      650: {
        spaceBetween: -18,
        slidesPerColumn: 1,
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    }
  })
  // ---
  // Удаление/добавление элементов управления свайпером
  function toolbarCheck() {
    const numOfCards = $('.publications__item_is-visible').length;
    if (numOfCards <= 3 && window.innerWidth >= 1800) {
      $('.publications__controls').css('display', 'none');
    } else if (numOfCards <= 2 && window.innerWidth >= 960) {
      $('.publications__controls').css('display', 'none');
    } else if (window.innerWidth <= 650) {
      $('.publications__controls').css('display', 'none');
    } else {
      $('.publications__controls').css('display', 'flex');
    }
  }
  // ---
  // Показ книг в соответствии с фильтрами при взаимодействии
  function onChangePublications() {
    // Проверка элемента на соответствие указанным пользователем жанрам
    function genresCheck(el) {
      // Принимает в аргументе книгу
      const currentGanre = Object.values(el.dataset)[0];
      let neededGanres = [];
  
      for (let i = 0; i < $('.publications__checkbox').length; i++) {
        let checkbox = $('.publications__checkbox')[i];
        if (checkbox.checked === true) {
          neededGanres.push($('.publications__checkbox')[i].id);
        }
      }
  
      if (neededGanres.length === 0) {
        return true;
      }
  
      return neededGanres.includes(currentGanre);
    }
  
    // Проверка элемента на соответствие указанным пользователем ценам
    function priceCheck(el) {
      // принимает в аргументе элемент списка
      const minInput = $('#publications__cost-min')[0];
      const maxInput = $('#publications__cost-max')[0];
  
      let min;
      let max;
      if (minInput.value.match(/\d/g) !== null) {
        min = Number(minInput.value.match(/\d/g).join(''));
      } else {
        min = 0;
      }
      if (maxInput.value.match(/\d/g) !== null) {
        max = Number(maxInput.value.match(/\d/g).join(''));
      } else {
        max = 99999;
      }
  
      const price = Number(el.children[0].children[1].children[0].children[1].textContent.match(/\d/g).join(''))
  
      if (price >= min && price <= max) {
        return true
      }
      return false;
    }
  
    $('.publications__item').removeClass('publications__item_is-visible');
  
    for (let i = 0; i < $('.publications__item').length; i++) {
      let el = $('.publications__item')[i];
      if (genresCheck(el) && priceCheck(el)) {
        el.classList.add('publications__item_is-visible')
      }
    }
    toolbarCheck()
    mySwiperPublications.update();
  }
  // ---
  // Форматирование ввода в инпуты
  function onEnterPublications(key, el) {
    if (key.key === 'Enter' || key.key === 'Enter') return;
  
    if ((key.key.match(/\d/) === null || el.value.length === 6) && key.key !== 'Backspace') {
      key.preventDefault()
    }
  
    if (key.key.match(/\d/) !== null) {
      if (el.value.length === 3) {
        key.preventDefault();
        el.value = el.value[0] + ' ' + el.value[1] + el.value[2] + key.key;
      } else if (el.value.length === 5) {
        key.preventDefault();
        el.value = el.value[0] + el.value[2] + el.value[3] + el.value[4] + key.key;
        el.value = el.value[0] + el.value[1] + ' ' + el.value[2] + el.value[3] + key.key;
      }
    }
  
    if (key.key === 'Backspace') {
      if (el.value.length === 6) {
        key.preventDefault();
        el.value = el.value[0] + ' ' + el.value[1] + el.value[3] + el.value[4];
      } else if (el.value.length === 5) {
        key.preventDefault();
        el.value = el.value[0] + el.value[2] + el.value[3]
      }
    }
  }
  // ---
  $('.publications__cost-input, .publications__checkbox').on('change', function (event) {
    event.preventDefault();
    onChangePublications()
  })
  
  $('.publications__cost-input').on('keydown', function (key) {
    onEnterPublications(key, $(this)[0]);
  })
  
  // Зависимости от ширины страницы (аккордеон, свайпер)
  function mobileAccordion() {
    const categories = document.querySelector('.publications-accordion');
    if (window.innerWidth <= 650 && categories.dataset.mobile === 'false') {
      $(function () {
        $(categories).accordion({
          active: false,
          collapsible: true,
          heightStyle: "content",
        });
      });
      categories.dataset.mobile = 'true';
  
      // Автоматический перенос уже выделенных жанров вниз при ресайзинге
      document.querySelectorAll('.publications__categories-item').forEach((el) => {
        if (el.children[0].checked === true && !el.classList.contains('publications__categories-item_is-selected')) {
          el.classList.toggle('publications__categories-item_is-selected');
          document.querySelector('.publications__active-filters').append(el);
        }
      })
  
      // Удаление свайпера
      if (document.querySelector('.publications__slider-container').classList.contains('swiper-container-initialized')) {
        mySwiperPublications.destroy();
      }
      toolbarCheck();
    }
  
    if (window.innerWidth > 650) {
      // Удаление аккордеона при расайзинге
      categories.dataset.mobile = 'false';
      if (categories.classList.contains('ui-accordion')) {
        $(categories).accordion("destroy");
      }
  
      toolbarCheck();
  
      // Перемещение жанров в основной список при ресайзинге
      document.querySelectorAll('.publications__categories-item_is-selected').forEach(el => {
        el.classList.remove('publications__categories-item_is-selected');
        document.querySelector('.publications__categories-list').prepend(el);
      })
    }
  }
  
  mobileAccordion()
  window.addEventListener('resize', () => {
    mobileAccordion()
  })
  
  // Перемещение жанра под список после клика
  function ganresOnClickMobile(el) {
    if (window.innerWidth <= 650) {
      const activFilters = document.querySelector('.publications__active-filters');
      if (el.classList.contains('publications__categories-item_is-selected')) {
        el.classList.remove('publications__categories-item_is-selected');
        el.children[0].checked = false;
        document.querySelector('.publications__categories-list').prepend(el);
      } else {
        el.classList.add('publications__categories-item_is-selected');
        el.children[0].checked = true;
        activFilters.append(el);
      }
    }
  }
  
  $('.publications__categories-item').on('click', function (click) {
    if (window.innerWidth <= 650) {
      click.preventDefault()
      ganresOnClickMobile($(this)[0]);
    }
  })
  
  function onClickArrowForAccordion() {
    $('.publications-subtitle').on ('click', function () {
      if (window.innerWidth <= 650) $(this).toggleClass('publications__subtitle_is-open');
    })
  }
  
  onClickArrowForAccordion();