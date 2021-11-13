import Handle from "@/view/handle.js";
import Track from "@/view/track.js";
import Interval from "@/view/interval.js";
import Observer from "@/observer.js";


export default class View {
  constructor(slider, config) {
    this.config = config;
    this.slider = slider;
    this.isTwoHandle = this.config.handleCount == 2;
    this.observer = new Observer();
    this.firstHandle;
    this.secondHandle;
    this.interval;
    this.handleX = [0, 0];    

    this.init();
    this.main();
    this.dragNDropHandle();
    this.clickOnValue();
  }

  main(){
    this.interval = new Interval(this.slider.find(".slider__interval")[0]);
    this.firstHandle = new Handle(this.slider.find(".slider__handle_first")[0], this.config);
    if (this.isTwoHandle) {
      this.secondHandle = new Handle(this.slider.find(".slider__handle_second")[0], this.config);
    }
  }
  
  moveInterval(x1 = this.handleX[0], x2 = this.handleX[1]) {
    switch (this.config.handleCount) {
      case 1:
        this.interval.moveByX(this.config.min, x1);
        break;
      case 2:
        this.interval.moveByX(x1, x2)
        break;
    }
  }

  /* move handle by parameter x */
  moveByX(handleOrder, x) {
    switch (handleOrder) {
      case 1:
        this.handleX[0] = this.firstHandle.moveByX(x);
        break;
      case 2:
        this.handleX[1] = this.secondHandle.moveByX(x);
        break;
    }
    this.moveInterval()
  }

  /*when user move handle by drag*/
  dragNDropHandle() {
    let element = this;
    this.slider.on('mousedown', '.slider__handle', function () {
      let handle = this;
      let handleOrder = $(handle).hasClass('slider__handle_first') ? 1 : 2;
      document.onmousemove = function (event) {
        element.observer.notify('mousemove', { event, handleOrder })
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };

      handle.ondragstart = function () {
        return false;
      };
    })
  }

  /*when user click on value */
  clickOnValue() {
    let element = this;
    this.slider.on('click', '.slider__value', function () {
      let currentValue = +$(this).attr('data_value');
      element.observer.notify('click', currentValue);
    })
  }


  init() {
    let title = $('<div/>', {
      text: this.config.text
    }).appendTo(this.slider);

    let track = $('<div/>', {
      class: "slider__track"
    }).appendTo(this.slider);

    let interval = $('<div/>', {
      class: "slider__interval"
    }).appendTo(track);

    let scale = $('<div/>', {
      class: "slider__scale"
    }).appendTo(this.slider);

    for (let i = this.config.min; i <= this.config.max; i += this.config.step) {
      $('<div/>', {
        class: 'slider__value',
        data_value: i,
        text: i
      }).appendTo(scale)
    }

    $('<div/>', {
      class: "slider__handle slider__handle_first",
      data_position: this.config.values[0]
    }).appendTo(track);

    if (this.isTwoHandle) {
      $('<div/>', {
        class: "slider__handle slider__handle_second",
        data_position: this.config.values[1]
      }).appendTo(track);
    }
  }
}
