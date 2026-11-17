import { cutTrees, getResConsumption, getWorkerProd } from "./helpers";
import type { game, civilian } from "./types";
import { variables } from "./values";
import { mountains } from "./mountains";

export function recycleCiv(current:game): game{
    const totCiv = current.population.civilians.normal+current.population.civilians.shiny+current.population.civilians.lazy
    const civilians: Record<civilian,number> = {normal:0,shiny:0,lazy:0}
    for(let i =0;i<totCiv;i++){
        const random = Math.floor(Math.random()*3)
        if(random===0)
            civilians.normal++
        else if (random===1)
            civilians.shiny++
        else
            civilians.lazy++
    }
    return{
        ...current, population:{...current.population,civilians}
    }
    
}


export function runCycle(current:game):game{
    if(current.lost)
        return current
    const prod = getWorkerProd(current)
    const consumption = getResConsumption(current)
    const cut = cutTrees(current)
    let trees = current.trees-cut
    let treeGrowth = current.treeGrowth+variables.cycleTime
    const mountain = mountains.find(m=>m.name===current.mountain)!
    while(treeGrowth>=variables.treeTime){
        if(trees<mountain.trees)
            trees++
        treeGrowth-=variables.treeTime
    }
    const resources = {
        wood: current.resources.wood+prod.wood-consumption.wood,
        gas:current.resources.gas+prod.gas-consumption.gas,
        peaches: current.resources.peaches+prod.peaches-consumption.peaches
    }
    const game = {...current,resources:resources,trees,treeGrowth}
    const lost = current.lost||resources.wood<0||resources.gas<0||resources.peaches<0
    return {...recycleCiv(game), lost:lost}
}




