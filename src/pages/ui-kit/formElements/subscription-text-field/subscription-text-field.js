import * as $ from 'jquery';

$('.subscription-text-field')
    .closest('.input__body ')
    .on('click', function (e) {
        const button = $(this).find('.input__button');
        if (
            e.target === button[0] ||
            e.target === button.find('.input__button-icon')[0]
        ) {
            console.log($(this).find('input')[0].value);
            $(this).find('input')[0].value = '';
        }
    });
