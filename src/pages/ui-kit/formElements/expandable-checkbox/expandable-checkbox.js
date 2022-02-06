import Checkbox from '../blanks/checkbox/checkbox';

$('.js-input_type_ecb').each(function () {
  const expandableCheckbox = new Checkbox();
  expandableCheckbox.init(this);
});
