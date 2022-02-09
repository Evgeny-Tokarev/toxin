import './arrow-button.scss';

export default class ArrowButton {
  constructor(text, action) {
    this.$input = null;
    this.button = null;
    this.$wrapper = null;
    this.text = text || 'expand_more';
    this.isDatepicker = false;
    this.action = action;
  }

  getBtnAct() {
    return this.action && typeof this.action === 'function'
      ? this.action.bind(this)
      : this.handleExpand.bind(this);
  }

  init($input) {
    this.createButton($input);
    this.$wrapper = $input.closest(
      '.js-input_type_expandable, .js-input_type_sub, .js-input_type_ecb',
    );
    this.isDatepicker = this.$wrapper.hasClass('js-input_type_ddd');
    this.$input = $input;
    this.getBtnAct()($input);
  }

  handleExpand($input) {
    $(this.button).on('mousedown', (e) => {
      if (
        ($(e.target).hasClass('js-input__arrow-button') ||
          $(e.target).hasClass('js-input__button-icon')) &&
        !this.$wrapper.hasClass('js-input_expanded')
      ) {
        e.preventDefault();
        this.openMenu($input);
      } else if (
        $(e.target).hasClass('js-input__arrow-button') ||
        $(e.target).hasClass('js-input__button-icon')
      ) {
        this.closeMenu($input);
      }
    });
    $(document).on('click', (e) => {
      if (
        this.$wrapper.hasClass('js-input_expanded') &&
        !this.$wrapper.has(e.target).length &&
        !this.isDatepicker
      ) {
        this.closeMenu($input);
      }
    });
  }

  createButton($parent) {
    this.button = document.createElement('button');
    this.button.className = 'input__arrow-button js-input__arrow-button';
    this.button.innerHTML = `<span class="input__button-icon js-input__button-icon">${this.text}</span>`;
    $parent.append(this.button);
  }

  openMenu($input) {
    this.$wrapper.addClass('js-input_expanded input_expanded');
    $input.find('input').focus();
  }

  closeMenu($input) {
    this.$wrapper.removeClass('js-input_expanded input_expanded');
    $input.find('input').blur();
  }
}
