import ArrowButton from '../blanks/arrow-button/arrow-button';

class SubscriptionTextField {
  init($input) {
    const submit = function () {
      $(this.button).on('mousedown', (e) => {
        const $inputField = this.$input.find('.js-input__field');
        if (
          $(e.target).hasClass('js-input__arrow-button') ||
          $(e.target).hasClass('js-input__button-icon')
        )
          console.log($inputField.val());
        $inputField.val('');
      });
    };
    this.button = new ArrowButton('arrow_forward', submit);
    this.button.init($input.find('.js-input__body'));
  }
}
$('.js-input_type_sub').each(function () {
  const sub = new SubscriptionTextField();
  sub.init($(this));
});
