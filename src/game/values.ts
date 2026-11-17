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
        wood:1,
        gas:0.1,
        peaches:1
    },
    //controls how many resources on person uses during a cycle
    prod:{
        lumberjack:1,
        researcher:0.5,
        farmer:2
    },
    //controls resources produced per worker
    civBonuses:{
        normal:1.05,
        shiny:1.15,
        lazy:0.98,
    },
    //controls contributions of a civilian
    upgrades: [1.1,1.25,1.45]
    //controls each upgrade level later
}