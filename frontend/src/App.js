// Archivo: src/App.js

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompShowNotas from './notas/ShowNotas';
import CompCreateNota from './notas/CreateNota';
import CompEditNota from './notas/EditNota';
import ShowNotasArchivadas from '../src/notas/ShowNotasArchivas'; // Importa el nuevo componente

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowNotas />} />
          <Route path="/create" element={<CompCreateNota />} />
          <Route path="/edit/:id" element={<CompEditNota />} />
          <Route path="/archivadas" element={<ShowNotasArchivadas />} /> {/* Nueva ruta para notas archivadas */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
