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
    new Fighter({
        name: "Scorpion",
        playerID: "player4",
        health: 100,
        damage: 12,
        color: "yellow",
        image: "src/assets/gifs/scorpion.gif"
    }),
    // new Fighter({
    //     name: "Sub-Zero",
    //     playerID: "player5",
    //     health: 100,
    //     damage: 11,
    //     color: "lightblue",
    //     image: "src/assets/gifs/subzero.gif"
    // }),
    // new Fighter({
    //     name: "Terry Bogard",
    //     playerID: "player6",
    //     health: 110, 
    //     damage: 10,
    //     color: "white",
    //     image: "src/assets/gifs/terry.gif"
    // }),
    // new Fighter({
    //     name: "Mai Shiranui",
    //     playerID: "player7",
    //     health: 95, 
    //     damage: 11,
    //     color: "orange",
    //     image: "src/assets/gifs/mai.gif"
    // }),
    new Fighter({
        name: "Kazuya",
        playerID: "player8",
        health: 105,
        damage: 12,
        color: "purple",
        image: "src/assets/gifs/kazuya-mishima.gif"
    })
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
