import Arrow_button from '../arrow-button/arrow-button';
export default class Checkbox {
    init(input, isButton = false) {
        const values = [];
        const checkbox = this;
        $(input)
            .find('.input__body')
            .each(function (i) {
                if (isButton) {
                    const button = new Arrow_button();
                    button.init(this instanceof $ ? this : $(this));
                }
                const isVivid = $(this)
                    .closest('.input')
                    .hasClass('input_type_rb')
                    ? true
                    : false;
                const self = this;
                values[i] = {};
                if (isVivid) {
                    checkbox.vividLabel($(this).find('input[checked]'));
                }
                $(this)
                    .find('input')
                    .on('change', function () {
                        $.each(
                            $(self).find('.input__checkbox-item'),
                            function () {
                                if ($(this).find('input').prop('checked')) {
                                    values[i][$(this).text()] = true;
                                    if (isVivid) {
                                        checkbox.vividLabel(
                                            $(this).find('input')
                                        );
                                    }
                                } else {
                                    delete values[i][$(this).text()];
                                }
                            }
                        );
                        console.log(Object.getOwnPropertyNames(values[i]));
                    });
            });
    }
    vividLabel($input) {
        $input
            .closest('.input__description')
            .find('label')
            .each(function () {
                $(this).removeClass('input__checkbox-item_checked');
            });

        $input.closest('label').addClass('input__checkbox-item_checked');
    }
}
