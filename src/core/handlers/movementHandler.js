
export const updateFighterVelocity = ({ key, fighter }) => {
    if (key === fighter.controls.toUp) fighter.velocity.y = -1;
    else if (key === fighter.controls.toDown) fighter.velocity.y = 1;
    else if (key === fighter.controls.toLeft) fighter.velocity.x = -1;
    else if (key === fighter.controls.toRight) fighter.velocity.x = 1;
}


export const updateFighterPosition = ({ fighter, speed, fightArea }) => {
    const fightAreaWidth = fightArea.offsetWidth;
    const fightAreaHeight = fightArea.offsetHeight;
    const box = fighter.getHitbox();

    let newX = parseInt(box.style.left || 0) + fighter.velocity.x * speed;
    let newY = parseInt(box.style.top || 0) + fighter.velocity.y * speed;

    newX = Math.max(0, Math.min(fightAreaWidth - box.offsetWidth, newX));
    newY = Math.max(0, Math.min(fightAreaHeight - box.offsetHeight, newY));

    box.style.left = `${newX}px`;
    box.style.top = `${newY}px`;

    fighter.position.x = newX;
    fighter.position.y = newY;


    fighter.velocity.x = 0;
    fighter.velocity.y = 0;

}