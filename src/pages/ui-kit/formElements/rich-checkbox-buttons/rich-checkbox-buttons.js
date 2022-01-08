import Checkbox from '../blanks/checkbox/checkbox';

class RichButtons extends Checkbox {
    constructor(selector) {
        super();
        this.richHandler(selector);
    }
    richHandler(item) {
        $(item).each(function () {
            $(this)
                .find('.input__checkbox-item')
                .each(function () {
                    const [header, description] = $(this).text().split('&');
                    $(this).contents()[0].nodeValue = '';
                    $(this).append(
                        `<h3 class='input__item-header'>${header}</h3>`
                    );
                    $(this).append(
                        `<span class='input__item-description'>${description}</span>`
                    );
                });
        });
    }
}
const richButtons = new RichButtons('.input_type_rich');
richButtons.init('.input_type_rich');
