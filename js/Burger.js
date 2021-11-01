// Установка кнопки бургера
  function setBurger() {
    $('.burger-button').on('click', function () {
      $('.burger-icon').toggleClass('burger-icon_is-open');
      $('.menu').slideToggle(300);
    })
  }
  setBurger()