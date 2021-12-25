import * as $ from 'jquery';
import AirDatepicker from 'air-datepicker';
const submitButton = {
    content: 'Применить',
    className: 'air-datepicker--submitButton',
    onClick: (dp) => {
        console.log(dp.selectedDates);
        dp.hide();
        dp.clear();
    },
};
const dp = [];
$('.datepicker').each(function (i) {
    dp[i] = new AirDatepicker('.datepicker', {
        buttons: ['clear', submitButton],
        startDate: [new Date(2019, 7, 8)],
        navTitles: {
            days(dp) {
                return `<span>
                     ${dp.formatDate(dp.selectedDates[0], 'MMMM yyyy')}
                </span>`;
            },
        },
        // showEvent: '',
        prevHtml: `<span>arrow_back</span>`,
        nextHtml: `<span>arrow_forward</span>`,
    });
    console.log(dp[i]);
    const button = $(this).closest('.input__body').find('.input__button');
    const input = this;
    button.on('click', function () {
        console.log($(dp[i].$datepicker).hasClass('-active-'));
        if ($(dp[i].$datepicker).hasClass('-active-')) {
            $(input).trigger('blur');
            console.log('-');
            // dp[i].hide();
        } else {
            $(input).trigger('focus');
            console.log('+');

            // dp[i].show();
        }
    });
});
