import * as $ from 'jquery'
import '../../../../plugins/jquery-ui/jquery-ui'

console.log($.fn)

console.log($.fn.datepicker)

$.widget('toxin.myDatepicker', $.fn.datepicker, {
    options: {},
})
// $(function () {
//       $('#datepicker').datepicker()
//   })

//   $('span .ui-icon-circle-triangle-w .ui-corner-all').text('arrow_back')
