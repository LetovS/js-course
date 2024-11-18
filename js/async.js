// 1. Функция getList
function getList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Task 1', isDone: false },
                { id: 2, title: 'Task 2', isDone: true },
            ]);
            //reject('Errors')
        }, 2000);
    });
}

// 2. Скрипт, получающий данные
// getList()
//     .then(tasks => {
//         tasks.forEach(task => {
//             console.log(`${task.title} - ${task.isDone ? "Выполнено" : "Не выполнено"}`);
//         });
//     })
//     .catch(error => {
//         console.error(`Произошла ошибка: ${error}`);
//     });

// 2. chain call
function chainCalls(){
    let msg = '';
    return Promise.resolve()
        .then(() => new Promise(resolve => setTimeout(() => resolve('Я'), 1000)))
        .then(word => {
            msg += word + ' ';
            return new Promise(resolve => setTimeout(() => resolve('использую'), 1000));
        })
        .then(word => {
            msg += word + ' ';
            return new Promise(resolve => setTimeout(() => resolve('цепочки'), 1000));
        })
        .then(word => {
            msg += word + ' ';
            return new Promise(resolve => setTimeout(() => resolve('обещаний'), 1000));
        })
        .then(word => {
            msg += word + ' ';
            console.log(msg);
        })
}

//chainCalls();

// 3 parallel promis

function parallelPromises(){
    const tasks = {
        "Я": 1000,
        "использую": 800,
        "вызов": 1200,
        "обещаний": 700,
        "параллельно": 500,
    };

    const promises = Object.entries(tasks).map(([word, delay]) => {
        return new Promise(resolve => setTimeout(() => resolve(word), delay));
    });

    Promise.all(promises)
        .then(resolve => console.log(resolve.join(" ")));
}

//parallelPromises();


// 4 delay pending -> redolve after 

function delay (delay){
    return new Promise(resolve => setTimeout(resolve, delay));
}

//delay(2000).then(resolve => console.log('Это сообщение вывелось через 2 секунды'))

// 5 parallel promis with delay

function parallelPromisesWithDelay(){
    const tasks = {
        "Я": 1000,
        "использую": 800,
        "вызов": 1200,
        "обещаний": 700,
        "параллельно": 500,
    };

    const promises = Object.entries(tasks).map(([word, delayValue]) => 
        delay(delayValue).then(() => word));

    Promise.all(promises)
        .then(resolve => console.log(resolve.join(" ")));
}


//parallelPromisesWithDelay();

// 6 api find planet

async function findByPlanetName(){
    const response = await fetch('https://swapi.dev/api/planets')
        .then(response => response.json())
        .then(data => data.results.find(item => item.name === 'Tatooine'));
    console.log(response);
}

//findByPlanetName();

// 7 first transport anakin
async function fetchAnakinTransport() {
    const response = await fetch('https://swapi.dev/api/people/?search=Anakin');
    const data = await response.json();
    const anakin = data.results[0];

    if (anakin) {
        const transport = await fetch(anakin.vehicles[0]).then(res => res.json());
        console.log("Первый транспорт Анакина:", transport.name);
    } else {
        console.log("Анакин не найден");
    }
}

//fetchAnakinTransport();

// 8

async function echoServer() {
    const response = await fetch('http://localhost:3009/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "Привет сервис, я жду от тебя ответа" }),
    });

    const data = await response.json();
    console.log("Ответ от сервера:", data);
}

echoServer();
