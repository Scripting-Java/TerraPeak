import { type mountainTypes } from "./types";

export interface mountainInfo{
    name:mountainTypes,
    trees:number,
    gasVents:number,
    peachFarms:number
}

export const mountains: mountainInfo[] = [
    {
        name: "Washington",
        trees: 50,
        gasVents: 1,
        peachFarms: 1
    },
    {
        name: "Alishan",
        trees: 60,
        gasVents: 2,
        peachFarms: 2
    },
    {
        name: "Fuji",
        trees: 75,
        gasVents: 3,
        peachFarms: 3
    },
    {
        name: "Rainier",
        trees: 90,
        gasVents: 4,
        peachFarms: 4
    },
    {
        name: "Kilimanjaro",
        trees: 100,
        gasVents: 5,
        peachFarms: 5
    },
    {
        name: "Everest",
        trees: 150,
        gasVents: 6,
        peachFarms: 6
    },
]
//Num of gasVents/Peachfarms = 2(or whatever 1 farmer produces)
//* peachfarms. 