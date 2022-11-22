import {useEffect, useState} from "react";

type Props = {
    load: number
}

function LoadBar({load}:Props){
    const [ShowBar, setShowBar] = useState("none")
    const [Length, setLength] = useState(5)

    useEffect(()=>{
        setLength(load)
    },[load])

    function test() {
        {ShowBar == "none" ? setShowBar("block") : setShowBar("none")}
    }

    return(
        <div id="loadbar">
            <div style={{display: `${ShowBar}`}}  className="actualLoadBar">
                <div className="bar" style={{width: `${10 * Length}` + "%"}}></div>
            </div>
            <button onClick={test}>on/off</button>
        </div>
    )
}

export default LoadBar