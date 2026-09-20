Array.prototype.snail = function(rowsCount, colsCount) {
    if (rowsCount * colsCount !== this.length) return [];

    let matrix = [];
    for (let i = 0; i < rowsCount; i++) {
        matrix.push(new Array(colsCount));
    }

    let idx = 0;
    for (let c = 0; c < colsCount; c++) {
        if (c % 2 === 0) {
            for (let r = 0; r < rowsCount; r++) {
                matrix[r][c] = this[idx++];
            }
        } else {
            for (let r = rowsCount - 1; r >= 0; r--) {
                matrix[r][c] = this[idx++];
            }
        }
    }

    return matrix;
};