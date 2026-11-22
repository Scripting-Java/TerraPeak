import { useState } from "react";
import type { civilian, game, mountainTypes, resources, workerType } from "../game/types";
import {Users, Package, ChartNoAxesCombined, ArrowUpCircle, Mountain, Pickaxe, Trees} from "lucide-react"
import "./Sidebar.css"
interface Sidebar{
    current:game,
    production: resources,
    onPopChange:(type:workerType|civilian, amt:number)=>void,
    onUpgrade:(type:workerType)=>void,
    onMountain:(mountain:mountainTypes)=>void
}

export function Sidebar({current,production,onPopChange,onUpgrade,onMountain}:Sidebar){
    const[active, setActive] = useState<string|null>(null)
    const toggle = (panel:string)=>{setActive(prev=>prev===panel?null:panel)}

    return(
        <div className="sidebar">
            <div className="sidebarButton">
                <button onClick={()=>toggle("civilians")} className={active==="civilians"?"active":""}><Users></Users>Civilians</button>
                <button onClick={()=>toggle("workers")} className={active==="workers"?"active":""}><Pickaxe></Pickaxe>Workers</button>
                <button onClick={()=>toggle("forests")} className={active==="forests"?"active":""}><Trees></Trees>Forest</button>
                <button onClick={()=>toggle("resources")} className={active==="resources"?"active":""}><Package></Package>Resources</button>
                <button onClick={()=>toggle("production")} className={active==="production"?"active":""}><ChartNoAxesCombined></ChartNoAxesCombined>Production</button>
                <button onClick={()=>toggle("upgrades")} className={active==="upgrades"?"active":""}><ArrowUpCircle></ArrowUpCircle>Upgrades</button>
                <button onClick={()=>toggle("mountains")} className={active==="mountains"?"active":""}><Mountain></Mountain>Mountains</button>
            </div>
        </div>
    )
}