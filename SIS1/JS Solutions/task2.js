function createCounter(n) {
    let current = n;
    return function() {
        let res = current;
        current += 1;
        return res;
    };
}