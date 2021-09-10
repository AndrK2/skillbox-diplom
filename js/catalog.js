                                       // Каталог
// Аккордеон для секции каталога
$(function () {
    $(".choice__list").accordion({
      active: 0,
      collapsible: true,
      heightStyle: "content",
    });
  });
  // ---
  // Функционал табов и стилистические изменения в секции
  function setTabsCatalog() {
    // Табы для выбора страны в каталоге
    $('.tabs__button').on('click', function () {
      $('.tabs__button').removeClass('tabs__button_is-active');
      $(this).addClass('tabs__button_is-active');
      $('.catalog__main').removeClass('catalog__main_is-active');
      $(`[data-path="${$(this)[0].dataset.path}-content"]`).addClass('catalog__main_is-active');
    })
  
    //  Табы для выбора художника из каталога
    $('.choice__authors-button').on('click', function () {
      const author = $(this)[0].dataset.author;
      if (author !== undefined) {
        $('.catalog__main_is-active').find('.choice__authors-button').removeClass('choice__authors-button_is-active');
        $(this).addClass('choice__authors-button_is-active');
        $('.catalog__main_is-active').find('.card').removeClass('card_is-active');
        $(`[data-author="${author}-content"]`).addClass('card_is-active');
      }
    })
  
    // Изменение стилей при открытии аккордеона
    $('.choice__button').on('click', function () {
      $(this).toggleClass('choice__button_is-open');
    })
  }
  // ---
  setTabsCatalog();