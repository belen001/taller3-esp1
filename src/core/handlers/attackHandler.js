
export const handleAttack = (key, fighter, opponent) => {
    if (key === fighter.controls.attack && fighter.isAlive() && opponent.isAlive()) {
        fighter.attack(opponent);
        opponent.flashDamageColor();
        updatePlayerLife(opponent);
    }
}
