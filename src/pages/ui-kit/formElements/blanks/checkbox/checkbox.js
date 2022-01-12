import Arrow_button from '../arrow-button/arrow-button';
export default class Checkbox {
    init(input, isButton = false) {
        const values = [];
        $(input)
            .find('.input__body')
            .each(function (i) {
                if (isButton) {
                    const button = new Arrow_button();
                    button.init(this instanceof $ ? this : $(this));
                }
                const self = this;
                values[i] = {};
                $(this)
                    .find('input')
                    .on('change', function () {
                        $.each(
                            $(self).find('.input__checkbox-item'),
                            function () {
                                if ($(this).find('input').prop('checked')) {
                                    values[i][$(this).text()] = true;
                                } else {
                                    delete values[i][$(this).text()];
                                }
                            }
                        );
                        console.log(Object.getOwnPropertyNames(values[i]));
                    });
            });
    }
}
