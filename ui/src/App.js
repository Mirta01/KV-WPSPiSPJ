import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VoziloTablica from './component/VoziloTablica';
import SalonTablica from './component/SalonTablica'
import Alter from './component/Alter';
import Create from './component/Create';
import CreateSalon from './component/CreateSalon';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoziloTablica/>}/>
        <Route path="/salon" element={<SalonTablica/>}/>
        <Route path="/alter/:sifra" element={<Alter/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/createSalon" element={<CreateSalon/>}/>
      </Routes>
    </Router>
  );
}

export default App;
