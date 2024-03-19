import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShowNotasArchivadas.css';

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
      await axios.put(`${URI}unarchive/${id}`);
      getNotasArchivadas(); 
    } catch (error) {
      console.error('Error al recuperar la nota:', error);
    }
  };
  
  return (
    <div className="container">
      <h1>Notas Archivadas</h1>
      <Link to="/" className='btn btn-primary mt-2 mb-2'>Volver a Notas</Link>
      <ul>
        {notasArchivadas.length > 0 ? (
          notasArchivadas.map(nota => (
            <li key={nota._id}>
              <h2>{nota.title}</h2>
              <p>{nota.content}</p>
              <p>Fecha de creación: {new Date(nota.createdAt).toLocaleString()}</p> 
              <button onClick={() => recuperarNota(nota._id)}>Recuperar</button>
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
