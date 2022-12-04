import "./App.css";
import Pokedex from "./pokedex";
import {useState} from 'react'
import Modal from "./modal";

function App() {
    const [Loaded, setLoaded] = useState(0)
    const [ShowModal, setShowModal] = useState('')

    return (
    <div className="App">
      <Pokedex load={()=>setLoaded} setShowModal={setShowModal}/>
        <Modal showModal={ShowModal} closeModal={setShowModal}/>
    </div>
  );
}

export default App;
