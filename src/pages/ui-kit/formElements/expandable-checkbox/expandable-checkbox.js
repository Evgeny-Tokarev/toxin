import * as $ from 'jquery';

$('.expandableCheckbox').on('click', function (e) {
    console.log(e.target);
    $(this).toggleClass('input__body_expanded');
});
