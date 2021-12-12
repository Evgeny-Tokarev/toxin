import * as $ from 'jquery'
const list = $('.select-list')
const decrButtons = $('.select-list__button_type_decrease')
const incrButtons = $('.select-list__button_type_increase')
const listValues = $('.select-list__item-value')

$('.input__field').on('click', function () {
    $('.select-list__item').toggleClass('select-list__item_hidden')
    $(this).addClass('input__field_expanded')
})
list.on('click', (event) => {
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
})
