const values = [];
$('.input_type_rb').each(function (i) {
    const self = this;
    values[i] = {};
    $(this)
        .find('input')
        .on('change', function () {
            $.each($(self).find('.input__checkbox-item'), function () {
                if ($(this).find('input').prop('checked')) {
                    values[i][$(this).text()] = true;
                } else {
                    delete values[i][$(this).text()];
                }
            });
            console.log(Object.getOwnPropertyNames(values[i]));
        });
});
