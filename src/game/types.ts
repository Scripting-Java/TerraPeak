export type resourceType = "wood"|"gas"|"peaches"

export type workerType = "lumberjack"|"researcher"|"farmer"
export const workTypes = ["lumberjack", "researcher", "farmer"] as const

export interface resources {wood:number, gas:number, peaches:number}

export type upgrades = Record<workerType,number>

export type mountainTypes = "Washington"|"Alishan"|"Fuji"|"Rainier"|"Kilimanjaro"|"Everest"

export type civilian = "normal"|"shiny"|"lazy"
export const civTypes = ["normal", "shiny", "lazy"] as const
//normal adds 5% to worker perf
//shiny adds 15%
//lazy adds 2%
//Civilians refresh their status throughout different cycles
//e.g. lazy civilian <-> shiny civilian after one cycle  
export interface population{
    lumberjack:number,
    researcher:number,
    farmer:number,
    civilians:Record<civilian,number>,
}

export interface game{
    population:population,
    resources:resources,
    upgrades:upgrades,
    playerLevel:number,
    mountain:mountainTypes,
    lost:boolean,
    trees:number,
    treeGrowth:number
}

