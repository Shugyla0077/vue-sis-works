var join = function(arr1, arr2) {
    let obj = {};

    for (let item of arr1) {
        obj[item.id] = Object.assign({}, item);
    }

    for (let item of arr2) {
        if (obj[item.id]) {
            obj[item.id] = Object.assign(obj[item.id], item);
        } else {
            obj[item.id] = Object.assign({}, item);
        }
    }

    let values = Object.values(obj);
    values.sort((a, b) => a.id - b.id);
    return values;
};