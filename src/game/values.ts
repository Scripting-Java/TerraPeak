import { mountains } from "./mountains";

export const variables = {
    cycleTime: 30000,
    //That's 30 seconds(so one cycle where people get hungry)
    treeTime: 60000,
    //60 seconds for trees to regrow
    startingPop: 10,
    //starting population
    minCivPercent:10,
    //minimum civillain percent
    consumption:{
        wood:0.75,
        gas:0.1,
        peaches:0.75
    },
    //controls how many resources on person uses during a cycle
    prod:{
        lumberjack:3,
        researcher:0.3,
        farmer:3
    },
    //controls resources produced per worker
    civBonuses:{
        normal:1.05,
        shiny:1.15,
        lazy:0.98,
    },
    //controls contributions of a civilian
    upgrades: [1,1.1,1.25,1.45],
    //controls each upgrade level later
    lumberjackUpgradeCosts: [20,40,80],
    farmerUpgradeCosts: [30,50,100],
    researcherUpgradeCosts:[15, 40, 75],
    //tentative upgrade costs
    mountainReqs: [0,15,30,50,75,100],
    //population reqs for new mountains
    mountainBuffs: [1,1.2,1.4,1.8,2.5,3.5],
    weather:["rainy","stormy","sunny","cloudy","subZero"],
    
}