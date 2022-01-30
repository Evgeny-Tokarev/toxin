import 'jquery-mask-plugin';

$(() => {
  $('.js-input__field[data-mask]').each(function () {
    const currentMask = $(this).attr('data-mask') || '0#';
    $(this).mask(currentMask);
  });
});
