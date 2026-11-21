import { cutTrees, getResConsumption, getTotalPopulation, getWorkerProd } from "./helpers";
import type { game, civilian, workerType, resourceType, mountainTypes } from "./types";
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
    const prod = getWorkerProd(current)
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
    const game = { ...current, resources: resources, trees, treeGrowth }
    const lost = current.lost || resources.wood < 0 || resources.gas < 0 || resources.peaches < 0
    return { ...recycleCiv(game), lost: lost }
}

export function handlePop(current: game, type: civilian | workerType, amt: number) {
    //civilian handler
    if (type === "lazy" || type === "normal" || type === "shiny") {
        //new num of people
        const newAmt = current.population.civilians[type] + amt
        //if you're reading this, this prevents negative people
        if (newAmt < 0)
            return current
        return {
            ...current, population: {
                ...current.population,
                civilians: { ...current.population.civilians, [type]: newAmt }
            }
        }
    }
    //worker handler w/ same logic as above
    const newAmt = current.population[type] + amt
    if (newAmt < 0)
        return current
    return { ...current, population: { ...current.population, [type]: newAmt } }
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