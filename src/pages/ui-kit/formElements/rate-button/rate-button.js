class RateButton {
  init(selector) {
    const self = this;
    $(selector).each(function () {
      const inputs = $(this).find('input');
      const id = $(this).data('id');
      inputs.each((i, input) => {
        $(input).on('click', function () {
          this.rating = self.setRate(inputs, $(this));
          self.output(id);
        });
      });
    });
  }

  setRate(inputs, input) {
    this.rating = input.prop('value');
    inputs.each((i, currentInput) => {
      const currentIndex = $(currentInput).prop('value');
      if (currentIndex <= this.rating) {
        $(currentInput).prop('checked', true);
      } else {
        $(currentInput).prop('checked', false);
      }
    });
    return this.rating;
  }

  output(id) {
    this.rating += 1;
    console.log(`Rating for ${id} is ${this.rating}`);
  }
}

const rateButton = new RateButton();
rateButton.init('.input_type_rat');
