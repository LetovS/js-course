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

const res2 = concat(arr2);
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

// Задание 6 (оно же 2)
const shop = [
    { price: 10, count: 2},
    { price: 100, count: 1},
    { price: 2, count: 5},
    { price: 15, count: 6},
]

const result = shop.reduce((result, item) => {
    return result + item.price * item.count;
}, 0)

console.log(result);

// Задание 7
const seq = [1, 2, 2, 4, 5, 5];

const unique = getUniqueValues(seq);

console.log(unique);

function getUniqueValues(seq) {
    return seq.reduce((unique, item) => {
        if (unique.indexOf(item) === -1) {
            unique.push(item);
        }
        return unique;
    }, []);
}

// Задание 8
const exceptionsCode = [
    500, 401, 402, 403, 404
]

exceptionsCode.forEach((item) => console.log(getErrorMessage(item)));

function getErrorMessage(exceptionCode){
    switch (exceptionCode) {
        case 404:
            return 'Не найдено';
        case 403:
            return 'Доступ запрещен';
        case 402:
            return 'Ошибка сервера';
        case 401:
            return 'Ошибка авторизации';
        case 500:
            return 'Ошибка сервера';
    }
}

// Задание 9
// Напишите функцию, которая возвращает 2 наименьших значение массива
const seqMin = [4,3,2,1];
const twoMin = getSeqMin(seqMin);
console.log(twoMin);
function getSeqMin(seq) {
    const sortedArr = seq.sort((a, b) => a - b);
    return sortedArr.slice(0, 2);
}


// Задание 10
const person = {
   firstName: 'Петр',
   secondName: 'Васильев',
   patronymic: 'Иванович'
}

const fullName = getFullName(person);
console.log(fullName);
function getFullName(person) {
    return `ФИО: ${person.firstName} ${person.patronymic} ${person.secondName}`;
}

// Задание 11
const multyArr = [1,2,3,4];
const value = 5;

const newArr = multyArrs(multyArr, value)
console.log(newArr);
function multyArrs(multyArr, value) {
    return multyArr.map((item) => {
        return item * value;
    })
}

// Задание 12
const heroes =  [
   {name: 'Batman', franchise: 'DC'},
   {name: 'Ironman', franchise: 'Marvel'},
   {name: 'Thor', franchise: 'Marvel'},
   {name: 'Superman', franchise: 'DC'}
]
const franchise = 'Marvel';
const franchiseHeroes = getFranchiseHeroes(heroes, franchise);
console.log(franchiseHeroes);

function getFranchiseHeroes(heroes, franchise) {
    return heroes
        .filter(x => x.franchise.includes(franchise))
        .map(hero => hero.name)
        .join(', ');
}