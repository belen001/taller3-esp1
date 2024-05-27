import { Fighter } from "./models/Fighter";
import { FighterControls } from "./models/FighterControls";

export const fighters = [
    new Fighter({
        name: "Ryu",
        playerID: "player1",
        health: 100,
        damage: 10,
        color: "red",
        image: "src/assets/gifs/ryu.gif"
    }),
    new Fighter({
        name: "Ken",
        playerID: "player2",
        health: 100,
        damage: 10,
        color: "blue",
        image: "src/assets/gifs/ken.gif"
    }),
    new Fighter({
        name: "Chun Li",
        playerID: "player3",
        health: 100,
        damage: 10,
        color: "green",
        image: "src/assets/gifs/chunli.gif"
    }),
]

export const restartFighters = () => {
    fighters.forEach(fighter => {
        fighter.reset();
    });
}

export const defaultPlayer1Controls = new FighterControls({
    toUp: "w",
    toDown: "s",
    toLeft: "a",
    toRight: "d",
    attack: "q",
});

export const defaultPlayer2Controls = new FighterControls({
    toUp: "i",
    toDown: "k",
    toLeft: "j",
    toRight: "l",
    attack: "o",
})
