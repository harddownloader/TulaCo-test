// Array<Array<Record<string, string>>>
function test(x, y, operation) {
    var myres = operation(x, y);
    return myres;
}
console.log(test(5, 10, function (x, y) { return x + y; }));
console.log(test(5, 10, function (x, y) { return x * y; }));
