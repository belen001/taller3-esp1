import {
    stopGameSoundtrack,
    playGameOverSound,
    playGameSoundtrack
} from "./utils.js";
import { updateFighterVelocity, updateFighterPosition } from "./handlers/movementHandler.js";
import { handleAttack, showPunch, updatePlayerLife, updatePlayerStats } from "./handlers/attackHandler.js";
import { checkCollision, handleCollision } from "./handlers/collisionHandler.js";

let gameOver = false;
let gameInterval;

export const play = ({ speed, player1, player2, onGameFinish }) => {
    gameOver = false;
    const fightArea = document.getElementById("fightArea");

    placePlayers(player1, player2);
    controlPlayers({ player1, player2 });
    startGameLoop({ speed, player1, player2, fightArea, onGameFinish });


};

export const startGameLoop = ({ speed, player1, player2, fightArea, onGameFinish }) => {
    playGameSoundtrack();
    gameInterval = setInterval(() => {
        movePlayers({ player1, player2, speed, fightArea });
        if (checkGameOver({
            player1: player1,
            player2: player2,
            onGameFinish: onGameFinish
        })) {
            clearInterval(gameInterval);
        }
    }, 1000 / 60);
};

export const pauseGameLoop = () => {
    clearInterval(gameInterval);
    stopGameSoundtrack();
};

export const controlPlayers = ({ player1, player2 }) => {
    updatePlayerLife(player1);
    updatePlayerLife(player2);

    document.addEventListener("keydown", (event) => {
        updateFighterVelocity({
            key: event.key,
            fighter: player1
        });
        updateFighterVelocity({
            key: event.key,
            fighter: player2,
        });

        // showing punch animation
        showPunch(player1, player2, event.key);

        if (checkCollision(player1.getHitbox(), player2.getHitbox())) {
            handleCollision(player1, player2);
            handleAttack(event.key, player1, player2);
            handleAttack(event.key, player2, player1);
        }
    });
};

const movePlayers = ({ player1, player2, speed, fightArea }) => {
    if (player1.isAlive()) {
        updateFighterPosition({ fighter: player1, speed: speed, fightArea: fightArea });
    }
    if (player2.isAlive()) {
        updateFighterPosition({ fighter: player2, speed: speed, fightArea: fightArea });
    }
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

const checkGameOver = ({ player1, player2, onGameFinish }) => {
    if (!player1.isAlive()) {
        handleGameWinner({ player: player2, onGameFinish: onGameFinish });
        return true;
    } else if (!player2.isAlive()) {
        handleGameWinner({ player: player1, onGameFinish: onGameFinish });
        return true;
    }
    return false;
};

const handleGameWinner = ({ player, onGameFinish }) => {
    stopGameSoundtrack();
    playGameOverSound();
    onGameFinish(player);
    gameOver = true;
};