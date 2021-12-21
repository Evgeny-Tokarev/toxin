import * as $ from 'jquery'
import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/ui/widgets/mouse'
import 'jquery-ui/ui/widget.js'
import 'jquery-ui/ui/plugin.js'

console.log($.ui)
console.log($.fn)
$(function () {
    $('#datepicker').datepicker()
})

$('span .ui-icon-circle-triangle-w .ui-corner-all').text('arrow_back')

$.widget('toxin.daepicker', $.ui.datepicker, {
    options: {},
})
