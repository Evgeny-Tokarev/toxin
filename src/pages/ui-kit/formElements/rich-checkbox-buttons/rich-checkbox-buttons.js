import Checkbox from '../blanks/checkbox/checkbox';

class RichButtons extends Checkbox {
  richHandler(item) {
    this.item = item;
    this.item.find('.input__checkbox-item').each(() => {
      [this.header, this.description] = this.item.text().split('&');
      this.item.contents()[0].nodeValue = '';
      this.item.append(`<h3 class='input__item-header'>${this.header}</h3>`);
      this.item.append(
        `<span class='input__item-description'>${this.description}</span>`,
      );
    });
  }
}
const $richButtons = $('.input_type_rich');
$richButtons.each(($richButton) => {
  const richButton = new RichButtons($richButton);
  richButton.richHandler(richButton);
});
