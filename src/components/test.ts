// Array<Array<Record<string, string>>>
function test(
  x: number,
  y: number,
  operation: (a: number, b: number) => number
): number {
  let myres = operation(x, y);
  return myres;
}

console.log(test(5, 10, (x, y) => x + y));
console.log(test(5, 10, (x, y) => x * y));

function a() {
  let ar = {
    1: 1,
  };
}

a.a = {
  1: 2,
};
