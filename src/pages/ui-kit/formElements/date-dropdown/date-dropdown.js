import AirDatepicker from 'air-datepicker';
import Arrow_button from '../blanks/arrow-button/arrow-button';
import 'jquery-mask-plugin';

class MyDatepicker {
    constructor() {
        this.submitButton = {
            content: 'Применить',
            className: 'air-datepicker--submitButton',
            onClick: (dp) => this.submit(dp),
        };
        this.options = {
            buttons: ['clear', this.submitButton],
            keyboardNav: false,
            multipleDatesSeparator: ' - ',
            startDate: new Date('2019-08-19'),
            onShow: () => {
                this.button.$wrapper.addClass('input_expanded');
            },

            navTitles: {
                days(dp) {
                    return `<span>
                     ${dp.formatDate(dp.viewDate, 'MMMM yyyy')}
                </span>`;
                },
            },
            prevHtml: `<span>arrow_back</span>`,
            nextHtml: `<span>arrow_forward</span>`,
        };
        this.dp = null;
        this.button = null;
        this.result = [];
    }
    // заготовка для отдачи результата
    submit(dp) {
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
    multiDateHandler(range, toClose = true) {
        const self = this;
        range.split(' - ').forEach((currentDate) => {
            const dateArr = currentDate.split(' ');
            const monthNum = self.dp.locale.monthsShort.findIndex(
                (monthName) => dateArr[1] === monthName
            );
            dateArr[1] =
                monthNum < 10 ? `0${(monthNum + 1).toString()}` : monthNum + 1;
            dateArr[2] = self.dp.selectedDates.length
                ? self.dp.selectedDates[0].getFullYear()
                : self.dp.viewDate.getFullYear();
            self.setDate(dateArr.join('.'), toClose);
        });
    }
    setDate(dateStr, toClose) {
        const date = dateStr.toString().split('.');
        if (
            date[2] > 2010 &&
            date[2] < 2030 &&
            date[1] > 0 &&
            date[1] < 13 &&
            date[0] > 0 &&
            date[0] <= 31
        ) {
            if (this.dp.isRange) {
                if (!this.result.length) {
                    this.result.push(new Date(date[2], date[1] - 1, date[0]));
                } else {
                    this.result.push(new Date(date[2], date[1] - 1, date[0]));
                    this.dp.selectDate(this.result);
                    this.result = [];
                }
            } else {
                this.dp.selectDate(new Date(date[2], date[1] - 1, date[0]));
            }
            this.dp.selectDate(this.dp.selectedDates);
            this.dp.setFocusDate(new Date(date[2], date[1] - 1, date[0]));

            if (this.dp.selectedDates.length && toClose) {
                this.submit(this.dp);
            }
        }
    }
    // обработчик для нажатия enter в поле ввода
    keyWatch(el) {
        const self = this;
        $(el)
            .closest('.input__body')
            .on('keydown', (e) => {
                if (e.code == 'Enter') {
                    if (self.dp.opts.range) {
                        self.multiDateHandler(el.value);
                    } else {
                        self.setDate(el.value);
                    }
                }
            });
    }
    init(container) {
        this.button = new Arrow_button();
        this.button.init($(container).closest('.input__body'));
        this.dp = new AirDatepicker(container, this.options);
        this.dp.isRange = $(container).hasClass('range') ? true : false;
        this.dp.opts.range = this.dp.isRange;
        this.dp.opts.dynamicRange = this.dp.isRange;
        if (this.dp.isRange) {
            this.dp.locale.monthsShort = [
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
        this.dp.locale.dateFormat = this.dp.isRange ? 'dd MMM' : 'dd.MM.yyyy';
        this.mask.call(this.dp);
        this.keyWatch(container);
        if (this.dp.isRange && container.value.length) {
            this.multiDateHandler(container.value, false);
        } else {
            if (container.value.length) {
                this.setDate(container.value, false);
            }
        }
    }
}
$('.datepicker').each(function () {
    const myDatepicker = new MyDatepicker();
    myDatepicker.init(this);
});
