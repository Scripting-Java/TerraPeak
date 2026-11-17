import { variables } from "./values";
import type { game } from "./types";
import { mountains } from "./mountains";

export function getCivilianBonus(current:game): number{
    const totCiv = current.population.civilians.normal+current.population.civilians.shiny+current.population.civilians.lazy
    const lazyCiv = current.population.civilians.lazy
    const lazyBonus = variables.civBonuses.lazy
    const normalCiv = current.population.civilians.normal
    const normalBonus = variables.civBonuses.normal
    const shinyCiv = current.population.civilians.shiny
    const shinyBonus = variables.civBonuses.shiny
    if(totCiv===0)
        return 1
    else
        return (lazyCiv*lazyBonus+normalCiv*normalBonus+shinyCiv*shinyBonus)/totCiv
}


export function getWorkerProd(current:game){
    const bonus = getCivilianBonus(current)
    const mountain = mountains.find(m=>m.name===current.mountain)!
    const lumberUpgrade = variables.upgrades[current.upgrades.lumberjack]
    const researchUpgrade = variables.upgrades[current.upgrades.researcher]
    const farmerUpgrade = variables.upgrades[current.upgrades.farmer]
    return{
        wood:current.population.lumberWorkers*variables.prod.lumberjack*bonus * lumberUpgrade,
        gas:current.population.researchers*variables.prod.researcher*bonus*mountain.gasVents * researchUpgrade,
        peaches:current.population.farmers*variables.prod.farmer*bonus*mountain.peachFarms * farmerUpgrade
    }
}

export function getResConsumption(current:game){
    const totCiv = current.population.civilians.normal+current.population.civilians.shiny+current.population.civilians.lazy
    const totWork = current.population.lumberWorkers+current.population.farmers+current.population.researchers
    const totalPop = totCiv+totWork
    return{
        wood:totalPop*variables.consumption.wood,
        gas: totalPop*variables.consumption.gas,
        peaches:totalPop*variables.consumption.peaches
    }
}

