import { getResConsumption, getWorkerProd } from "./helpers";
import type { game, civilian } from "./types";

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
    const prod = getWorkerProd(current)
    const consumption = getResConsumption(current)
    const resources = {
        wood: current.resources.wood+prod.wood-consumption.wood,
        gas:current.resources.gas+prod.gas-consumption.gas,
        peaches: current.resources.peaches+prod.peaches-consumption.peaches
    }
    const game = {...current,resources:resources}
    return recycleCiv(current)
}