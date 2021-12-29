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
            multipleDatesSeparator: '-',
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
        // определяет нужен ли выбор диапазона дат
        this.isRange = false;
    }
    // заготовка для отправления дат на сервер
    submit(dp) {
        console.log(dp.selectedDates);
        setTimeout(() => {
            dp.hide();
            dp.clear();
        }, 500);
        dp.setViewDate(dp.selectedDates[0]);
    }
    mask(selector) {
        // Применяем маску ввода ко всем элементам с заданным селектором
        const self = this;
        $(function () {
            $(selector).mask(
                self.options.range ? '00 aaa-00 aaa' : '00.00.0000',
                {
                    translation: {
                        a: { pattern: /[a-z]/ },
                    },
                }
            );
        });
    }
    multiDateHandler(range, i) {
        const dates = range.split('-');
        this.setDate(dates, i);
    }
    setDate(dates, i) {
        const self = this;
        if (dates) {
            dates.forEach((currentDate) => {
                const date = currentDate.toString().split('.');
                if (
                    date[2] > 0 &&
                    date[2] < 3000 &&
                    date[0] >= 0 &&
                    date[1] < 13 &&
                    date[0] > 0 &&
                    date[0] <= 31
                ) {
                    self.dp[i].selectDate(
                        new Date(date[2], date[1] - 1, date[0])
                    );
                    if (self.dp[i].selectedDates.length) {
                        self.submit(self.dp[i]);
                    }
                }
            });
        }
    }
    // обработчик для нажатия enter
    keyWatch(el, i) {
        const self = this;
        el.closest('.input__body').addEventListener('keydown', (e) => {
            if (e.code == 'Enter') {
                if (self.options.range) {
                    self.multiDateHandler(el.value, i);
                } else {
                    self.setDate(el.value, i);
                }
            }
        });
    }
    // обработка событий мыши
    mouseWatch(el, i) {
        const self = this;
        const button = el.nextElementSibling;
        el.closest('.input__body').addEventListener('mousedown', (e) => {
            if (e.target === button || e.target === button.firstElementChild) {
                e.preventDefault();
            }
            e.stopPropagation();
            // Проверяем, произошел ли клик внутри поля ввода или по кнопке
            if (
                (e.target === button ||
                    e.target === button.firstElementChild ||
                    el.contains(e.target)) &&
                !self.dp[i].$datepicker.classList.contains('-active-')
            ) {
                // устанавливаем фокус на поле ввода и если внутри него была введана дата, передаем ёё в air-datepicker
                el.focus();
                if (this.value) {
                    self.dp[i].selectDate(this.value);
                }
                self.dp[i].show();
            } else {
                // в случае клика в ином месте или при нажатии на кнопку при активном календаре, убираем фокус из поля ввода и закрываем календарь
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
        console.log(self);
        $(selector).each(function (i, el) {
            self.dp[i].isRange = $(el).hasClass('range') ? true : false;
            self.dp[i].options.range = self.isRange;
            self.options.dp[i].dynamicRange = self.isRange;
            if (self.dp[i].isRange) {
                self.dp[i].locale.monthsShort = [
                    'янв',
                    'фев',
                    'мар',
                    'апр',
                    'май',
                    'июн',
                    'июл',
                    'авг',
                    'сен',
                    'окт',
                    'ноя',
                    'дек',
                ];
                self.options.dateFormat = 'dd MMM';
            }
            self.mask(this);
            self.dp[i] = new AirDatepicker(el, self.options);
            self.keyWatch(el, i);
            self.mouseWatch(el, i);
        });
    }
}

const myDatepicker = new MyDatepicker();
myDatepicker.init('.datepicker');
