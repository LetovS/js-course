class CommonPlanet{
    constructor(id, name, diameter, population, gravity, terrain, climate) {
        this.id = id;
        this.name = name;
        this.diameter = diameter;
        this.population = population;
        this.gravity = gravity;
        this.terrain = terrain;
        this.climate = climate;
    }
}

class FilmAboutPlanet{
    constructor(episodeId, title, releaseDate) {
        this.episodeId = episodeId;
        this.title = title;
        this.releaseDate = releaseDate;
    }
}

class Person {
    constructor(name, gender, birthDay, homeworldName) {
        this.name = name;
        this.gender = gender;
        this.birthDay = birthDay;
        this.homeworldName = homeworldName;
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    // получить данные по планетам
    const planets = await getPlanets()

    renderPlanetCards(planets);

    addButtonEvents();

    setPagination(1, 25, 30);

    function renderPlanetCards(planetsList){
        const planetsAsString = planetsList.map(planet =>
`<div class="card-item" id="">
        <h5><strong>Планета:</strong> ${planet.name}</h5>
        <p class="card-item__diameter"><strong>Diameter:</strong> ${planet.diameter}</p>
        <p class="card-item__population"><strong>Population:</strong> ${planet.population}</p>
        <p class="card-item__gravity"><strong>Gravity:</strong> ${planet.gravity}</p>
        <p class="card-item__terrain"><strong>Terrain:</strong> ${planet.terrain}</p>
        <p class="card-item__climaten"><strong>Climate:</strong> ${planet.climate}</p>
        <a href="#" class="btn btn-primary" data-id="${planet.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Подробнее</a>
</div>`).join(' ');

        const planetCardsEl = document.querySelector('.cards');

        planetCardsEl.innerHTML = planetsAsString;
    }

    async function getPlanets(){
        return fetch("https://swapi.dev/api/planets")
            .then(res => res.json())
            .then(data => {
                return data.results.map(item => new CommonPlanet(
                    item.url.split('/').slice(-2, -1)[0],
                    item.name,
                    item.diameter,
                    item.population,
                    item.gravity,
                    item.terrain,
                    item.climate))
            })
            .catch(error => console.log(error));
    }

    async function getFilmsById(planetId) {
        try {
            // Получаем данные планеты по ID
            const planetResponse = await fetch(`https://swapi.dev/api/planets/${planetId}`);
            const planetData = await planetResponse.json();

            // Для каждого URL фильма делаем запрос
            const filmPromises = planetData.films.map(async (filmUrl) => {
                const filmData = await fetch(filmUrl).then(filmUrl => filmUrl.json());

                return new FilmAboutPlanet(filmData.episode_id, filmData.title, filmData.release_date);
            });

            // Ожидаем выполнения всех запросов и возвращаем массив фильмов
            return await Promise.all(filmPromises);
        } catch (error) {
            console.error("Error fetching films for planet:", error);
            return [];
        }
    }

    async function getPersonsById(planetId) {
        try {
            // Получаем данные планеты по ID
            const planetResponse = await fetch(`https://swapi.dev/api/planets/${planetId}`);
            const planetData = await planetResponse.json();

            // Для каждого URL персонажа делаем запрос
            const personPromises = planetData.residents.map(async (residentUrl) => {
                const personResponse = await fetch(residentUrl);
                const personData = await personResponse.json();

                // Получаем имя планеты из URL homeworld
                const homeworldResponse = await fetch(personData.homeworld);
                const homeworldData = await homeworldResponse.json();
                const homeworldName = homeworldData.name;

                // Создаем объект Person
                return new Person(
                    personData.name,
                    personData.gender,
                    personData.birth_year,
                    homeworldName
                );
            });

            // Ожидаем выполнения всех запросов и возвращаем массив персонажей
            return await Promise.all(personPromises);
        } catch (error) {
            console.error("Error fetching persons for planet:", error);
            return [];
        }
    }

    function addButtonEvents(){
        document
            .querySelectorAll('.cards .btn')
            .forEach(btn => {
                    btn.addEventListener('click', async (event) => {
                        event.preventDefault()
                        const cardItem = btn.closest('.card-item');
                        const planetId = +btn.getAttribute('data-id');
                        //todo get data about parent card-item

                        const films = await getFilmsById(planetId);

                        const persons = await getPersonsById(planetId);

                        //todo create html total info about planet, films about this plane and persons

                        let filmsTotal = ``;
                        if (films.length > 0) {
                            // Формируем HTML для фильмов
                            const filmsHtml = films.map(film => `
                            <li>
                            <strong>${film.title}</strong> 
                            (Эпизод: ${film.episodeId}, Дата выхода: ${film.releaseDate})
                            </li>
                            `).join('');
                            filmsTotal = `
                            <ul>
                                <h3>Films</h3>
                                ${filmsHtml}
                            </ul>`;
                        }

                        let personsTotal = ``;
                        if (persons.length > 0) {// Формируем HTML для персонажей
                            const personsHtml = persons.map(person => `
                                <li>
                                    <strong>${person.name}</strong> 
                                    (Пол: ${person.gender}, Дата рождения: ${person.birthDay}, Родная планета: ${person.homeworldName})
                                </li>`).join('');
                            personsTotal = `
                            <ul>
                                <h3>Персонажи</h3>
                                ${personsHtml}
                            </ul>`
                        }
                        // собрать форму
                        const htmlForm = `
    <form action=""  method="post">
    ${cardItem.innerHTML.split('<a').slice(-2, -1)[0]}
    ${filmsTotal}
    ${personsTotal}
    <div class="modal-form__item">
        <button type="submit" class="btn btn-primary modal-form__label">Сохранить</button>
        <button type="reset" class="btn btn-danger">Очистить</button>
    </div>
    </form>
                        `;
                        // добавить в
                        const modalBodyEl = document.querySelector('.modal-body');
                        modalBodyEl.innerHTML = htmlForm;
                    });
                }
            )
    }

    function setPagination(currentPage, pageSize, total) {
        const paginationEl = document.querySelector('.pagination');

        let middle = ``

        for (let i = 1; i <= Math.round(total/pageSize); i++) {  // округляем до большего числа
            if (i === currentPage)
                middle += `<li class="page-item user-page-item"><a href="#" data-page="${i}" class="page-link current-page-active">${i}</a></li>` + ' ';
            else{
                middle += `<li class="page-item user-page-item"><a href="#" data-page="${i}" class="page-link">${i}</a></li>` + ' ';
            }
        }

        paginationEl.innerHTML = `
            <li class="page-item user-page-item"><a href="#" class="page-link">Назад</a></li>
            ${middle}
            <li class="page-item user-page-item"><a href="#" class="page-link">Вперед</a></li>
        `;
        //setEventsPagination(pageSize, paginationEl);
    }

    function  setEventsPagination(pageSizeOld, pagination){

        pagination.querySelectorAll('a').forEach((item) => {
            item.addEventListener('click', async (e) => {
                e.preventDefault();
                if (e.target.classList.contains('current-page-active')){
                    return;
                }

                pagination.querySelectorAll('.page-link').forEach((items) => {
                    items.classList.remove('current-page-active');
                })

                item.classList.add('current-page-active');

                const currentPage = +item.getAttribute('data-page');
                const {pageSize, total, entities: posts} = await getPosts(currentPage, pageSizeOld);

                renderPosts(posts);

                addButtonEvents();

                setPagination(currentPage, pageSize, total);
            })
        })
    }

    function handlePageSize(){
        const selectEl = document.querySelector('.pagination-page-size select');
        selectEl.addEventListener('change', async (event) => {

            const currentPage = +document.querySelector('.current-page-active').innerText;
            let pageSizeOld = 0;
            document.querySelectorAll('.form-select option').forEach(item => {
                if (item.selected) {
                    pageSizeOld = item.value
                }
            });
            const {pageSize, total, entities: posts} = await getPosts(currentPage, pageSizeOld);

            renderPosts(posts);

            addButtonEvents();

            setPagination(currentPage, pageSize, total);
        })
    }
})