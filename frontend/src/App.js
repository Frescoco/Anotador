// Archivo: src/App.js

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompShowNotas from './notas/ShowNotas';
import CompCreateNota from './notas/CreateNota';
import CompEditNota from './notas/EditNota';
import ShowNotasArchivadas from '../src/notas/ShowNotasArchivas'; // Importa el nuevo componente
import Register from './notas/Register'; // Importa el componente de registro

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowNotas />} />
          <Route path="/create" element={<CompCreateNota />} />
          <Route path="/edit/:id" element={<CompEditNota />} />
          <Route path="/archivadas" element={<ShowNotasArchivadas />} /> {/* Nueva ruta para notas archivadas */}
          <Route path="/register" element={<Register />} /> {/* Nueva ruta para el registro */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
