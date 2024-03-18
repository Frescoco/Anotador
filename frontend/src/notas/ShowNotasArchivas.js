import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link

const URI = 'http://localhost:8000/notas/';

const ShowNotasArchivadas = () => {
  const [notasArchivadas, setNotasArchivadas] = useState([]);

  useEffect(() => {
    getNotasArchivadas();
  }, []);

  const getNotasArchivadas = async () => {
    try {
      const res = await axios.get(URI);
      const notasArchivadas = res.data.filter(nota => nota.archived);
      setNotasArchivadas(notasArchivadas);
    } catch (error) {
      console.error('Error al obtener las notas archivadas:', error);
    }
  };

  const recuperarNota = async (id) => {
    try {
      await axios.put(`${URI}unarchive/${id}`); // Cambiar el estado de archivado a false
      getNotasArchivadas(); // Actualizar la lista de notas archivadas después de recuperar la nota
    } catch (error) {
      console.error('Error al recuperar la nota:', error);
    }
  };
  
  return (
    <div className="container">
      <h1>Notas Archivadas</h1>
      <Link to="/" className='btn btn-primary mt-2 mb-2'>Volver a Notas</Link> {/* Botón para volver a ShowNotas */}
      <ul>
        {notasArchivadas.length > 0 ? (
          notasArchivadas.map(nota => (
            <li key={nota._id}>
              <h2>{nota.title}</h2>
              <p>{nota.content}</p>
              <button onClick={() => recuperarNota(nota._id)}>Recuperar</button> {/* Botón para recuperar la nota */}
            </li>
          ))
        ) : (
          <li>No hay notas archivadas</li>
        )}
      </ul>
    </div>
  );
};

export default ShowNotasArchivadas;
