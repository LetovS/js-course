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

class Person{
    constructor(name, gender, birthDay){
        this.name = name;
        this.gender = gender;
        this.birthDay = birthDay;
    }
}

class DetailPlanet extends CommonPlanet {
    constructor(name, diameter, population, gravity, terrain, climate, films, persons) {
        super(name, diameter, population, gravity, terrain, climate);
        this.films = films;
        this.persons = persons;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // получить данные по планетам

    const planets = await getPlanets()
    console.log(planets)
    renderPlanetCards(planets);

    addButtonEvents();

    const films = await getFilmsById(1);

    const persons = await getPersonsById(1);


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
                const personData = await fetch(residentUrl)
                    .then(residentUrl => residentUrl.json());
                return new Person(personData.name, personData.gender, personData.birth_year);
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
            .forEach(btn =>
                btn.addEventListener('click', async (event) => {
                    event.preventDefault()
                    const cardItem = btn.closest('.card-item');
                    const planetId = +btn.getAttribute('data-id');
                    //todo get data about parent card-item

                    const films = await getFilmsById(planetId);

                    const persons = await getPersonsById(planetId);

                    //todo create html total info about planet, films about this plane and persons

                    // Формируем HTML для фильмов
                    const filmsHtml = films.map(film => `
                    <li>
                        <strong>${film.title}</strong> 
                        (Эпизод: ${film.episodeId}, Дата выхода: ${film.releaseDate})
                    </li>
                    `).join('');
                    // Формируем HTML для персонажей
                    const personsHtml = persons.map(person => `
                    <li>
                        <strong>${person.name}</strong> 
                        (Пол: ${person.gender}, Дата рождения: ${person.birthDay})
                    </li>
                    
                `).join('');
                    // собрать форму
                    const htmlForm = `
<form action=""  method="post">
${cardItem.innerHTML.split('<a').slice(-2, -1)[0]}
<ul>
    <h3>Films</h3>
    ${filmsHtml}
</ul>
<ul>
        <h3>Персонажи</h3>
        ${personsHtml}
    </ul>
<div class="modal-form__item">
    <button type="submit" class="btn btn-primary modal-form__label">Сохранить</button>
    <button type="reset" class="btn btn-danger">Очистить</button>
</div>
</form>
                    `;
                    // добавить в
                    const modalBodyEl = document.querySelector('.modal-body');
                    modalBodyEl.innerHTML = htmlForm;
                })
            )
    }
})