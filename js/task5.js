class CommonPlanet{
    constructor(name, diameter, population, gravity, terrain, climate) {
        this.diameter = diameter;
        this.population = population;
        this.gravity = gravity;
        this.terrain = terrain;
        this.climate = climate;
        this.name = name;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // получить данные по планетам

    const planets = await getPlanets()
    console.log(planets);

    async function getPlanets(){
        return fetch("https://swapi.dev/api/planets")
            .then(res => res.json())
            .then(data => {
                return data.results.map(item => new CommonPlanet(item.name,
                    item.diameter,
                    item.population,
                    item.gravity,
                    item.terrain,
                    item.climate))
            })
            .then(error => console.log(error));
    }

    async  function getDetailById(planetId){

    }

})