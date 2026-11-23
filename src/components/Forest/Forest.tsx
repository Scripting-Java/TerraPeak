import type { game } from "../../game/types";
import { mountains } from "../../game/mountains";
import "./Forest.css"
interface forest{
    current:game
}


export function Forest({current}: forest){
    const mountain = mountains.find(m=>m.name===current.mountain)!
    return(
        <div className="forest">
            <h2>Forest</h2>
            <p>Available Trees: {current.trees} / {mountain.trees}</p>
            <p>Trees Regrowing: {current.treeGrowth.length}</p>
        </div>
    )
}