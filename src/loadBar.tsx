import {useState} from "react";

function LoadBar(){
    const [ShowBar, setShowBar] = useState("none")
    const [Lenght, setLenght] = useState(5)

    function test() {
        {ShowBar == "none" ? setShowBar("block") : setShowBar("none")}
    }

    return(
        <div id="loadbar">
            <div style={{display: `${ShowBar}`}}  className="actualLoadBar">
                <div className="bar" style={{width: `${10 * Lenght}` + "%"}}></div>
            </div>
            <button onClick={test}>on/off</button>
        </div>
    )
}

export default LoadBar