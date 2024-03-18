import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/notas/';

const CompShowNotas = () => {
    
    const [notas, setNotas] = useState([]);
    const [mostrarImportantes, setMostrarImportantes] = useState(false); // Estado para controlar si se muestran solo las notas importantes

    useEffect(() => {
        getNotas();
    }, []);

    // Procedimiento para mostrar todas las notas
    const getNotas = async () => {
        try {
            const res = await axios.get(URI);
            setNotas(res.data);
        } catch (error) {
            console.error('Error al obtener las notas:', error);
        }
    }

    // Procedimiento para eliminar una nota
    const deleteNota = async (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta nota?");
        if (confirmacion) {
            try {
                await axios.delete(`${URI}${id}`);
                getNotas();
            } catch (error) {
                console.error('Error al eliminar la nota:', error);
            }
        }
    }

    // Procedimiento para archivar una nota
    const archiveNota = async (id) => {
        try {
            await axios.put(`${URI}${id}`, { archived: true });
            // Actualizar la lista de notas después de archivar
            getNotas();
        } catch (error) {
            console.error('Error al archivar la nota:', error);
        }
    }

    // Procedimiento para marcar una nota como importante o no importante
    const toggleImportante = async (id, importante) => {
        try {
            await axios.put(`${URI}${id}`, { importante: !importante }); // Invierte el estado de importancia
            // Actualizar la lista de notas después de cambiar el estado de importancia
            getNotas();
        } catch (error) {
            console.error('Error al cambiar el estado de importancia de la nota:', error);
        }
    }

    // Filtrar las notas activas (no archivadas)
    let notasFiltradas = notas.filter(nota => !nota.archived);

    // Si se debe mostrar solo las notas importantes, aplicar el filtro
    if (mostrarImportantes) {
        notasFiltradas = notasFiltradas.filter(nota => nota.importante);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <button onClick={() => setMostrarImportantes(!mostrarImportantes)} className='btn btn-info mt-2 mb-2'>{mostrarImportantes ? 'Mostrar Todas' : 'Mostrar Importantes'}</button>
                    <Link to="/archivadas" className='btn btn-info mt-2 mb-2'>Ver Archivadas</Link>
                    <table className='table'>
                        <thead className='tableTheadBg'>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Creation Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notasFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan="4">No hay notas</td>
                                </tr>
                            ) : (
                                notasFiltradas.map((nota, index) => (
                                    <tr key={index}>
                                        <td>{nota.title}</td>
                                        <td>{nota.content}</td>
                                        <td>{new Date(nota.createdAt).toLocaleString()}</td>
                                        
                                        <td>
                                            {nota.importante ? (
                                                <button onClick={() => toggleImportante(nota._id, nota.importante)} className='btn btn-warning'><i className="fas fa-star"></i> Quitar Importante</button>
                                            ) : (
                                                <button onClick={() => toggleImportante(nota._id, nota.importante)} className='btn btn-success'><i className="far fa-star"></i> Marcar Importante</button>
                                            )}
                                            <Link to={`/edit/${nota._id}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                            <button onClick={() => archiveNota(nota._id)} className='btn btn-warning'><i className="fas fa-archive"></i> Archivar</button>
                                            <button onClick={() => deleteNota(nota._id)} className='btn btn-danger'><i className="fas fa-trash-alt"></i> Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CompShowNotas;
