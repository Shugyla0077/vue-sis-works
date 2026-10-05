var expect = function(val) {
    return {
        toBe: (otherVal) => {   //Ожидает, что значения одинаковые. Если нет — бросает ошибку "Not Equal"
            if (val === otherVal) return true;
            throw new Error("Not Equal");
        },
        notToBe: (otherVal) => {  //Ожидает, что значения разные. Если они совпали — бросает ошибку "Equal"
            if (val !== otherVal) return true;
            throw new Error("Equal");
        }
    };
};
// создать мини-библиотеку для тестировани
// Функция проверяет, совпадает ли полученное значение с ожидаемым