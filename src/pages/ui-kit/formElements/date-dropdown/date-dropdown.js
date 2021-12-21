import * as $ from 'jquery'
import '../../../../plugins/jquery-ui/jquery-ui.js'



console.log($.ui)
console.log($.fn)
// $( function() {
//     $( '#datepicker' ).datepicker();
//   } )

// $('span .ui-icon-circle-triangle-w .ui-corner-all').text('arrow_back')

$.widget( 'toxin.daepicker', $.ui.datepicker, {
  options: {

  },
});