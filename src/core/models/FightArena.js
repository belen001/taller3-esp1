class FightArena {
    constructor(speed, canvas, imagePath) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.speed = speed;
        this.image = new Image();
        this.image.src = imagePath;
    }

    draw() {
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }

    changeArena(imagePath) {
        this.image.src = imagePath;
    }
}