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
        console.log(
            `${data[0]} - ${data[pagination.pageSize - 1]} из ${
                pagination.totalNumber < 100 ? pagination.totalNumber : '100+'
            } вариантов аренды`
        );
    },
});
