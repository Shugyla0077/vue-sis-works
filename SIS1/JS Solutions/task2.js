function createCounter(n) {   //.запоминает стартовое число n в переменной current и возвращает внутреннюю функцию.
    let current = n;
    return function() {
        let res = current;
        current += 1;   // увеличивает current на 1;
        return res;    // возвращает старое значение
    };
}

// const counter = createCounter(5);
// counter(); // 5
// counter(); // 6
// counter(); // 7