export const randomizeAttack = () => {
    const random = Math.random() * (10 - 5 + 1) + 5;
    return Math.round(random);
};

export const getLifeBarColor = (percent) => {
    if (percent > 50) {
        return "#00ff00";
    } else if (percent > 20) {
        return "#ffcc00";
    } else {
        return "#ff0000";
    }
};


export const playGameSoundtrack = () => {
    const audio = document.getElementById("gameAudio");
    audio.play();
};

export const stopGameSoundtrack = () => {
    const audio = document.getElementById("gameAudio");
    audio.pause();
    audio.currentTime = 0;
};

export const playGameOverSound = () => {
    const audio = document.getElementById("gameOverAudio");
    audio.play();
};

export const playSelectedPlayerSound = () => {
    const audio = document.getElementById("selectedPlayerAudio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
}

export const playUnselectedPlayerSound = () => {
    const audio = document.getElementById("unselectedPlayerAudio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
}

export const playStartGameSound = () => {
    const audio = document.getElementById("startGameAudio");
    audio.play();
}