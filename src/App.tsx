import "./App.css";
import Pokedex from "./pokedex";
import {useState} from 'react'
import Modal from "./modal";

function App() {
    const [pokemonName, setPokemonName] = useState('')

    return (
    <div className="App">
      <Pokedex setPokemonName={setPokemonName}/>
        <Modal pokemonName={pokemonName} closeModal={setPokemonName}/>
    </div>
  );
}

export default App;
