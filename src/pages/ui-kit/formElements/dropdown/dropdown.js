import * as $ from 'jquery';
import Arrow_button from '../blanks/arrow-button/arrow-button';

class View {
    constructor() {
        this.presenter = null;
        this.itemsList = [];
        this.placeholder = null;
        this.clrbtn = null;
        this.input = null;
    }

    registerWith(presenter) {
        this.presenter = presenter;
    }

    init(input) {
        const self = this;
        input = $(input);
        this.input = input;
        this.clrbtn = input.find('.select-list__control-button_type_clear');
        this.placeholder = input.find('.input__placeholder');
        $.each(input.find('.select-list__item'), function () {
            self.itemsList.push(this);
            self.presenter.setItem(
                $(this).find('.select-list__name').text(),
                $(this).find('.select-list__name').attr('data-value')
            );
        });
        this.setInputString();

        input.on('click', function (e) {
            if (
                $(e.target).hasClass('input__button') ||
                ($(e.target).hasClass('input__button-icon') &&
                    !input.hasClass('input__expanded'))
            ) {
                self.openList(input);
            } else {
                if (
                    $(e.target).hasClass('input__button') ||
                    $(e.target).hasClass('input__button-icon')
                ) {
                    self.closeList(input);
                }
            }
            if ($(e.target).hasClass('select-list__button_type_decrease')) {
                e.stopPropagation();
                self.presenter.decreaseItem(
                    $(e.target)
                        .closest('.select-list__item')
                        .find('.select-list__name')
                        .text()
                );
            }
            if ($(e.target).hasClass('select-list__button_type_increase')) {
                e.stopPropagation();
                self.presenter.increaseItem(
                    $(e.target)
                        .closest('.select-list__item')
                        .find('.select-list__name')
                        .text()
                );
            }
            if (
                $('.select-list__control-button_type_clear').has(e.target)
                    .length
            ) {
                self.clear();
            }
            if (
                $('.select-list__control-button_type_submit').has(e.target)
                    .length
            ) {
                self.presenter.submit();
                self.clear();
                self.closeList(self.input);
            }
        });
        $(document).on('click', function (e) {
            e.stopPropagation;

            if (
                input.hasClass('input__expanded') &&
                !input.has(e.target).length
            ) {
                self.closeList(input);
            }
        });
    }
    clear() {
        const self = this;
        $.each(this.input.find('.select-list__item'), function () {
            self.presenter.setItem(
                $(this).find('.select-list__name').text(),
                0
            );
        });
    }
    openList(input) {
        input.addClass('input__expanded');
        input.find('.input__body').addClass('input__body_expanded');
        this.clrbtn.css('display', this.setClrbtnView());
    }
    closeList(input) {
        input.removeClass('input__expanded');
        input.find('.input__body').removeClass('input__body_expanded');
    }
    setListItem(name, value, disabled) {
        $.each(this.itemsList, function (i, item) {
            if ($(item).find('.select-list__name').text() === name) {
                $(item).find('.select-list__item-value').text(value);
                $(item)
                    .find('.select-list__button_type_decrease')
                    .prop('disabled', disabled);
            }
        });

        this.setInputString();
    }
    setClrbtnView() {
        return this.placeholder.text() ===
            this.input.find('.input__placeholder').attr('data-value')
            ? 'none'
            : 'block';
    }
    setInputString() {
        const valueArr = [];
        $.each(this.itemsList, function (i, item) {
            const value = $(item).find('.select-list__item-value').text();
            const name = $(item).find('.select-list__name').text();
            if (value > 0) {
                valueArr[i] = `${value} ${name}`;
            }
        });

        let str = '';
        if (valueArr.filter(Boolean).length) {
            str = valueArr.filter(Boolean).join(', ');
            str =
                str.length > 20
                    ? valueArr
                          .filter(Boolean)
                          .join(', ')
                          .slice(0, 20)
                          .concat('...')
                    : str;
        } else {
            str = this.placeholder.attr('data-value');
        }

        this.placeholder.text(str);
        this.clrbtn.css('display', this.setClrbtnView());
    }
}

class Presenter {
    constructor(view) {
        this.view = view;
        this.model = null;
    }
    submit() {
        console.log(this.model.listValues);
    }
    setModel(model) {
        this.model = model;
    }
    setItem(name, value) {
        this.model.setItem(name, value);
        this.view.setListItem(name, this.model.getValue(name), true);
    }
    increaseItem(name) {
        this.model.setItem(name, this.model.getValue(name) * 1 + 1);
        this.view.setListItem(name, this.model.getValue(name), false);
    }
    decreaseItem(name) {
        if (this.model.getValue(name) > 1) {
            this.model.setItem(name, this.model.getValue(name) - 1);
            this.view.setListItem(name, this.model.getValue(name), false);
        } else {
            this.model.setItem(name, this.model.getValue(name) - 1);
            this.view.setListItem(name, this.model.getValue(name), true);
        }
    }
}
class Model {
    constructor() {
        this.presenter = null;
        this.listValues = {};
    }
    registerWith(presenter) {
        this.presenter = presenter;
    }
    isEmpty(obj) {
        for (const key in obj) {
            return false;
            console.log(key);
        }
        return true;
    }
    setItem(name, newValue) {
        let isMatch = false;
        for (const value in this.listValues) {
            if (value === name) {
                this.listValues[name] = newValue;
                isMatch = true;
            }
        }
        if (!isMatch) {
            this.listValues[name] = newValue;
        }
    }
    getValue(name) {
        return this.listValues[name];
    }
}

const view = [];
const presenter = [];
const model = [];
$('.input')
    .has('.input__description')
    .each(function (i) {
        model[i] = new Model();
        view[i] = new View(this);
        presenter[i] = new Presenter(view[i]);
        presenter[i].setModel(model[i]);
        view[i].registerWith(presenter[i]);
        view[i].init(this);
    });
