export class Fighter {
    constructor({
        name,
        playerID,
        health,
        damage,
        color,
        image
    }) {
        this.name = name;
        this.playerID = playerID;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
        this.color = color;
        this.velocity = { x: 0, y: 0 };
        this.image = image;
        this.controls = null;
        this.position = { x: 0, y: 0 };
        this.associatedUser = null;
    }

    setControls(controls) {
        this.controls = controls;
    }

    setAssociatedUser(user) {
        this.associatedUser = user;
    }

    initialize({ fightArea, controls }) {
        this.setControls(controls);

        // hitbox
        const box = document.createElement("div");
        box.id = this.playerID;
        box.classList.add("fighter__container");
        box.style.position = "absolute";
        box.style.backgroundImage = `url(${this.image})`;
        box.style.backgroundSize = "cover";
        box.style.backgroundRepeat = "no-repeat";

        // damage overlay
        const damageOverlay = document.createElement("div");
        damageOverlay.classList.add("damage-overlay");
        box.appendChild(damageOverlay);


        // punch
        const punchOverlay = document.createElement("img");
        punchOverlay.id = `${this.playerID}GlobalPunch`;
        punchOverlay.classList.add("punch-overlay");
        punchOverlay.src = "src/assets/punch.png";
        box.appendChild(punchOverlay);


        fightArea.appendChild(box);
    }

    isAlive() {
        return this.health > 0;
    }

    getHitbox() {
        const box = document.getElementById(this.playerID);
        return box;
    }

    flashDamageColor() {
        const box = this.getHitbox();
        const damageOverlay = box.querySelector(".damage-overlay");

        damageOverlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)";

        setTimeout(() => {
            damageOverlay.style.backgroundColor = "transparent";
        }, 100);
    }

    showPunch(target) {
        const punchOverlay = document.getElementById(`${this.playerID}GlobalPunch`);

        if (punchOverlay) {
            punchOverlay.style.display = "block";

            const isTargetToLeft = target.position.x < this.position.x;
            const animationClass = isTargetToLeft ? 'animate-left' : 'animate-right';

            punchOverlay.offsetWidth;
            punchOverlay.classList.add(animationClass);

            setTimeout(() => {
                punchOverlay.classList.remove(animationClass);
                punchOverlay.style.display = "none";
            }, 300);
        }
    }

    removeBox() {
        const box = this.getHitbox();
        if (box) {
            box.remove();
        }
    }

    attack(target) {
        const hitAudio = document.getElementById(`${this.playerID}HitAudio`);

        if (!hitAudio.paused) {
            hitAudio.pause();
            hitAudio.currentTime = 0;
        }

        hitAudio.play();
        target.health -= this.damage;
        this.showPunch(target);
    }

    status() {
        return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }

    // reset the health of the fighter
    reset() {
        this.health = this.maxhealth;
    }
}