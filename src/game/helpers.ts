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
        wood:cutTrees(current)*variables.prod.lumberjack*bonus*lumberUpgrade,
        gas:current.population.researcher*variables.prod.researcher*bonus*mountain.gasVents * researchUpgrade,
        peaches:current.population.farmer*variables.prod.farmer*bonus*mountain.peachFarms * farmerUpgrade
    }
}

export function getResConsumption(current:game){
    const totalPop = getTotalPopulation(current)
    return{
        wood:totalPop*variables.consumption.wood,
        gas: totalPop*variables.consumption.gas,
        peaches:totalPop*variables.consumption.peaches
    }
}

export function getTotalWorkers(current:game):number{
    return current.population.lumberjack+current.population.researcher+current.population.farmer
}

export function getTotalCivs(current:game):number{
    return current.population.civilians.lazy+current.population.civilians.shiny+current.population.civilians.normal
}

export function getTotalPopulation(current:game):number{
    const workers = getTotalWorkers(current)
    const civs = getTotalCivs(current)
    return workers+civs
}

export function getCivPercent(current:game){
    const totalPop= getTotalPopulation(current)
    if(totalPop===0)
        return 0
    const totCiv = current.population.civilians.normal+current.population.civilians.shiny+current.population.civilians.lazy
    return totCiv/totalPop *100   
}

export function checkCivReq(current:game):boolean{
    return getCivPercent(current)>=variables.minCivPercent
}

export function cutTrees(current:game):number{
    return Math.min(current.trees,current.population.lumberjack)
}

export function handleWeather(){
    const climates = variables.weather
    const ind = Math.random()*climates.length
    const weather = climates[ind]
    if(weather==="rainy")
      return {farmers:1.1, lumberjacks:1.1,researcher:0.9}  
    if(weather==="stormy")
        return {farmers:0.9,lumberjacks:0.9,researcher:0.9}
    if(weather==="cloudy")
        return {farmers:0.9,lumberjacks:1.05,researcher:1.1}
    if(weather==="sunny")
        return  {farmers:0.9,lumberjacks:0.9,researcher:0.9}
    if(weather==="subZero")
        return  {farmers:0.6,lumberjacks:0.8,researcher:1.5}
}
