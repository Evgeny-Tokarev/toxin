import * as $ from 'jquery';
import AirDatepicker from 'air-datepicker';

class MyDatepicker {
    constructor() {
        this.submitButton = {
            content: 'Применить',
            className: 'air-datepicker--submitButton',
            onClick: (dp) => this.submit(dp),
        };
        this.options = {
            buttons: ['clear', this.submitButton],
            startDate: [new Date(2019, 7, 8)],
            keyboardNav: false,
            dateFormat: 'dd.MM.yyyy',
            navTitles: {
                days(dp) {
                    return `<span>
                     ${dp.formatDate(dp.selectedDates[0], 'MMMM yyyy')}
                </span>`;
                },
            },
            showEvent: '',
            prevHtml: `<span>arrow_back</span>`,
            nextHtml: `<span>arrow_forward</span>`,
        };
        // массив для хранения экземпляров datepicker
        this.dp = [];
    }
    submit(dp) {
        console.log(dp.selectedDates);
        setTimeout(() => {
            dp.hide();
            dp.clear();
        }, 500);
        dp.setViewDate(dp.selectedDates[0]);
    }
    mask(el) {
        // Применяем маску ввода ко всем элементам el
        $(function () {
            $(el).mask('00.00.0000');
        });
    }
    // обработчик для нажатия enter
    keyWatch(el, i) {
        const self = this;
        el.closest('.input__body').addEventListener('keydown', (e) => {
            if (e.code == 'Enter') {
                const date = el.value.toString().split('.');
                console.log(date);
                console.log(
                    date[2] > 0 &&
                        date[2] < 3000 &&
                        date[0] >= 0 &&
                        date[1] < 13 &&
                        date[0] > 0 &&
                        date[0] <= 31
                );
                self.dp[i].selectDate(new Date(date[2], date[1] - 1, date[0]));
                console.log(self.selectedDates);
                if (self.dp[i].selectedDates.length) {
                    self.submit(self.dp[i]);
                }
            }
        });
    }
    // обработка событий мыши
    mouseWatch(el, i) {
        console.log(this);
        const self = this;
        const button = el.nextElementSibling;
        el.closest('.input__body').addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (
                (e.target === button ||
                    e.target === button.firstElementChild ||
                    el.contains(e.target)) &&
                !self.dp[i].$datepicker.classList.contains('-active-')
            ) {
                el.focus();
                if (this.value) {
                    self.dp[i].selectDate(this.value);
                }
                self.dp[i].show();
            } else {
                if (
                    self.dp[i].$datepicker.classList.contains('-active-') &&
                    (e.target === button ||
                        e.target === button.firstElementChild ||
                        !el.contains(e.target)) &&
                    !self.dp[i].$datepicker.contains(e.target)
                ) {
                    self.dp[i].hide();
                    el.blur();
                }
            }
        });
    }
    init(selector) {
        const self = this;
        $(selector).each(function (i, el) {
            self.mask(this);
            self.dp[i] = new AirDatepicker(el, self.options);
            self.keyWatch(el, i);
            self.mouseWatch(el, i);
        });
    }
}

const myDatepicker = new MyDatepicker();
myDatepicker.init('.datepicker');
