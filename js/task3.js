    class Transformer {
        constructor(name, health= 100) {
            this.name = name;
            this.health = health;
        }
        attack(){

        }
        hit(fight){
            this.health -= fight.damage;
        }
    }

    class Weapon{
        constructor(damage, speed) {
            this.damage = damage;
            this.speed = speed;
        }
        fight(){
            return  {
                damage: this.damage,
                speed: this.speed
            }
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

    // fight
    megatron.hit(optimusPrime.attack());
    console.log(megatron);

    minBotsNeedToKillMegatron();
    function minBotsNeedToKillMegatron() {
        // Создаем Мегатрона с определённым количеством здоровья.
        const megatron = new Deceptikon('Megatron', 10000);
        let minNumber = 0;

        // Пока здоровье Мегатрона больше 0, создаем новых автоботов.
        while (megatron.health > 0) {
            minNumber++; // Увеличиваем счётчик автоботов.
            let optimusPrime = new Autobot('OptimusPrime', new Weapon(100, 1000));

            console.log(`Автобот №${minNumber} выходит на бой!`);

            // Бой между текущим автоботом и Мегатроном.
            while (optimusPrime.health > 0 && megatron.health > 0) {
                console.log('Автобот бьёт Мегатрона');
                megatron.hit(optimusPrime.attack());
                console.log(`У Мегатрона осталось ${Math.max(megatron.health, 0)} hp`);

                // Если Мегатрон побежден, заканчиваем цикл.
                if (megatron.health <= 0) {
                    console.log(`Автоботы победили. Для победы нужно ${minNumber} автоботов.`);
                    return minNumber;
                }

                console.log('Мегатрон бьёт Автобота');
                optimusPrime.hit(megatron.attack());
                console.log(`У Автобота осталось ${Math.max(optimusPrime.health, 0)} hp`);
            }

            console.log(`Автобот №${minNumber} погиб.`);
        }
    }
