import ArrowButton from '../blanks/arrow-button/arrow-button';

export default class View {
  constructor() {
    this.presenter = null;
    this.itemsList = [];
    this.$placeholder = null;
    this.$clrbtn = null;
    this.$selectList = null;
    this.$input = null;
    this.$submitbtn = null;
    this.distinctItemIndex = null;
    this.commonText = [];
    this.distinctValue = null;
    this.maxTotal = null;
    this.isValid = true;
    this.distinctName = '';
    this.distinctForms = [];
    this.isDistinct = false;
    this.isCommon = false;
  }

  registerWith(presenter) {
    this.presenter = presenter;
  }

  init(input) {
    const self = this;
    this.$input = $(input);
    this.$selectList = this.$input.find('.js-input__select-list');
    this.$clrbtn = this.$input.find('.js-input__control-button_type_clear');
    this.isDistinct =
      typeof this.$selectList.attr('data-distinct') !== typeof undefined &&
      this.$selectList.attr('data-distinct') !== false;
    this.isCommon =
      typeof this.$selectList.attr('data-commonText') !== typeof undefined &&
      this.$selectList.attr('data-commonText') !== false;
    this.commonText = this.isCommon
      ? this.$selectList.attr('data-commonText').split(',')
      : [];
    if (this.isDistinct) {
      this.distinctInit();
    }
    this.maxTotal = this.$selectList.attr('data-maxTotal');
    this.$submitbtn = this.$input.find('.js-input__control-button_type_submit');
    this.$placeholder = this.$input.find('.js-input__placeholder');
    this.button = new ArrowButton();
    this.button.init(this.$input.find('.js-input__body'));
    $.each(this.$input.find('.js-input__list-item'), function (i) {
      const itemName = $(this).find('.js-input__item-name').text();
      if (self.isDistinct && self.distinctItemIndex === i) {
        self.distinctName = itemName;
      }
      const itemValue = Math.abs(
        parseInt($(this).find('.js-input__item-value').text(), 10),
      );
      self.itemsList.push(this);
      self.presenter.setItem(itemName, itemValue);
    });
    this.setListener(this.$input);
  }

  setListener($input) {
    const self = this;
    $input.on('click', function (e) {
      const $target = $(e.target);
      const itemName = $target
        .closest('.js-input__list-item')
        .find('.js-input__item-name')
        .text();
      if (
        $(this).has(e.target).length &&
        $target.hasClass('js-input__item-button_type_decrease')
      ) {
        self.presenter.decreaseItem(itemName);
      }
      if (
        $(this).has(e.target).length &&
        $target.hasClass('js-input__item-button_type_increase')
      ) {
        self.presenter.increaseItem(itemName);
      }

      if (self.$clrbtn.has(e.target).length || e.target === self.$clrbtn[0]) {
        self.clear();
      }
      if (
        (self.$submitbtn.has(e.target).length ||
          e.target === self.$submitbtn[0]) &&
        self.isValid
      ) {
        self.presenter.submit();
        self.clear();
        self.$input.removeClass('input_expanded');
      }
    });
  }

  distinctInit() {
    this.distinctItemIndex = parseInt(
      this.$selectList.attr('data-distinct'),
      10,
    );
    this.distinctForms = this.$selectList.attr('data-distinctForms')
      ? this.$selectList.attr('data-distinctForms').split(',')
      : [];
  }

  decline(wordForms, number) {
    this.n = Math.abs(number) % 100;
    this.n1 = this.n % 10;
    if (this.n > 10 && this.n < 20) {
      return wordForms[2];
    }
    if (this.n1 > 1 && this.n1 < 5) {
      return wordForms[1];
    }
    if (this.n1 === 1) {
      return wordForms[0];
    }
    return wordForms[2];
  }

  clear() {
    const self = this;
    $.each(this.$input.find('.js-input__list-item'), function () {
      const itemName = $(this).find('.js-input__item-name').text();
      self.presenter.setItem(itemName, 0);
    });
  }

  setListItem(newValueItemName, newValue, isDisabled) {
    $.each(this.itemsList, (i, item) => {
      const itemName = $(item).find('.js-input__item-name').text();
      const $valueNode = $(item).find('.js-input__item-value');
      const $dcrbtn = $(item).find('.js-input__item-button_type_decrease');
      if (itemName === newValueItemName) {
        if (this.isDistinct && this.distinctItemIndex === i) {
          this.distinctValue = newValue;
        }
        $valueNode.text(newValue);
        $dcrbtn.prop('disabled', isDisabled);
      }
    });
    if (this.isDistinct || this.isCommon) {
      this.setCommonInputString();
    } else {
      this.setInputString();
    }
  }

  setClrbtnDisplay() {
    return this.$placeholder.text() ===
      this.$input.find('.js-input__placeholder').attr('data-value')
      ? 'none'
      : 'block';
  }

  setInputString() {
    const valueArr = [];
    const outputArr = [];
    $.each(this.itemsList, (i, item) => {
      const value = $(item).find('.js-input__item-value').text();
      const name = $(item).find('.js-input__item-name').text();
      if (value > 0) {
        outputArr[i] = `${value} ${name}`;
        valueArr.push(parseInt(value, 10));
      }
    });
    let str = '';
    const trimmedArr = outputArr.filter(Boolean);
    if (valueArr.length) {
      this.isValid = this.total(valueArr) <= this.maxTotal;
    } else {
      this.isValid = true;
    }
    if (trimmedArr.length) {
      str = trimmedArr.join(', ');
      str =
        str.length > 19
          ? trimmedArr.join(', ').slice(0, 20).concat('...')
          : str;
    } else {
      str = this.$placeholder.attr('data-value');
    }
    this.$placeholder.text(str);
    this.$clrbtn.css('display', this.setClrbtnDisplay());
    if (this.maxTotal) {
      this.validatePlaceholder();
    }
  }

  validatePlaceholder() {
    if (this.isValid) {
      this.$placeholder.removeClass('input__placeholder_type_invalid');
    } else {
      this.$placeholder.addClass('input__placeholder_type_invalid');
    }
  }

  total(arr) {
    return arr.reduce((a, b) => a + b);
  }

  setCommonInputString() {
    const valueArr = [];
    let totalValue = null;
    const self = this;
    $.each(this.itemsList, (i, item) => {
      const value = parseInt($(item).find('.js-input__item-value').text(), 10);
      if (value > 0) {
        valueArr[i] = value;
      }
      if (i === self.distinctItemIndex && value > 0) {
        self.distinctValue = value;
      }
    });
    if (valueArr.length) {
      totalValue = this.total(valueArr);
    } else {
      totalValue = 0;
    }
    this.isValid = !!(
      (totalValue <= this.maxTotal && totalValue !== this.distinctValue) ||
      totalValue === 0
    );
    let str = '';
    if (totalValue) {
      str = `${totalValue} ${this.decline(this.commonText, totalValue)}`;
    }
    if (this.distinctValue) {
      this.$placeholder.text(
        `${str}, ${this.distinctValue} ${this.decline(
          this.distinctForms,
          this.distinctValue,
        )} `,
      );
    }
    if (str === '') {
      this.$placeholder.text(this.$placeholder.attr('data-value'));
    } else {
      this.$placeholder.text(str);
    }
    this.$clrbtn.css('display', this.setClrbtnDisplay());
    if (this.maxTotal) {
      this.validatePlaceholder();
    }
  }
}
