import "./App.css";
import Pokedex from "./pokedex";
import LoadBar from "./loadBar";
import {useState} from 'react'
import Modal from "./modal";

function App() {
    const [Loaded, setLoaded] = useState(0)
    const [ShowModal, setShowModal] = useState('')

    return (
    <div className="App">
      <Pokedex load={()=>setLoaded} setShowModal={setShowModal}/>
      <LoadBar load={Loaded}/>
        <Modal showModal={ShowModal} closeModal={setShowModal}/>
    </div>
  );
}

export default App;
