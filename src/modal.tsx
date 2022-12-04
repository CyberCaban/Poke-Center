import {useEffect, useState} from "react";
import {UCFL} from "./pokedex";
import React from 'react';

type Props = {
    showModal: string;
    closeModal: (string:string)=>void
}

type PokeInfo = {
    stat:{
            name:string,
            number:number
    }[],
    image:string
}

function Modal({showModal, closeModal}:Props) {

    const [PokeInfo, setPokeInfo] = useState<PokeInfo>()

    useEffect(()=>{
        const url = 'https://pokeapi.co/api/v2/pokemon/' + `${showModal.toLowerCase()}`
        const temp:PokeInfo= {
            stat: [],
            image: ''
        }
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                try{
                    for (let i = 0; i < data.stats.length; i++) {
                        temp.stat.push({name:`${data.stats[i].stat.name}`,number:data.stats[i].base_stat})
                    }
                    temp.image = data.sprites.front_default
                    setPokeInfo(temp)
                }catch (e){

                }
            });
    },[showModal])

    const PokeStats = PokeInfo?.stat.map((item,index)=>{
        const name = UCFL(item.name)
        return <div className={'stat ' + `${item.name}`} key={index}>
                <p>{name}</p>
                <p>{item.number}</p>
            </div>
    })

    if (showModal!==''){
        return <div className="modal" >
            <div className="modal_title">
                <h1 className="modal_name">{showModal}</h1>
                <span><img src={PokeInfo?.image} alt="" /></span>
            </div>
            <div className="modal_description">
                Description
            </div>
            <p>Stats</p>
            <div className="stat_list">
                {PokeStats}
            </div>
            <button onClick={()=>closeModal('')}>Close</button>
        </div>
    }else {
        return null
    }
}

export default Modal