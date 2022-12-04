import {useEffect, useState} from "react";
import {UCFL} from "./pokedex";
import React from 'react';

type Props = {
    pokemonName: string;
    closeModal: (string:string)=>void
}

type PokeInfo = {
    stat:{
            name:string,
            number:number
    }[],
    image:string,
    description:string
}

function Modal({pokemonName, closeModal}:Props) {

    const [PokeInfo, setPokeInfo] = useState<PokeInfo>()

    useEffect(()=>{
        const url = 'https://pokeapi.co/api/v2/pokemon/' + `${pokemonName.toLowerCase()}`
        const temp:PokeInfo= {
            stat: [],
            image: '',
            description:''
        }
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then( async (data) => {
                try{
                    for (let i = 0; i < data.stats.length; i++) {
                        temp.stat.push({name:`${data.stats[i].stat.name}`,number:data.stats[i].base_stat})
                    }
                    temp.image = data.sprites.front_default
                    temp.description = await descriptionFinder(data.species.url)
                    setPokeInfo(temp)
                }catch (e){

                }
            });
    },[pokemonName])

    async function descriptionFinder(speciesURL:string) {   //поиск описания по api
        let temp:string = ''
        await fetch(speciesURL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (let i = data.flavor_text_entries.length; i > 0; i--) {    //находим последнее описание на английском языке
                    if(data.flavor_text_entries[i-1].language.name === 'en'){
                        temp = data.flavor_text_entries[i-1].flavor_text       //наше описание
                        break
                    }
                }
            })
        return temp;
    }

    const PokeStats = PokeInfo?.stat.map((item,index)=>{
        const name = UCFL(item.name)
        return <div className={'stat ' + `${item.name}`} key={index}>
                <p>{name}</p>
                <p>{item.number}</p>
            </div>
    })

    if (pokemonName!==''){
        return <div className="modal" >
            <div className="modal_title">
                <h1 className="modal_name">{pokemonName}</h1>
                <span><img src={PokeInfo?.image} alt="" /></span>
            </div>
            <div className="modal_description">
               <h3>Description</h3>
                <p>{PokeInfo?.description}</p>
            </div><br></br>
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

export default Modal;