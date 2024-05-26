import {
    getLifeBarColor,
    stopGameSoundtrack,
    playGameSoundtrack,
    playGameOverSound,
} from "./utils.js";

import { handleAttack } from "./handlers/attackHandler.js";
import { checkCollision, handleCollision } from "./handlers/collisionHandler.js";

let gameOver = false;
let gameInterval;
let gamePaused = false;

export const handleStartButton = (speed, player1, player2, restartCallback) => {
    // const overlay = document.getElementById("overlay");
    if (gameOver) {
        window.location.reload();
    } else {
        if (!gamePaused) {
            startGameLoop(speed, player1, player2);
            // overlay.style.display = "none";
        } else {
            pauseGameLoop();
            // overlay.style.display = "block";
        }
        gamePaused = !gamePaused;
    }

};

export const startGameLoop = (speed, player1, player2) => {
    playGameSoundtrack();
    gameInterval = setInterval(() => {
        controlPlayers(player1, player2);
        if (checkGameOver(player1, player2)) {
            clearInterval(gameInterval);
        }
    }, 1000 / 60);
};

export const pauseGameLoop = () => {
    clearInterval(gameInterval);
    stopGameSoundtrack();
};

export const controlPlayers = (player1, player2) => {
    updatePlayerLife(player1);
    updatePlayerLife(player2);

    document.addEventListener("keydown", (event) => {
        handleMoveFighter(event.key, player1, player1.speed);
        handleMoveFighter(event.key, player2, player2.speed);

        if (checkCollision(player1.getHitbox(), player2.getHitbox())) {
            handleCollision(player1, player2);
            handleAttack(event.key, player1, player2);
            handleAttack(event.key, player2, player1);
        }
    });
};

export const placePlayers = (player1, player2) => {
    const fightArea = document.getElementById("fightArea");
    const fightAreaWidth = fightArea.offsetWidth;
    const fightAreaHeight = fightArea.offsetHeight;
    const player1Box = player1.getHitbox();
    const player2Box = player2.getHitbox();

    player1Box.style.top = `${fightAreaHeight / 2}px`;
    player1Box.style.left = `${fightAreaWidth / 6}px`;

    player2Box.style.top = `${fightAreaHeight / 2}px`;
    player2Box.style.left = `${(fightAreaWidth / 4) * 3}px`;
};

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

const updateStartButtonText = (text) => {
    document.getElementById("startButton").textContent = text;
};

const checkGameOver = (player1, player2, onGameFinish) => {
    if (!player1.isAlive()) {
        handleGameWinner(player2);
        return true;
    } else if (!player2.isAlive()) {
        handleGameWinner(player1);
        return true;
    }
    return false;
};

const handleGameWinner = (player) => {
    stopGameSoundtrack();
    playGameOverSound();
    alert(`${player.name} ha ganado!`);
    updateStartButtonText("Restart Game");
    gameOver = true;
};