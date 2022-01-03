import Arrow_button from '../blanks/arrow-button/arrow-button';

const button = new Arrow_button();
button.init($('.input_type_ecb').find('.input__body'));
const values = {};
$('.input_type_ecb input').on('change', function () {
    $.each($('.input__checkbox-item'), function () {
        if ($(this).find('input').prop('checked')) {
            values[$(this).text()] = true;
        }
    });
    console.log(values);
});
