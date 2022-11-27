import {useEffect, useState} from "react";

type Props = {
    showModal: string;
    closeModal: (string:string)=>void
}

type PokeInfo = {
    stat:{
            name:string,
            number:number
    }[]
}

function Modal({showModal, closeModal}:Props) {

    const [PokeInfo, setPokeInfo] = useState({})

    useEffect(()=>{
        const url = 'https://pokeapi.co/api/v2/pokemon/' + `${showModal.toLowerCase()}`
        const temp:PokeInfo= {
            stat: []
        }
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.stats)
                for (let i = 0; i < data.stats.length; i++) {
                    temp.stat.push({name:`${data.stats[i].stat.name}`,number:data.stats[i].base_stat})
                }
                console.log(temp)
                setPokeInfo(temp)
            });
    },[showModal])

    if (showModal!==''){
        return <div className="modal">
            <span></span>
            <p className="name">{showModal}</p>
            <p>Stats</p>
            <div>
                <p>Stat</p>
            </div>
            <button onClick={()=>closeModal('')}>Close</button>
        </div>
    }else {
        return null
    }
}

export default Modal