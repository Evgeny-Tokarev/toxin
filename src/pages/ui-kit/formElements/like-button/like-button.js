export default class LikeButton {
    values = [];
    init(selector) {
        const self = this;
        $(selector).each(function (i) {
            const input = $(this).find('input');
            self.setValues(input, i);
            input.on('change', function () {
                if ($(this).prop('checked')) {
                    self.increaseValue($(this), i);
                } else {
                    self.decreaseValue($(this), i);
                }
                console.log(self.values[i]);
            });
        });
    }
    setValues(input, i) {
        this.values[i] = {};
        this.values[i].name = input.prop('name');
        this.values[i].isLiked = input.prop('checked');
        this.values[i].value = input.prop('value');
    }
    increaseValue(input, i) {
        this.values[i].isLiked = true;
        this.values[i].value++;
        input.prop('value', this.values[i].value);

        input
            .siblings('.like-button__checkbox')
            .text(this.values[i].value > 99 ? '99+' : this.values[i].value);
    }
    decreaseValue(input, i) {
        this.values[i].isLiked = false;
        this.values[i].value--;
        input.prop('value', this.values[i].value);
        input
            .siblings('.like-button__checkbox')
            .text(this.values[i].value > 99 ? '99+' : this.values[i].value);
    }
}
const likeButton = new LikeButton();
likeButton.init('.like-button');
