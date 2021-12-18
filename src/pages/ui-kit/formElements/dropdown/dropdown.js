import * as $ from 'jquery'
// const list = $('.select-list')
// const decrButtons = $('.select-list__button_type_decrease')
// const incrButtons = $('.select-list__button_type_increase')
// const listValues = $('.select-list__item-value')
// const valueArr = []

const View = {
    presenter: null,
    registerPresenter(presenter) {
        this.presenter = presenter
    },
    init(input) {
        const self = this
        input = $(input)
        input.find('.select-list__item').each(function () {
            self.presenter.listButtonsHandler.setItem.call(
                self.presenter,
                this.getAttribute('data-number')
            )
        })
        input.on('click', function (e) {
            if ($(e.target).hasClass('input__button')) {
                e.stopPropagation()
                self.expandList(input)
            }
            if ($(e.target).hasClass('select-list__button_type_decrease')) {
                e.stopPropagation()
                self.presenter.listButtonsHandler.decreaseItem.call(
                    self.presenter,
                    $(e.target)
                        .closest('.select-list__item')
                        .attr('data-number')
                )
            }
            if ($(e.target).hasClass('select-list__button_type_increase')) {
                e.stopPropagation()
                self.presenter.listButtonsHandler.increaseItem.call(
                    self.presenter,
                    $(e.target)
                        .closest('.select-list__item')
                        .attr('data-number')
                )
            }
        })
    },
    expandList(input) {
        $(input).find('.input__body').toggleClass('input__body_expanded')
    },
    setListItems(list) {
        list.each(() => {
            $(this).find('.select-list__name').text(list.name)
            list.decreaseButtonDisabled
                ? $(this)
                      .find('.select-list__button_type_increase')
                      .addClass('select-list__button_type_disabled')
                : $(this)
                      .find('.select-list__button_type_increase')
                      .removeClass('select-list__button_type_disabled')
            $(this).find('.select-list__item-value').text(list.value)
        })
    },
}
const Presenter = {
    model: null,
    view: null,
    register(model, view) {
        this.model = model
        this.view = view
    },

    listButtonsHandler: {
        setItem(i) {
            this.model.setItem(i, { value: 0, decreaseButtonDisabled: true })
        },
        increaseItem(i) {
            console.log(i)
            console.log(this.model.getValue)
            // this.model.setItem(i, {
            //     value: this.model.getValue(i).value,
            //     decreaseButtonDisabled: true,
            // })
        },
        decreaseItem(i) {
            const self = this
            console.log(self.model.getValue(i).value--)
            this.model.setItem(i, {
                value: self.model.getValue(i).value--,
                decreaseButtonDisabled: true,
            })
        },
    },
}
const Model = {
    presenter: null,
    registerPresenter(presenter) {
        this.presenter = presenter
    },
    listValues: [],
    setItem(i, data) {
        this.listValues[i] = data
        console.log(this.listValues[i])
    },
    getValue(i) {
        console.log(this)
        return this.listValues[i]
    },
}

$('.input').each(function () {
    const view = Object.create(View)
    const presenter = Object.create(Presenter)
    const model = Object.create(Model)
    view.registerPresenter(presenter)
    model.registerPresenter(presenter)
    presenter.register(model, view)
    view.init(this)
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
