import "./App.css";
import Pokedex from "./pokedex";
import LoadBar from "./loadBar";
import {useState} from 'react'

function App() {
  const [Loaded, setLoaded] = useState(0)
  return (
    <div className="App">
      <Pokedex load={()=>setLoaded} />
      <LoadBar load={Loaded}/>
    </div>
  );
}

export default App;
