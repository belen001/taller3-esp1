
export const handleMoveFighter = (key, fighter, speed) => {
    if (fighter.isAlive()) {
        handleMovement(key, fighter);
        updateFighterPosition(fighter, speed);
    }
};

const handleMovement = (key, fighter) => {
    if (key === fighter.controls.toUp) fighter.velocity.y = -1;
    else if (key === fighter.controls.toDown) fighter.velocity.y = 1;
    else if (key === fighter.controls.toLeft) fighter.velocity.x = -1;
    else if (key === fighter.controls.toRight) fighter.velocity.x = 1;
}


const updateFighterPosition = (fighter, speed) => {
    fighter.position.x += fighter.velocity.x * speed;
    fighter.position.y += fighter.velocity.y * speed;

}