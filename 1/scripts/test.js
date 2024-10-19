let myarray = [5, 6, 7];
let myarray2 = [];

// for (let i = 0; i < myarray.length; i++) {
//   myarray2.push(myarray[i] * 2);
// }
// console.log(myarray2);
// function doublearray(array) {
//   const numsDouble = [];
//   for (let i = 0; i < array.length; i++) {
//     numsDouble.push(array[i] * 2);
//   }
//   console.log(numsDouble);
// }
// doublearray([1, 2, 3, 4]);
// doublearray([4, 5, 6, 7]);
myarray.forEach((value, index) => {
  console.log(`value ${value}`);
  console.log(`index ${index}`);
});
