class Transformer {
    constructor(name, health= 100) {
        this.name = name;
        this.health = health;
    }
    attack(){

    }
}

class Weapon{
    constructor(damage, speed) {
        this.damage = damage;
        this.speed = speed;
    }
    fight(){
        return  { damage: this.damage, speed: this.speed }
    }
}

class Autobot extends Transformer {
    constructor(name, Weapon) {
        super(name);
        this.weapon = Weapon;
    }
    attack() {
        return this.weapon.fight()
    }
}

class Deceptikon extends Transformer {
    constructor(name, health) {
        super(name, health);
    }
    attack() {
        return { damage: 5, speed: 1000 }
    }
}

const optimusPrime = new Autobot('OptimusPrime ', new Weapon(100, 1000));
const megatron = new Deceptikon('Megatron',10000);

console.log(optimusPrime);
console.log(optimusPrime.attack());
console.log(megatron);
console.log(megatron.attack());


// Функция симуляции боя
function simulateBattle(autobot, deceptikon) {
    let autobotAttack = autobot.attack();
    let rounds = 0;

    while (deceptikon.health > 0) {
        deceptikon.health -= autobotAttack.damage;
        rounds++;
    }

    let totalTime = rounds * autobotAttack.speed;
    return { rounds, totalTime };
}

// Расчёт необходимого количества автоботов
function autobotsNeededToDefeat(deceptikon, autobotWeapon) {
    let autobotAttack = autobotWeapon.fight();
    let deceptikonHealth = deceptikon.health;
    let singleAutobotDamagePerSecond = (1000 / autobotAttack.speed) * autobotAttack.damage;

    let autobotsNeeded = Math.ceil(deceptikonHealth / singleAutobotDamagePerSecond);
    return autobotsNeeded;
}

// Проверяем битву
const battleResult = simulateBattle(optimusPrime, megatron);
console.log(`OptimusPrime победил Megatron за ${battleResult.rounds} ударов и ${battleResult.totalTime / 1000} секунд.`);

// Проверяем количество автоботов
const autobotWeapon = new Weapon(100, 1000);
const autobotsCount = autobotsNeededToDefeat(megatron, autobotWeapon);
console.log(`Потребуется ${autobotsCount} автоботов, чтобы победить Megatron.`);

function updateHealthBar(elementId, health, maxHealth) {
    const healthElement = document.getElementById(elementId);
    healthElement.style.width = (health / maxHealth) * 100 + '%';
}

function simulateBattleWithVisualization(autobot, deceptikon) {
    let autobotAttack = autobot.attack();
    let deceptikonAttack = deceptikon.attack();

    const maxAutobotHealth = autobot.health;
    const maxDeceptikonHealth = deceptikon.health;

    const log = document.getElementById('battle-log');
    let round = 1;

    let interval = setInterval(() => {
        if (autobot.health > 0 && deceptikon.health > 0) {
            log.innerHTML += `<p>Раунд ${round}:</p>`;

            deceptikon.health -= autobotAttack.damage;
            log.innerHTML += `<p>${autobot.name} атакует! У ${deceptikon.name} осталось ${deceptikon.health} здоровья.</p>`;
            updateHealthBar('megatron-health', deceptikon.health, maxDeceptikonHealth);

            if (deceptikon.health <= 0) {
                log.innerHTML += `<p>${autobot.name} победил!</p>`;
                clearInterval(interval);
                return;
            }

            autobot.health -= deceptikonAttack.damage;
            log.innerHTML += `<p>${deceptikon.name} атакует! У ${autobot.name} осталось ${autobot.health} здоровья.</p>`;
            updateHealthBar('optimus-health', autobot.health, maxAutobotHealth);

            if (autobot.health <= 0) {
                log.innerHTML += `<p>${deceptikon.name} победил!</p>`;
                clearInterval(interval);
                return;
            }

            round++;
        }
    }, 1000);
}

simulateBattleWithVisualization(optimusPrime, megatron);
