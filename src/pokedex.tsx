import { useEffect, useState } from "react";

const FIRST_POKEMONS = 10;
let count = 0 //Нужна чтобы отрисовывать следующих покемонов
let currentRegion = "National"

type IPokemon = {
  name: string;
  photo: string;
};

type Props = {
  load: (number:number)=>void
  setShowModal: (string:string)=>void
}

//UpperCaseFirstLetter
export function UCFL(str:any) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

function Pokedex({load,setShowModal}:Props) {
  const [pokemons, setPokemons] = useState<IPokemon[]>();
  const [PokemonsLoaded, setPokemonsLoaded] = useState(0)
  const [url, seturl] = useState("https://pokeapi.co/api/v2/pokedex/1/");
  const Pokedexes = [
    {
      name: "National",
      id:1
    },
    {
      name: "Kanto",
      id:2
    },
    {
      name: "Original Johto",
      id:3
    },
    {
      name: "Hoenn",
      id:4
    },
    {
      name: "Original Sinnoh",
      id:5
    },
    {
      name: "Extended Sinnoh",
      id:6
    },
    {
      name: "Updated Johto",
      id:7
    },
    {
      name: "Original Unova",
      id:8
    },
    {
      name: "Updated Unova",
      id:9
    },
    {
      name: "Conquest Gallery",
      id:11
    },
    {
      name: "Kalos Central",
      id:12
    },
    {
      name: "Kalos Coastal",
      id:13
    },
    {
      name: "Kalos Montain",
      id:14
    },
    {
      name: "Updated Hoenn",
      id:15
    },
    {
      name: "Original Alola",
      id:16
    },
    {
      name: "Original Melemele",
      id:17
    },
    {
      name: "Original Akala",
      id:18
    },
    {
      name: "Original Ulaula",
      id:19
    },
    {
      name: "Original Poni",
      id:20
    },
    {
      name: "Updated Alola",
      id:21
    },
    {
      name: "Updated Melemele",
      id:22
    },
    {
      name: "Updated Akala",
      id:23
    },
    {
      name: "Updated Ulaula",
      id:24
    },
    {
      name: "Updated Poni",
      id:25
    },
    {
      name: "Updated Kanto",
      id:26
    },
    {
      name: "Galar",
      id:27
    },
    {
      name: "Isle Of Armor",
      id:28
    },
    {
      name: "Crown Tundra",
      id:29
    },
  ]

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
        setPokemons(temp);
      });
  },[url]);

  async function getPokePhoto(PokeName: string): Promise<string> {
    const tempURL = `https://pokeapi.co/api/v2/pokemon/${PokeName}`;
    let temp: string = "";
    await fetch(tempURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        temp = data.sprites.front_default;
      });
    return temp;
  }
  
  function loadMore() {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        let temp: IPokemon[] = [];
        for (let i = count * 10; i < FIRST_POKEMONS + count * 10; i++) {
          setPokemonsLoaded(prev => prev + 1)
          try {
            await getPokePhoto(data.pokemon_entries[i].pokemon_species.name).then(
              (res) => {
                load(i)
                temp.push({
                  name: data.pokemon_entries[i].pokemon_species.name,
                  photo: res,
                });
              }
            );
          }catch (e){
            // console.log(e)
          }
        }
        setPokemons(prev=>prev?.concat(temp));
        setPokemonsLoaded(0)
      });
      count += 1
  }

  function changeRegion(e:any) {
    seturl("https://pokeapi.co/api/v2/pokedex/" + `${e.target.value}` + "/")

    for (let i = 0; i < Pokedexes.length; i++) {
      if (Pokedexes[i].id == e.target.value) {
        currentRegion = Pokedexes[i].name
      }
    }
    count = 0
  }

  function getPokeInfo(e:any){
    if (e.target.localName === "img"){
      setShowModal(e.target.parentElement.innerText)
    }else{
      setShowModal(e.target.innerText)
    }
  }

  const names = pokemons?.map((item, index) => {
    const poke_name = UCFL(item.name);
    return (
      <div onClick={(e)=>getPokeInfo(e)} key={index} className="pokemon_card">
        <img src={item.photo} alt="" />
        <p>{poke_name}</p>
      </div>
    );
  });

  const pokedexOptions = Pokedexes.map((item) => {
    return <option value={item.id}>{item.name}</option>
  })

  return (
    <div id="Pokedex">
      <div className="header _choosebox">
        <h1>Pokedex {currentRegion} Region</h1>
        <div>
          <select onClick={(e)=>changeRegion(e)} name="Pokedexes" id="">
            {pokedexOptions}
          </select>
        </div>
      </div>
      <div className="pokemon_list">{names}</div>
      <div id="loadMore" onClick={loadMore}>
        <span>Load more Pokémon</span>
      </div>
    </div>
  );
}

export default Pokedex;
