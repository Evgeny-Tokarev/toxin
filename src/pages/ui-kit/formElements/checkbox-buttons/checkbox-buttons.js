const values = {};
$('.input_type_cbb input').on('change', function () {
    $.each($('.input_type_cbb .input__checkbox-item'), function () {
        if ($(this).find('input').prop('checked')) {
            values[$(this).text()] = true;
        } else {
            delete values[$(this).text()];
        }
    });
    console.log(Object.getOwnPropertyNames(values));
});
