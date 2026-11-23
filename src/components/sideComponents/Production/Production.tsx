import type { game } from "../../../game/types";
import { getWorkerProd } from "../../../game/helpers";
import "./Production.css"

interface production{
    current:game
}

export function Production({current}: production){
    const production = getWorkerProd(current, current.weather)

    return(
        <div className="production">
            <h2>Resource Production</h2>
            <p>Wood: {production.wood.toFixed(2)} / Cycle</p>
            <p>Gas: {production.gas.toFixed(2)} / Cycle</p>
            <p>Peaches: {production.peaches.toFixed(2)} / Cycle</p>
        </div>
    )
}