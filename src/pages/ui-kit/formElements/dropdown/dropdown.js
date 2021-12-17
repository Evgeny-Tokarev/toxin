import * as $ from 'jquery'
// const list = $('.select-list')
// const decrButtons = $('.select-list__button_type_decrease')
// const incrButtons = $('.select-list__button_type_increase')
// const listValues = $('.select-list__item-value')
// const valueArr = []

// При клике на 'input__button' добавляем модифицированный класс 'input__body_expanded' для '.input__body'
const View = {
    presenter: null,
    registerPresenter(presenter) {
        this.presenter = presenter
    },
    init(input) {
        console.log(input)
        const self = this
        input = $(input)
        input.on('click', function (e) {
            console.log(this)
            if ($(e.target).hasClass('input__button')) {
                e.stopPropagation()
                self.expandList(input)
            }
        })
    },
    expandList(input) {
        $(input).find('.input__body').toggleClass('input__body_expanded')
    },
    setListItems(list) {
        list.each(() => {
            console.log(i)
            $(this).find('.select-list__name').text(list.name)
            list.increaseButtonDisabled
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

$('.input').each(function () {
    const view = Object.create(View)
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
