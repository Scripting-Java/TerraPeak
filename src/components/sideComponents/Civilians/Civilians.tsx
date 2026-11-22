import { getTotalCivs } from "../../../game/helpers";
import type { game} from "../../../game/types";
import { civTypes } from "../../../game/types";
import "./Civilians.css"

interface Civs{
    current:game,
}

export function Civilians({current}:Civs){
    const total = getTotalCivs(current)
    return(
        <div className="civPanel">
            <h2>Civilians</h2>
            <p className="civTotal">Total Civilian Population: {total}</p>
            
            {civTypes.map(type=>(
                <div className="civCard" key={type}>
                    <h3>{type.charAt(0).toUpperCase()+type.substring(1,type.length)} Civilians: </h3>
                    <p>{current.population.civilians[type]}</p>
                </div>
            ))}
        </div>
    )
}