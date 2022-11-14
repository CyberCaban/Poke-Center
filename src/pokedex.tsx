import { useEffect, useState } from "react";

const FIRST_POKEMONS = 10;

type IPokemon = {
  name: string;
  photo: string;
};

function Pokedex() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  let url = "https://pokeapi.co/api/v2/pokedex/27/";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let temp:IPokemon[] = [];
        for (let i = 0; i < FIRST_POKEMONS; i++) {
          getPokePhoto(data.pokemon_entries[i].pokemon_species.name).then(
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
        console.log(pokemons);
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

  const names = pokemons?.map((item, index) => {
    return `<li>${item.name}</li>`
  })

  return (
    <div>
      <ol className="pokemon">
        {names}
      </ol>
    </div>
  );
}

export default Pokedex;
