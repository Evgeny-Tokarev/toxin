import '../../../../plugins/simplePagination/jquery.simplePagination.js';
import '../../../../plugins/simplePagination/simplePagination.css';

$(function () {
    $('.pagination').pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme',
    });
});
