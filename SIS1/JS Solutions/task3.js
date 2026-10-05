var filter = function(arr, fn) {   // фильтр для массива
    let res = []; // пустой массив создает res 
    for (let i = 0; i < arr.length; i++) {
        if (Boolean(fn(arr[i], i))) {
            res.push(arr[i]);
        }
    }
    return res;
};

// Функция прогоняет каждый элемент массива через «сито-проверку» (fn)
// и складывает в новый массив только те элементы, для которых проверка вернула true.