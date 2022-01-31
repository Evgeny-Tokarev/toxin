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

  btnAct() {
    return this.action && typeof this.action === 'function'
      ? this.action.bind(this)
      : this.expandList.bind(this);
  }

  init($input) {
    this.createButton($input);
    this.$wrapper = $input.closest(
      '.js-input_type_expandable' || '.js-input_type_sub',
    );
    this.isDatepicker = this.$wrapper.hasClass('js-input_type_ddd');
    this.$input = $input;
    this.btnAct()($input);
  }

  expandList($input) {
    const self = this;
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
        !this.isDatepicker
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
    console.log(this.$wrapper);
    this.$wrapper.addClass('js-input_expanded input_expanded');
    $input.find('input').focus();
  }

  closeMenu($input) {
    this.$wrapper.removeClass('js-input_expanded input_expanded');
    $input.find('input').blur();
  }
}
