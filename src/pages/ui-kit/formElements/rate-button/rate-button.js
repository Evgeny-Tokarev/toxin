export default class RateButton {
    init(selector) {
        const self = this;
        $(selector).each(function () {
            const inputs = $(this).find('input');
            const id = $(this).data('id');
            inputs.each(function (i, input) {
                $(input).on('click', function () {
                    const rating = self.setRate(inputs, $(this));
                    self.output(id, rating);
                });
            });
        });
    }
    setRate(inputs, input) {
        const rating = input.prop('value');
        inputs.each(function (i, currentInput) {
            const currentIndex = $(currentInput).prop('value');
            if (currentIndex <= rating) {
                $(currentInput).prop('checked', true);
            } else {
                $(currentInput).prop('checked', false);
            }
        });
        return rating;
    }
    output(id, rating) {
        rating++;
        console.log(`Rating for ${id} is ${rating}`);
    }
}

const rateButton = new RateButton();
rateButton.init('.input_type_rat');
