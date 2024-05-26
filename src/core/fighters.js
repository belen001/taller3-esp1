import { Fighter } from "./models/Fighter";

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