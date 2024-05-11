
export const handleCollision = (fighter1, fighter2) => {
    const box1 = fighter1.getHitbox();
    const box2 = fighter2.getHitbox();

    const rect1 = box1.getBoundingClientRect();
    const rect2 = box2.getBoundingClientRect();

    const dx = (rect1.right + rect1.left) / 2 - (rect2.right + rect2.left) / 2;
    const dy = (rect1.bottom + rect1.top) / 2 - (rect2.bottom + rect2.top) / 2;

    if (Math.abs(dx) > Math.abs(dy)) {
        fighter1.velocity.x *= -2;
        fighter2.velocity.x *= -2;

        if (dx > 0) {
            box1.style.left = `${parseInt(box1.style.left) + 4}px`;
            box2.style.left = `${parseInt(box2.style.left) - 4}px`;
        } else {
            box1.style.left = `${parseInt(box1.style.left) - 4}px`;
            box2.style.left = `${parseInt(box2.style.left) + 4}px`;
        }
    } else {
        fighter1.velocity.y *= -2;
        fighter2.velocity.y *= -2;

        if (dy > 0) {
            box1.style.top = `${parseInt(box1.style.top) + 4}px`;
            box2.style.top = `${parseInt(box2.style.top) - 4}px`;
        } else {
            box1.style.top = `${parseInt(box1.style.top) - 4}px`;
            box2.style.top = `${parseInt(box2.style.top) + 4}px`;
        }
    }
};

export const checkCollision = (box1, box2) => {
    if (!box1 || !box2) return false;
    const rect1 = box1.getBoundingClientRect();
    const rect2 = box2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
};