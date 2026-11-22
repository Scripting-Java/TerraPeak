import type { game } from "./types";
import { mountains } from "./mountains";
import { handleWeather } from "./logic";
import { variables } from "./values";

export function create(): game{
    return {
        population: {
            lumberjack: 0, researcher: 0, farmer: 0,
            civilians: { normal: variables.startingPop, shiny: 0, lazy: 0 }
        },
        resources: { wood: 0, gas: 0, peaches: 0 },
        upgrades: { lumberjack: 0, researcher: 0, farmer: 0 },
        playerLevel: 1,
        mountain: "Washington",
        trees: mountains[0].trees,
        treeGrowth: [],
        lost: false,
        weather:handleWeather()
    }
}