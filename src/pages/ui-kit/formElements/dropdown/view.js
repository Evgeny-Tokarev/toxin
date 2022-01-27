import ArrowButton from '../blanks/arrow-button/arrow-button';

export default class View {
  constructor() {
    this.presenter = null;
    this.itemsList = [];
    this.$placeholder = null;
    this.$clrbtn = null;
    this.$input = null;
    this.$submitbtn = null;
    this.distinctItemIndex = null;
    this.commonText = [];
    this.distinctValue = null;
    this.maxTotal = 20;
    this.isValid = true;
    this.distinctName = '';
    this.distinctForms = [];
  }

  registerWith(presenter) {
    this.presenter = presenter;
  }

  init(input) {
    const self = this;
    const $input = $(input);
    this.$input = $input;
    const $selectList = $input.find('.select-list');
    this.$clrbtn = $input.find('.select-list__control-button_type_clear');
    this.distinctItemIndex = parseInt($selectList.attr('data-distinct'), 10);
    this.distinctForms = $selectList.attr('data-distinctForms')
      ? $selectList.attr('data-distinctForms').split(',')
      : [];
    this.commonText = $selectList.attr('data-commonText')
      ? $selectList.attr('data-commonText').split(',')
      : [];
    if (
      $selectList.attr('data-maxTotal') &&
      $selectList.attr('data-maxTotal') < this.maxTotal
    ) {
      this.maxTotal = $selectList.attr('data-maxTotal');
    } else if (!$selectList.attr('data-maxTotal')) {
      this.maxTotal = null;
    }

    this.$submitbtn = $input.find('.select-list__control-button_type_submit');
    this.$placeholder = $input.find('.input__placeholder');
    this.button = new ArrowButton();
    this.button.init(this.$input.find('.input__body'));
    $.each($input.find('.select-list__item'), function (i) {
      const itemName = $(this).find('.select-list__name').text();
      if (self.distinctItemIndex && self.distinctItemIndex === i) {
        self.distinctName = itemName;
      }
      const itemValue = Math.abs(
        parseInt($(this).find('.select-list__item-value').text(), 10),
      );
      self.itemsList.push(this);
      self.presenter.setItem(itemName, itemValue);
    });
    $input.on('click', function (e) {
      const $target = $(e.target);
      const itemName = $(e.target)
        .closest('.select-list__item')
        .find('.select-list__name')
        .text();
      if (
        $(this).has(e.target).length &&
        $target.hasClass('select-list__button_type_decrease')
      ) {
        self.presenter.decreaseItem(itemName);
      }
      if (
        $(this).has(e.target).length &&
        $target.hasClass('select-list__button_type_increase')
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
    $.each(this.$input.find('.select-list__item'), function () {
      const itemName = $(this).find('.select-list__name').text();
      self.presenter.setItem(itemName, 0);
    });
  }

  setListItem(newNalueItemName, newValue, disabled) {
    const self = this;
    $.each(this.itemsList, function (i) {
      const itemName = $(this).find('.select-list__name').text();
      const $valueNode = $(this).find('.select-list__item-value');
      const $dcrbtn = $(this).find('.select-list__button_type_decrease');
      if (itemName === newNalueItemName) {
        if (self.distinctItemIndex && self.distinctItemIndex === i) {
          self.distinctValue = newValue;
        }
        $valueNode.text(newValue);
        $dcrbtn.prop('disabled', disabled);
      }
    });
    if (this.distinctItemIndex) {
      this.setCommonInputString();
    } else {
      this.setInputString();
    }
  }

  setClrbtnView() {
    return this.$placeholder.text() ===
      this.$input.find('.input__placeholder').attr('data-value')
      ? 'none'
      : 'block';
  }

  setInputString() {
    const valueArr = [];
    const outputArr = [];
    $.each(this.itemsList, (i, item) => {
      const value = $(item).find('.select-list__item-value').text();
      const name = $(item).find('.select-list__name').text();
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
    this.$clrbtn.css('display', this.setClrbtnView());
    if (this.maxTotal && this.distinctItemIndex) {
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
      const value = parseInt(
        $(item).find('.select-list__item-value').text(),
        10,
      );
      if (value > 0) {
        valueArr[i] = value;
      }
      if (i === self.distinctItemIndex && value > 0) {
        self.distinctValue = value;
      }
    });
    if (valueArr.length) {
      totalValue = this.total(valueArr);
    }
    this.isValid = !!(
      totalValue <= this.maxTotal && totalValue !== this.distinctValue
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
    } else if (str === '') {
      this.$placeholder.text(this.$placeholder.attr('data-value'));
    } else {
      this.$placeholder.text(str);
    }

    this.$clrbtn.css('display', this.setClrbtnView());
    this.validatePlaceholder();
  }
}
