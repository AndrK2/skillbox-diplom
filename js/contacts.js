
ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("contacts-map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.758939, 37.602821],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14
  });

  myPlacemark = new ymaps.Placemark([55.758939, 37.602821], {}, {
    iconLayout: 'default#image',
    iconImageHref: './img/pin.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -10]
  }),
  myMap.geoObjects.add(myPlacemark);
  myMap.controls.remove('zoomControl',);
  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('routeButtonControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');

  let myLocation = ymaps.templateLayoutFactory.createClass(
    '<button id=\"location\" class=\"map__location\">' +
    '<svg class=\"map__icon\" width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M9 17L17 0.5L0 8.5C1.33333 8.83333 4.4 9.8 6 11C7.6 12.2 8.66667 15.5 9 17Z"/>' +
    '</svg>' +
    '</button>', {
    build: function () {
      myLocation.superclass.build.call(this);
      this.locationCallback = ymaps.util.bind(this.location, this);
      $('#location').bind('click', this.locationCallback);
    },

    clear: function () {
      $('#location').unbind('click', this.locationCallback);
      myLocation.superclass.clear.call(this);
    },

    location: function () {
      var geolocation = ymaps.geolocation,
        myMap = new ymaps.Map('map', {
          center: [55, 34],
          zoom: 10
        }, {
          searchControlProvider: 'yandex#search'
        });

      // Сравним положение, вычисленное по ip пользователя и
      // положение, вычисленное средствами браузера.
      geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
      }).then(function (result) {
        // Красным цветом пометим положение, вычисленное через ip.
        result.geoObjects.options.set('preset', 'islands#redCircleIcon');
        result.geoObjects.get(0).properties.set({
          balloonContentBody: 'Мое местоположение'
        });
        myMap.geoObjects.add(result.geoObjects);
      });

      geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
      }).then(function (result) {
        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        myMap.geoObjects.add(result.geoObjects);
      });
    }
  })
  let myLocationControl;
  if (window.innerWidth > 1024) {
    myLocationControl = new ymaps.control.GeolocationControl({
      options: {
        layout: myLocation,
        position: {
          right: 12,
          top: 353
        }
      }
    })
  }

  let myZoomLayout = ymaps.templateLayoutFactory.createClass(
    '<div class=\"map__zoom-control\">' +
    '<button id=\"zoom-in\" class=\"map__zoom-button map__zoom-button_in\">+</button>' +
    '<button id=\"zoom-out\" class=\"map__zoom-button map__zoom-button_out\">_</button>' +
    '</div>', {
    build: function () {
      myZoomLayout.superclass.build.call(this);
      this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
      this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
      $('#zoom-in').bind('click', this.zoomInCallback);
      $('#zoom-out').bind('click', this.zoomOutCallback);
    },

    clear: function () {
      $('#zoom-in').unbind('click', this.zoomInCallback);
      $('#zoom-out').unbind('click', this.zoomOutCallback);
      myZoomLayout.superclass.clear.call(this);
    },

    zoomIn: function () {
      var map = this.getData().control.getMap();
      map.setZoom(map.getZoom() + 1, {
        checkZoomRange: true
      });
    },

    zoomOut: function () {
      var map = this.getData().control.getMap();
      map.setZoom(map.getZoom() - 1, {
        checkZoomRange: true
      });
    }
  });
  let myZoomControl;
  if (window.innerWidth > 1024) {
    myZoomControl = new ymaps.control.ZoomControl({
      options: {
        layout: myZoomLayout,
        position: {
          right: 12,
          top: 260,
        }
      }
    });
  }

  myMap.controls.add(myZoomControl);
  myMap.controls.add(myLocationControl);
}