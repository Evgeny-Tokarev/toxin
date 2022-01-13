import Arrow_button from '../blanks/arrow-button/arrow-button';

class View {
    constructor() {
        this.presenter = null;
        this.itemsList = [];
        this.$placeholder = null;
        this.$clrbtn = null;
        this.$input = null;
        this.$submitbtn = null;
        this.button = new Arrow_button();
        this.button.init(this.$input.find('.input__inner'));
    }

    registerWith(presenter) {
        this.presenter = presenter;
    }

    init(input) {
        const self = this;
        const $input = $(input);
        this.$input = $input;
        this.$clrbtn = $input.find('.select-list__control-button_type_clear');
        this.$submitbtn = $input.find(
            '.select-list__control-button_type_submit'
        );
        this.$placeholder = $input.find('.input__placeholder');
        $.each($input.find('.select-list__item'), function () {
            const itemName = $(this).find('.select-list__name').text();
            const itemValue = Math.abs(
                parseInt($(this).find('.select-list__item-value').text())
            );
            self.itemsList.push(this);
            self.presenter.setItem(itemName, itemValue);
        });
        $input.on('click', function (e) {
            const $target = $(e.target);
            if ($target.hasClass('select-list__button_type_decrease')) {
                e.stopPropagation();
                const itemName = $(e.target)
                    .closest('.select-list__item')
                    .find('.select-list__name')
                    .text();
                self.presenter.decreaseItem(itemName);
            }
            if ($target.hasClass('select-list__button_type_increase')) {
                e.stopPropagation();
                self.presenter.increaseItem(itemName);
            }
            if (self.$clrbtn.has(e.target).length) {
                self.clear();
            }
            if (self.$submitbtn.has(e.target).length) {
                self.presenter.submit();
                self.clear();
                $input.removeClass('input_expanded');
            }
        });
    }
    clear() {
        const self = this;
        $.each(this.$input.find('.select-list__item'), function () {
            const itemName = $(this).find('.select-list__name').text();
            self.presenter.setItem(itemName, 0);
        });
    }
    setListItem(newNalueItemName, newValue, disabled) {
        $.each(this.itemsList, function () {
            const itemName = $(this).find('.select-list__name').text();
            const $valueNode = $(this).find('.select-list__item-value');
            const $dcrbtn = $(this).find('.select-list__button_type_decrease');
            console.log(item === this);
            if (itemName === newNalueItemName) {
                $valueNode.text(newValue);
                $dcrbtn.prop('disabled', disabled);
            }
        });
        this.setInputString();
    }
    setClrbtnView() {
        return this.$placeholder.text() ===
            this.$input.find('.input__placeholder').attr('data-value')
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
        const trimmedArr = valueArr.filter(Boolean);
        if (trimmedArr.length) {
            str = trimmedArr.join(', ');
            str =
                str.length > 19
                    ? trimmedArr.join(', ').slice(0, 20).concat('...')
                    : str;
        } else {
            str = this.$placeholder.attr('data-value');
        }

        this.$placeholder.text(str);
        this.$clrbtn.css('display', this.setClrbtnView());
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
        if (this.model.getValue(name) > 1) {
            this.view.setListItem(name, this.model.getValue(name), false);
        } else {
            this.view.setListItem(name, this.model.getValue(name), true);
        }
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
$('.input_type_expandable').each(function (i) {
    model[i] = new Model();
    view[i] = new View(this);
    presenter[i] = new Presenter(view[i]);
    presenter[i].setModel(model[i]);
    view[i].registerWith(presenter[i]);
    view[i].init(this);
});
