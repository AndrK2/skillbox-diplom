// Установка кнопки бургера
  function setBurger() {
    $('.burger__button').on('click', function () {
      $('.burger__icon').toggleClass('burger__icon_is-open');
      $('.menu').slideToggle(300);
    })
  }
  setBurger()