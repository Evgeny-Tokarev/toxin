import 'jquery-mask-plugin';

$(() => {
  $('.js-input__field').on('keydown', function (e) {
    if (e.code === 'Enter') {
      console.log(e.target.value);
      this.value = '';
    }
  });
  $('.js-input__field[data-mask]').each(function () {
    const currentMask = $(this).attr('data-mask') || '0#';
    $(this).mask(currentMask);
  });
});
