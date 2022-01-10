import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

export default class RangeSlider {
    constructor(selector) {
        const self = this;
        $(selector).each(function () {
            noUiSlider.create(this, {
                start: [20, 80],
                connect: true,
                start: [5000, 10000],
                step: 100,
                range: {
                    min: [0],
                    max: [15500],
                },
                format: wNumb({
                    decimals: 0,
                    thousand: ' ',
                    suffix: '',
                }),
            });
            self.output(this, this.noUiSlider.get());
            this.noUiSlider.on('change', () => {
                self.output(this, this.noUiSlider.get());
            });
        });
    }
    output(sliderEl, value) {
        const [from, to] = value;
        const header = $(sliderEl).find('.input__right-heading');
        header.html('');
        header.append(
            `${from}<span>currency_ruble</span>-${to}<span>currency_ruble</span>`
        );
        console.log([from, to]);
    }
}
const rangeSlider = new RangeSlider('.range-slider');
rangeSlider;
