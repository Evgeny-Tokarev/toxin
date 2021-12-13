import * as $ from 'jquery'
const list = $('.select-list')
const decrButtons = $('.select-list__button_type_decrease')
const incrButtons = $('.select-list__button_type_increase')
const listValues = $('.select-list__item-value')
const valueArr = [];

// При клике на 'input__button' добавляем модифицированный класс 'input__body_expanded' для '.input__body'

$(document).on('click', '.input__body', function(e) {
    if (($(e.target).hasClass('input__button'))) { 
        e.stopPropagation()
        $(this).toggleClass('input__body_expanded')
    }
});

// Логика работы кнопок + и - в пунктах меню

list.on('click', function(event) {
    const placeholder =$(this).closest('.input__body').find('.input__placeholder');
    const context = this
    decrButtons.each((i, button) => {
        if (event.target === button) {
            if (listValues[i].innerHTML > 1) {
                listValues[i].innerHTML--
            } else {
                if (listValues[i].innerHTML == 1) {
                    listValues[i].innerHTML--
                    button.classList.add('select-list__button_type_disabled')
                }
            }
        }
    })
    incrButtons.each((i, button) => {
        if (event.target === button) {
            if (listValues[i].innerHTML == 0) {
                decrButtons[i].classList.remove(
                    'select-list__button_type_disabled'
                )
                listValues[i].innerHTML++
            } else {
                listValues[i].innerHTML++
            }
        }
    })
    // Записываем выбранные значения в тело поля ввода

listValues.each(function(i,value) {
    if ((value.innerHTML > 0)&&(context.contains(value))) {
        valueArr[i]= `${$(value).closest('.select-list__item').find('.select-list__name').html()} ${value.innerHTML}`
    } else {
        if (context.contains(value)) {
        valueArr[i]=null;
        }
    }
})
placeholder.text(valueArr.filter(Boolean).length ? valueArr.filter(Boolean).join(', '): $(this).closest('.input__body').find('.input__placeholder').attr('data-value'))  
})



