// Задание 1
const arr =  [
   'Я короткая строка',
   'Я вроде бы тоже короткая',
   'А я длинная строка'
 ]
const res = isLessThanTwenty(arr);
console.log(res);
function isLessThanTwenty(arr, ) {
    return arr.filter(str => str.length < 20);
}

// Задание 2

const arr2 =  [
  { name: 'shark', likes: 'ocean' },
  { name: 'turtle', likes: 'pond' },
  { name: 'otter', likes: 'fish biscuits' }
];

var res2 = concat(arr2);
console.log(res2);
function concat(arr2){
    return arr2.map(item => item.name + ' likes ' + item.likes);
}

// Задание 3

const obj1 = { name: 'Алиса' };
const obj2 = { age: 11 };

const sumObj = joinObjInfo(obj1, obj2);
console.log(sumObj);
function joinObjInfo(obj1, obj2) {
    return {name: obj1.name, age: obj2.age};
}

// Задание 4
const arr4 = [1,2,3,4];

const min = getMin(arr4);
console.log(min);
function getMin(arr) {
    return Math.min(...arr);
}

// Задание 5
const odd = getOdd(arr4);
console.log(odd);
function getOdd(arr) {
    return arr.reduce((result, num) => {
        if (num % 2 !== 0) {
            result.push(num);
        }
        return result;
    }, []);
}