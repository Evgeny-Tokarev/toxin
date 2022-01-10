import './pagination.min.js';
$('.pagination').pagination({
    dataSource(done) {
        const result = [];
        for (let i = 1; i < 196; i++) {
            result.push(i);
        }
        done(result);
    },
    pageSize: 12,
    pageRange: 2,
    showPrevious: false,

    callback(data, pagination) {
        console.log(pagination);
        console.log(data);
    },
});
