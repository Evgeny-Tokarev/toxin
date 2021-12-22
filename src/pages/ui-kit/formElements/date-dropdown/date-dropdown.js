import * as $ from 'jquery'
import 'jquery-ui/ui/widget'
import 'jquery-ui/ui/widgets/datepicker'

console.log($.ui.datepicker)
console.log(typeof $.ui.datepicker)

$.widget('toxin.myDatepicker', $.ui.datepicker, {
    options: {},
})
// $(function () {
//       $('#datepicker').datepicker()
//   })
  
//   $('span .ui-icon-circle-triangle-w .ui-corner-all').text('arrow_back')