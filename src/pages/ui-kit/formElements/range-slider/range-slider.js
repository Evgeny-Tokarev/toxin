import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

class RangeSlider {
  init($slider) {
    noUiSlider.create($slider, {
      connect: true,
      start: [5000, 10000],
      step: 100,
      range: {
        min: [-100],
        max: [15650],
      },
      format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
      }),
    });
    this.output(this, this.noUiSlider.get());
    this.noUiSlider.on('change', () => {
      this.output(this, this.noUiSlider.get());
    });
  }

  output(sliderEl, value) {
    [this.from, this.to] = value;
    const header = $(sliderEl).find('.input__right-heading');
    header.html('');
    header.append(`${this.from}<span>₽ - </span>${this.to}<span>₽</span>`);
    console.log([this.from, this.to]);
  }
}
const $rangeSliders = $('.range-slider');
$rangeSliders.each(($rangeSlider) => {
  const rangeSlider = new RangeSlider($rangeSlider);
  rangeSlider.init();
});
