import { cutTrees, getResConsumption, getTotalCivs, getTotalPopulation, getWorkerProd, helpHandleWeather } from "./helpers";
import { type game, type civilian, type workerType, type resourceType, type mountainTypes, civTypes } from "./types";
import { variables } from "./values";
import { mountains } from "./mountains";



export function recycleCiv(current: game): game {
    const totCiv = current.population.civilians.normal + current.population.civilians.shiny + current.population.civilians.lazy
    const civilians: Record<civilian, number> = { normal: 0, shiny: 0, lazy: 0 }
    for (let i = 0; i < totCiv; i++) {
        const random = Math.floor(Math.random() * 3)
        if (random === 0)
            civilians.normal++
        else if (random === 1)
            civilians.shiny++
        else
            civilians.lazy++
    }
    return {
        ...current, population: { ...current.population, civilians }
    }

}

export function runCycle(current: game): game {
    if (current.lost)
        return current
    const prod = getWorkerProd(current, current.weather)
    const consumption = getResConsumption(current)
    const cut = cutTrees(current)
    let trees = current.trees - cut
    let treeGrowth = current.treeGrowth + variables.cycleTime
    const mountain = mountains.find(m => m.name === current.mountain)!
    while (treeGrowth >= variables.treeTime && trees < mountain.trees) {
        if (trees < mountain.trees)
            trees++
        treeGrowth -= variables.treeTime
    }
    const resources = {
        wood: current.resources.wood + prod.wood - consumption.wood,
        gas: current.resources.gas + prod.gas - consumption.gas,
        peaches: current.resources.peaches + prod.peaches - consumption.peaches
    }
    const game = { ...current, resources: resources, trees, treeGrowth, weather: handleWeather() }
    const lost = current.lost || resources.wood < 0 || resources.gas < 0 || resources.peaches < 0
    return { ...recycleCiv(game), lost: lost }
}

export function handlePop(current: game, type: workerType, amt: number): game {
    //No change
    if (amt === 0)
        return current

    //Wow somebody gets a job!!!
    const newAmt = current.population[type] + amt
    if (newAmt < 0)
        return current

    //this makes a copy so you don't chain operations
    //as in you don't change the original civilian array
    //and make it recursively call this function
    const civs = { ...current.population.civilians }
    let totalCivs = getTotalCivs(current)

    //This checks if you have enough civilians to do jobs and then assigns
    if (amt > 0) {
        if (totalCivs < amt)
            return current

        //ok this part is honestly bad so here's the important stuff
        //Random civ = You find a random civilian
        for (let i = 0; i < amt; i++) {
            let randomCiv = Math.floor(totalCivs * Math.random())
            //this part removes a random civilian type
            //now the way this works is that if you have, lets say 15 civlians
            //and 8 are normal, 4 are shiny, and 3 are lazy,
            //then you go to the index of that civilian
            //lets say randomCiv gave me an index of 8
            //that decreases a civilian from my shiny civilian pool
            //Because normal people are from the 0-7 pool and 8 is bigger than that
            //so basically the count overflows into the shiny pool
            //and a shiny civilian gets taken
            //now this works out over time because after that shiny worker gets taken
            //you have 14 civilians, 8 of which are normal, 3 shiny, and 3 lazy
            //so now you have a 8/14 of a normal civilian getting converted int the worker
            //which is slightly better than your initial 8/15. 
            //basically its a dice flip. 
            //why did i do this?
            //well I was trying to take a weighted average
            //but then I would have to floor and do a lot of extra stuff
            //so this way i split them into groups and have the highest chance
            //of taking the civilian from the most populated group.

            for (const civ of civTypes) {
                if (randomCiv < civs[civ]) {
                    civs[civ]--
                    break
                }
                randomCiv -= civs[civ]
            }
            totalCivs--
        }
    }
    //so if they retire, they become normal civilians
    else {
        civs.normal += Math.abs(amt)
    }
    return { ...current, population: { ...current.population, [type]: newAmt, civilians: civs } }
}

export function handleUpgrades(current: game, type: workerType): game {
    const level = current.upgrades[type]
    let resourceType: resourceType = "wood"
    let costs: number[] = variables.lumberjackUpgradeCosts
    //is it a farmer???
    if (type === "farmer") {
        resourceType = "peaches"
        costs = variables.farmerUpgradeCosts
    }
    //what if it's a researcher!!!
    if (type === "researcher") {
        resourceType = "gas"
        costs = variables.researcherUpgradeCosts
    }
    //is it already max level?
    if (level >= costs.length)
        return current
    //return upgrade
    const cost = costs[level]
    if (current.resources[resourceType] >= costs[level])
        return { ...current, resources: { ...current.resources, [resourceType]: current.resources[resourceType] - cost }, upgrades: { ...current.upgrades, [type]: level + 1 } }
    return current
}

export function handleMountain(current: game, mount: mountainTypes) {
    const index = mountains.findIndex(m => m.name === mount)
    if (index === -1)
        return current

    const req = variables.mountainReqs[index]

    if (getTotalPopulation(current) < req)
        return current
    const newMount = mountains[index]
    return { ...current, mountain: newMount.name, trees: newMount.trees, treeGrowth: 0 }
}

export function handleWeather() {
    const climates = variables.weather
    const ind = Math.floor(Math.random() * climates.length)
    const weather = climates[ind]
    const buffs = helpHandleWeather(weather)
    return { weather, buffs }
}