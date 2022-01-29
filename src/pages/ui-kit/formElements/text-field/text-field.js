import 'jquery-mask-plugin';

$(() => {
  $('.js-input_type_mask').each(function () {
    const currentMask = $(this).find('input').attr('data-mask') || '0#';
    $(this).find('input').mask(currentMask);
  });
});
