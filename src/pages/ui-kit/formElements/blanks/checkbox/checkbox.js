import ArrowButton from '../arrow-button/arrow-button';

const makeJqueryInstance = (selector) => {
  let instance = null;
  try {
    instance = selector instanceof $ ? selector : $(selector);
  } catch (e) {
    console.error(e);
  }
  return instance;
};

export default class Checkbox {
  constructor() {
    this.isRich = false;
    this.itemValues = {};
    this.$wrapper = null;
    this.$checkboxBody = null;
  }

  init(wrapper) {
    this.$wrapper = makeJqueryInstance(wrapper);
    this.$checkboxBody = this.$wrapper.find('.js-input__body');
    this.isRich = !!this.$wrapper.hasClass('js-input_type_rb');
    const button = new ArrowButton();
    console.log(button);
    button.init(this.$checkboxBody);
    if (this.isRich) {
      this.handleRichLabel($(this).find('input[checked]'));
    }
    this.$checkboxBody.find('input').on('change', () => {
      this.addValuesToList();
      console.log(Object.getOwnPropertyNames(this.itemValues));
    });
  }

  addValuesToList() {
    const self = this;
    $.each(this.$checkboxBody.find('.js-input__checkbox-item'), function () {
      const checkFlag = $(this).find('input').prop('checked');
      if (checkFlag) {
        self.itemValues[$(this).text()] = true;
        if (this.isRich) {
          self.$checkbox.richLabel($(this).find('input'));
        }
      } else {
        delete self.itemValues[$(this).text()];
      }
    });
  }

  handleRichLabel($itemInput) {
    $itemInput
      .closest('.js-input__description')
      .find('label')
      .each(function () {
        $(this).removeClass('input__checkbox-item_checked');
      });

    $itemInput.closest('label').addClass('input__checkbox-item_checked');
  }
}
