import 'paginationjs';
$('.pagination').pagination({
    dataSource(done) {
        const result = [];
        for (let i = 1; i < 175; i++) {
            result.push(i);
        }
        done(result);
    },
    pageSize: 12,
    pageRange: 1,
    showPrevious: false,
    showNext: true,
    nextText: 'arrow_forward',
    callback(data, pagination) {
        pagination.el
            .closest('.pagination')
            .find('.pagination-description')
            .html('');
        pagination.el.closest('.pagination').append(
            `<span class='pagination-description'>${
                data[0]
            } <span class='pagination-dash'>–</span>	
             ${data[data.length - 1]} из ${
                pagination.totalNumber < 100 ? pagination.totalNumber : '100+'
            } вариантов аренды</span>`
        );
    },
});
