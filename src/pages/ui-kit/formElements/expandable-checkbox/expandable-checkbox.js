import Arrow_button from '../blanks/arrow-button/arrow-button';
const values = [];

$('.input_type_ecb')
    .find('.input__body')
    .each(function (i) {
        const button = new Arrow_button();
        const self = this;
        values[i] = {};
        button.init(this);
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
