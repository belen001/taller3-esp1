export class PlayerControls {
    constructor({ toUp, toDown, toLeft, toRight, attack }) {
        this.toUp = toUp;
        this.toDown = toDown;
        this.toLeft = toLeft;
        this.toRight = toRight;
        this.attack = attack;
    }
}