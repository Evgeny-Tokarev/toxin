// import * as $ from 'jquery'
import AirDatepicker from 'air-datepicker'

const submitButton = {
    content: 'Применить',
    className: 'air-datepicker--submitButton',
    onClick: (dp) => {
        console.log(dp.selectedDates)

    }
}

new AirDatepicker('#datepicker', {inline: true,

    buttons: [  'clear',submitButton],
    startDate: [new Date(2019, 7, 8)],
    navTitles: {
        days(dp) {
            return `<span>
                     ${dp.formatDate(dp.selectedDates[0], 'MMMM yyyy')}
                </span>`;
        }
    },
    prevHtml: `<span>arrow_back</span>`,
    nextHtml: `<span>arrow_forward</span>`,
})
