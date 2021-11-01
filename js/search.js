
  // Установка выдвижного поиска для мобильный устройств
  function setSearchMobile() {
    $('.search-button').on('click', function () {
      $('.search').fadeIn(200);
    });
    $('.search-back').on('click', function () {
      $('.search').fadeOut(200);
    })
  }
  // ---
  setSearchMobile()