import * as $ from 'jquery'

class View {
    constructor() {
        this.presenter = null
    }

    registerWith(presenter) {
        this.presenter = presenter
    }
    itemsList = []
    init(input) {
        const self = this
        input = $(input)
        $.each(input.find('.select-list__item'), function () {
            self.itemsList.push(this)
            self.presenter.setItem(this.getAttribute('data-number'))
        })
        input.on('click', function (e) {
            if ($(e.target).hasClass('input__button')) {
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
        $(input).find('.input__body').toggleClass('input__body_expanded')
    }
    setListItem(index, value, disabled) {
        console.log(this.itemsList[index], index, value, disabled)
        $(this.itemsList[index]).find('.select-list__item-value').text(value)
        $(this.itemsList[index])
            .find('.select-list__button_type_decrease')
            .prop('disabled', disabled)
        // list.each((i) => {
        //     $(this).find('.select-list__name').text(list.name)
        //     list.decreaseButtonDisabled
        //         ? $(this)
        //               .find('.select-list__button_type_increase')
        //               .addClass('select-list__button_type_disabled')
        //         : $(this)
        //               .find('.select-list__button_type_increase')
        //               .removeClass('select-list__button_type_disabled')
        //     $(this).find('.select-list__item-value').text(list.value)
        // })
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
        console.log(this.listValues[i])
    }
    getValue(i) {
        console.log(this)
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
// Логика работы кнопок + и - в пунктах меню

// list.on('click', function(event) {
//     const placeholder =$(this).closest('.input__body').find('.input__placeholder');
//     const context = this
//     decrButtons.each((i, button) => {
//         if (event.target === button) {
//             if (listValues[i].innerHTML > 1) {
//                 listValues[i].innerHTML--
//             } else {
//                 if (listValues[i].innerHTML == 1) {
//                     listValues[i].innerHTML--
//                     button.classList.add('select-list__button_type_disabled')
//                 }
//             }
//         }
//     })
//     incrButtons.each((i, button) => {
//         if (event.target === button) {
//             if (listValues[i].innerHTML == 0) {
//                 decrButtons[i].classList.remove(
//                     'select-list__button_type_disabled'
//                 )
//                 listValues[i].innerHTML++
//             } else {
//                 listValues[i].innerHTML++
//             }
//         }
//     })
//     // Записываем выбранные значения в тело поля ввода

// listValues.each(function(i,value) {
//     if ((value.innerHTML > 0)&&(context.contains(value))) {
//         valueArr[i]= `${$(value).closest('.select-list__item').find('.select-list__name').html()} ${value.innerHTML}`
//     } else {
//         if (context.contains(value)) {
//         valueArr[i]=null;
//         }
//     }
// })
// placeholder.text(valueArr.filter(Boolean).length ? valueArr.filter(Boolean).join(', '): $(this).closest('.input__body').find('.input__placeholder').attr('data-value'))
// })
