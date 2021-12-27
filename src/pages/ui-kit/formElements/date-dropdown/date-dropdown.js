import * as $ from 'jquery';
import AirDatepicker from 'air-datepicker';
function submit(dp) {
    console.log(dp.selectedDates);
    setTimeout(() => {
        dp.hide();
        dp.clear();
    }, 1000);
    dp.setViewDate(new Date());
}
const submitButton = {
    content: 'Применить',
    className: 'air-datepicker--submitButton',
    onClick: (dp) => submit(dp),
};
// массив для хранения экземпляров datepicker
const dp = [];
// Применяем маску ввода ко всем элементам с классом datepicker
$(function () {
    $('.datepicker').mask('00.00.0000');
});
$('.datepicker').each(function (i, el) {
    const self = this;
    const button = this.nextElementSibling;
    dp[i] = new AirDatepicker(el, {
        // inline: true,
        buttons: ['clear', submitButton],
        startDate: [new Date(2019, 7, 8)],
        keyboardNav: false,
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
    });
    console.log(dp[i].$el.readonly);
    // dp[i].$el.setAttribute('readonly', false);
    this.closest('.input__body').addEventListener('keydown', (e) => {
        if (e.code == 'Enter') {
            // dp[i].setFocusDate(this.value, { viewDateTransition: true });

            dp[i].selectDate(this.value);
            if (dp[i].selectedDates.length) {
                submit(dp[i]);
            }
        }
    });
    this.closest('.input__body').addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (
            (e.target === button ||
                e.target === button.firstElementChild ||
                self.contains(e.target)) &&
            !dp[i].$datepicker.classList.contains('-active-')
        ) {
            self.focus();
            if (this.value) {
                dp[i].selectDate(this.value);
            }
            dp[i].show();
        } else {
            if (
                dp[i].$datepicker.classList.contains('-active-') &&
                (e.target === button ||
                    e.target === button.firstElementChild ||
                    !self.contains(e.target)) &&
                !dp[i].$datepicker.contains(e.target)
            ) {
                dp[i].hide();
                self.blur();
            }
        }
    });
});
