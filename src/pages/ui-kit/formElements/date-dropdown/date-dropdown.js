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
            multipleDatesSeparator: ' - ',

            navTitles: {
                days(dp) {
                    return `<span>
                     ${dp.formatDate(
                         dp.isRange ? dp.selectedDates[1] : dp.selectedDates[0],
                         'MMMM yyyy'
                     )}
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
    // заготовка для отправления дат на сервер
    submit(dp) {
        console.log(dp.selectedDates);
        setTimeout(() => {
            dp.hide();
            dp.clear();
        }, 500);
        dp.setViewDate(dp.selectedDates[0]);
    }
    mask() {
        // Применяем маску ввода ко всем элементам с заданным селектором
        const self = this;
        $(function () {
            $(self.$el).mask(self.isRange ? '00 aaa - 00 aaa' : '00.00.0000', {
                translation: {
                    a: { pattern: /[а-яё]/ },
                },
            });
        });
    }
    multiDateHandler(range, i) {
        const self = this;
        range.split(' - ').forEach((currentDate) => {
            const dateArr = currentDate.split(' ');
            const monthNum = self.dp[i].locale.monthsShort.findIndex(
                (monthName) => dateArr[1] === monthName
            );
            dateArr[1] = monthNum < 10 ? `0${monthNum.toString()}` : monthNum;
            dateArr[2] = self.dp[i].selectedDates.length
                ? self.dp[i].selectedDates[0].getFullYear()
                : self.dp[i].viewDate.getFullYear();
            self.setDate(dateArr.join('.'), i);
        });
    }
    setDate(dateStr, i) {
        const date = dateStr.toString().split('.');
        if (
            date[2] > 0 &&
            date[2] < 3000 &&
            date[0] >= 0 &&
            date[1] < 13 &&
            date[0] > 0 &&
            date[0] <= 31
        ) {
            this.dp[i].selectDate(new Date(date[2], date[1] - 1, date[0]));
            this.dp[i].setFocusDate(new Date(date[2], date[1] - 1, date[0]));

            if (this.dp[i].selectedDates.length) {
                this.submit(this.dp[i]);
            }
        }
    }
    // обработчик для нажатия enter
    keyWatch(el, i) {
        const self = this;
        el.closest('.input__body').addEventListener('keydown', (e) => {
            if (e.code == 'Enter') {
                if (self.dp[i].opts.range) {
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
                // при нажатии на кнопку при активном календаре, убираем фокус из поля ввода и закрываем календарь
                if (
                    self.dp[i].$datepicker.classList.contains('-active-') &&
                    (e.target === button ||
                        e.target === button.firstElementChild)
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
            self.dp[i] = new AirDatepicker(el, self.options);
            self.dp[i].isRange = $(el).hasClass('range') ? true : false;
            self.dp[i].opts.range = self.dp[i].isRange;
            self.dp[i].opts.dynamicRange = self.dp[i].isRange;
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
            }
            self.dp[i].locale.dateFormat = self.dp[i].isRange
                ? 'dd MMM'
                : 'dd.MM.yyyy';
            self.mask.call(self.dp[i]);
            self.keyWatch(el, i);
            self.mouseWatch(el, i);
        });
    }
}

const myDatepicker = new MyDatepicker();
myDatepicker.init('.datepicker');
