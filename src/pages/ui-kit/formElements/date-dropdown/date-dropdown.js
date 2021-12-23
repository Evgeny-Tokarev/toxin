// import * as $ from 'jquery'
import AirDatepicker from 'air-datepicker'

new AirDatepicker('#datepicker', {
    inline: true,

    prevHtml: `<span>arrow_back</span>`,
    nextHtml: `<span>arrow_forward</span>`,
})
