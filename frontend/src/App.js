// Archivo: src/App.js

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompShowNotas from './notas/ShowNotas';
import CompCreateNota from './notas/CreateNota';
import CompEditNota from './notas/EditNota';
import ShowNotasArchivadas from '../src/notas/ShowNotasArchivas'; 
import Register from './notas/Register'; 
import Login from './notas/Login'; 
import User from './notas/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowNotas />} />
          <Route path="/create" element={<CompCreateNota />} />
          <Route path="/edit/:id" element={<CompEditNota />} />
          <Route path="/archivadas" element={<ShowNotasArchivadas />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/user" element={<User />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
