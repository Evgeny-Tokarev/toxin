import * as $ from 'jquery';

export default class Arrow_button {
    button = null;
    constructor() {}
    init(input) {
        this.createButton(input);
        const self = this;
        input = $(input);
        this.input = input;
        this.button.on('click', function (e) {
            if (
                $(e.target).hasClass('input__button') ||
                ($(e.target).hasClass('input__button-icon') &&
                    !input.hasClass('input__expanded'))
            ) {
                self.openMenu(input);
            } else {
                if (
                    $(e.target).hasClass('input__button') ||
                    $(e.target).hasClass('input__button-icon')
                ) {
                    self.closeMenu(input);
                }
            }
        });
        $(document).on('click', function (e) {
            e.stopPropagation;

            if (
                input.hasClass('input__expanded') &&
                !input.has(e.target).length
            ) {
                self.closeMenu(input);
            }
        });
    }
    createButton(parent) {
        this.button = document.createElement('div');
        this.button.className = 'input__arrow-button';
        this.button.innerHTML = `<button class="input__button-icon" type="null" tabindex="-1"></button>`;
        parent.append(this.button);
    }
    openMenu(input) {
        input.addClass('input__expanded');
        input.find('.input__body').addClass('input__body_expanded');
    }
    closeMenu(input) {
        input.removeClass('input__expanded');
        input.find('.input__body').removeClass('input__body_expanded');
    }
}
