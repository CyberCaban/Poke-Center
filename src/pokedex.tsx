import { useEffect, useState } from "react";

const FIRST_POKEMONS = 10;
let count = 0 //Нужна чтобы отрисовывать следующих покемонов

type IPokemon = {
  name: string;
  photo: string;
};

function Pokedex() {
  const [pokemons, setPokemons] = useState<IPokemon[]>();
  const [PokemonsLoaded, setPokemonsLoaded] = useState(0)
  let url = "https://pokeapi.co/api/v2/pokedex/27/";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        let temp: IPokemon[] = [];
        for (let i = 0; i < FIRST_POKEMONS; i++) {
          await getPokePhoto(data.pokemon_entries[i].pokemon_species.name).then(
            (res) => {
              temp.push({
                name: `${data.pokemon_entries[i].pokemon_species.name}`,
                photo: `${res}`,
              });
              
            }
            );
          }
        console.log(temp);
        setPokemons(temp);
      });
  },[]);

  async function getPokePhoto(PokeName: string): Promise<string> {
    const tempURL = `https://pokeapi.co/api/v2/pokemon/${PokeName}`;
    let temp: string = "";
    await fetch(tempURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        temp = data.sprites.front_default;
        // console.log(data.sprites.front_default);
        // console.log(data);
      });
    return temp;
  }
  
  //UpperCaseFirstLetter
  function UCFL(str:any) { 
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }

  console.log("render");
  

  function loadMore() {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        let temp: IPokemon[] = [];
        for (let i = count * 10; i < FIRST_POKEMONS + count  * 10; i++) {
          setPokemonsLoaded(prev => prev + 1)
          
          await getPokePhoto(data.pokemon_entries[i].pokemon_species.name).then(
            (res) => {
              temp.push({
                name: data.pokemon_entries[i].pokemon_species.name,
                photo: res,
              });
            }
          );
        }
        setPokemons(prev=>prev?.concat(temp));
        setPokemonsLoaded(0)
      });
      count += 1
  }

  const names = pokemons?.map((item, index) => {
    let poke_name = UCFL(item.name)
    return (
      <div key={index} className="pokemon_card">
        <img src={item.photo} alt="" />
        <p>{poke_name}</p>
      </div>
    );
  });

  return (
    <div id="Pokedex">
      <h1>Pokedex 7th Gen</h1>
      <div className="pokemon_list">{names}</div>
      <div id="loadMore" onClick={loadMore}>
        <span>Load more Pokémon</span>
      </div>
    </div>
  );
}

export default Pokedex;
