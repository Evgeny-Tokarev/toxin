import * as $ from 'jquery'

class View {
    constructor() {
        this.presenter = null
        this.itemsList = []
        this.placeholder = null
    }

    registerWith(presenter) {
        this.presenter = presenter
    }

    init(input) {
        const self = this
        input = $(input)
        this.placeholder = input.find('.input__placeholder')
        $.each(input.find('.select-list__item'), function () {
            self.itemsList.push(this)
            self.presenter.setItem(this.getAttribute('data-number'))
        })
        input.on('click', function (e) {
            if (
                $(e.target).hasClass('input__button') ||
                $(e.target).hasClass('input__button-icon')
            ) {
                e.stopPropagation()
                self.expandList(input)
            }
            if ($(e.target).hasClass('select-list__button_type_decrease')) {
                e.stopPropagation()
                self.presenter.decreaseItem(
                    $(e.target)
                        .closest('.select-list__item')
                        .attr('data-number')
                )
            }
            if ($(e.target).hasClass('select-list__button_type_increase')) {
                e.stopPropagation()
                self.presenter.increaseItem(
                    $(e.target)
                        .closest('.select-list__item')
                        .attr('data-number')
                )
            }
        })
    }
    expandList(input) {
        input.toggleClass('input__expanded')
        input
            .find('.input__description')
            .css({ bottom: `-${this.itemsList.length * 39}px` })
        input.find('.input__body').toggleClass('input__body_expanded')
    }
    setListItem(index, value, disabled) {
        $(this.itemsList[index]).find('.select-list__item-value').text(value)
        $(this.itemsList[index])
            .find('.select-list__button_type_decrease')
            .prop('disabled', disabled)
        this.setInputString()
    }
    setInputString() {
        console.log(this)
        const valueArr = []
        $.each(this.itemsList, function (i, item) {
            const value = $(item).find('.select-list__item-value').text()
            const name = $(item).find('.select-list__name').text()
            if (value > 0) {
                valueArr[i] = `${name} ${value}`
            }
        })

        this.placeholder.text(
            valueArr.filter(Boolean).length
                ? valueArr.filter(Boolean).join(', ')
                : this.placeholder.attr('data-value')
        )
    }
}

class Presenter {
    constructor(view) {
        this.view = view
        this.model = null
    }
    setModel(model) {
        this.model = model
    }

    setItem(i) {
        this.model.setItem(i, 0)
    }
    increaseItem(i) {
        this.model.setItem(i, this.model.getValue(i) + 1)
        this.view.setListItem(i, this.model.getValue(i), false)
    }
    decreaseItem(i) {
        if (this.model.getValue(i) > 1) {
            this.model.setItem(i, this.model.getValue(i) - 1)
            this.view.setListItem(i, this.model.getValue(i), false)
        } else {
            this.model.setItem(i, this.model.getValue(i) - 1)
            this.view.setListItem(i, this.model.getValue(i), true)
        }
    }
}
class Model {
    constructor() {
        this.presenter = null
        this.listValues = []
    }
    registerWith(presenter) {
        this.presenter = presenter
    }

    setItem(i, value) {
        this.listValues[i] = value
    }
    getValue(i) {
        return this.listValues[i]
    }
}

const view = []
const presenter = []
const model = []
$('.input')
    .has('.input__description')
    .each(function (i) {
        model[i] = new Model()
        view[i] = new View(this)
        presenter[i] = new Presenter(view[i])
        presenter[i].setModel(model[i])
        view[i].registerWith(presenter[i])
        view[i].init(this)
    })
