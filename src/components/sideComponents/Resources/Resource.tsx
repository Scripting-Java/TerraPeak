import type { game } from "../../../game/types";
import "./Resource.css"
interface resource{
    current:game
}
export function Resources({current}:resource){
    return(
        <div className="resources">
            <h2>Resources</h2>
            <p>Wood: {current.resources.wood}</p>
            <p>Gas: {current.resources.gas}</p>
            <p>Peaches: {current.resources.peaches}</p>
        </div>
    )
}