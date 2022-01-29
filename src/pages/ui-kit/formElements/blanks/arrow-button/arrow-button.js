import './arrow-button.scss';

export default class ArrowButton {
  button = null;

  $wrapper = null;

  text = '';

  constructor(text) {
    this.text = text || 'expand_more';
  }

  init($input) {
    this.createButton($input);
    const self = this;
    this.$input = $input;
    this.$wrapper = $input.closest('.js-input');
    $(this.button).on('mousedown', (e) => {
      if (
        ($(e.target).hasClass('js-input__arrow-button') ||
          $(e.target).hasClass('js-input__button-icon')) &&
        !self.$wrapper.hasClass('js-input_expanded')
      ) {
        e.preventDefault();
        self.openMenu($input);
      } else if (
        $(e.target).hasClass('js-input__arrow-button') ||
        $(e.target).hasClass('js-input__button-icon')
      ) {
        self.closeMenu($input);
      }
    });
    $(document).on('click', (e) => {
      if (
        self.$wrapper.hasClass('js-input_expanded') &&
        !self.$wrapper.has(e.target).length &&
        !$(e.target).closest('.js-air-datepicker').length
      ) {
        self.closeMenu($input);
      }
    });
  }

  createButton($parent) {
    this.button = document.createElement('button');
    this.button.className = 'input__arrow-button js-input__arrow-button';
    this.button.innerHTML = `<span class="input__button-icon js-input__button-icon" type="null" tabindex="-1">${this.text}</span>`;
    $parent.append(this.button);
  }

  openMenu($input) {
    this.$wrapper.addClass('js-input_expanded input_expanded');
    $input.find('js-input').focus();
  }

  closeMenu($input) {
    this.$wrapper.removeClass('js-input_expanded input_expanded');
    $input.find('js-input').blur();
  }
}
