import { getLifeBarColor } from "../utils";


export const handleAttack = (key, fighter, opponent) => {
    if (key === fighter.controls.attack && fighter.isAlive() && opponent.isAlive()) {
        fighter.attack(opponent);
        opponent.flashDamageColor();
        updatePlayerLife(opponent);
    }
}

export const showPunch = (fighter1, fighter2, key) => {
    if (key === fighter1.controls.attack && fighter1.isAlive() && fighter2.isAlive()) {
        fighter1.showPunch(fighter2);
    } else if (key === fighter2.controls.attack && fighter2.isAlive() && fighter1.isAlive()) {
        fighter2.showPunch(fighter1);
    }
}

export const updatePlayerStats = (player) => {
    const playerStats = document.querySelector(`#${player.playerID}Stats`);
    playerStats.innerHTML = `<span>${player.name} - ${player.health}/${player.maxhealth}</span>
    <span>Daño: ${player.damage}</span>
    `;
};

export const updatePlayerLife = (player) => {
    updatePlayerStats(player);
    const lifeBarInner = document.querySelector(`#${player.playerID}Life .life__bar-inner`);
    const percent = (player.health / player.maxhealth) * 100;
    lifeBarInner.style.width = percent > 0 ? `${percent}%` : "0%";
    lifeBarInner.style.backgroundColor = getLifeBarColor(percent);
    //lifeBarInner.innerHTML = percent > 0 ? `${player.health}/${player.maxhealth}` : "";

    if (!player.isAlive()) {
        player.removeBox();
    }
};
