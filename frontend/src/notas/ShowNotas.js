import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/notas/';

const CompShowNotas = () => {
    const [notas, setNotas] = useState([]);
    const [mostrarImportantes, setMostrarImportantes] = useState(false);
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [retrasadaFilter, setRetrasadaFilter] = useState(false);

    useEffect(() => {
        getNotas();
        const email = localStorage.getItem('loggedInEmail');
        if (email) {
            setLoggedInEmail(email);
            setIsLoggedIn(true);
        }
    }, []);

    const getNotas = async () => {
        try {
            const res = await axios.get(URI);
            setNotas(res.data);
        } catch (error) {
            console.error('Error al obtener las notas:', error);
        }
    }

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

    const archiveNota = async (id) => {
        try {
            await axios.put(`${URI}${id}`, { archived: true });
            getNotas();
        } catch (error) {
            console.error('Error al archivar la nota:', error);
        }
    }

    const toggleImportante = async (id, importante) => {
        try {
            await axios.put(`${URI}${id}`, { importante: !importante });
            getNotas();
        } catch (error) {
            console.error('Error al cambiar el estado de importancia de la nota:', error);
        }
    }

    const toggleRetrasada = async (id, retrasada) => {
        try {
            await axios.put(`${URI}${id}`, { retrasada: !retrasada });
            getNotas();
        } catch (error) {
            console.error('Error al cambiar el estado de retraso de la nota:', error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedInEmail');
        setLoggedInEmail('');
        setIsLoggedIn(false);
    }

    const filterRetrasadas = (notas) => {
        return notas.filter(nota => nota.retrasada);
    }

    let notasFiltradas = notas.filter(nota => !nota.archived);

    if (mostrarImportantes) {
        notasFiltradas = notasFiltradas.filter(nota => nota.importante);
    }

    if (retrasadaFilter) {
        notasFiltradas = filterRetrasadas(notasFiltradas);
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h2>Bienvenido {loggedInEmail}</h2>
                    {!loggedInEmail && (
                        <>
                            <Link to="/register" className='btn btn-primary mt-2 mb-2 mr-2' style={{ margin: '3px' }}>Registrarse</Link>
                            <Link to="/login" className='btn btn-primary mt-2 mb-2 mr-2' style={{ margin: '3px' }}>Iniciar Sesión</Link>
                        </>
                    )}
                    {loggedInEmail && (
                        <button onClick={handleLogout} className='btn btn-danger mt-2 mb-2 mr-2' style={{ margin: '3px' }}>Cerrar Sesión</button>
                    )}
                    {!isLoggedIn && (
                        <div className="alert alert-warning mt-2" role="alert">
                            Debes iniciar sesión para usar todas las funciones.
                        </div>
                    )}
                    <button onClick={() => setMostrarImportantes(!mostrarImportantes)} className='btn btn-info mt-2 mb-2 mr-2' style={{ margin: '3px' }}disabled={!isLoggedIn}>{mostrarImportantes ? 'Mostrar Todas' : 'Mostrar Importantes'}</button>
                    <button onClick={() => setRetrasadaFilter(!retrasadaFilter)} className='btn btn-warning mt-2 mb-2 mr-2' style={{ margin: '3px' }}disabled={!isLoggedIn}>{retrasadaFilter ? 'Mostrar Todas' : 'Mostrar Retrasadas'}</button>
                    <Link to="/archivadas" className='btn btn-info mt-2 mb-2 mr-2' style={{ margin: '3px' }} disabled={!isLoggedIn}>Ver Archivadas</Link>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2' style={{ margin: '3px' }} disabled={!isLoggedIn}><i className="fas fa-plus"></i></Link>
                    <table className='table'>
                        <thead className='tableTheadBg'>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { notasFiltradas.length === 0 && mostrarImportantes && (
                                <tr>
                                    <td colSpan="3">No hay notas importantes</td>
                                </tr>
                            )}
                            { notasFiltradas.length === 0 && !mostrarImportantes && (
                                <tr>
                                    <td colSpan="3">No hay notas retrasadas</td>
                                </tr>
                            )}
                            { notasFiltradas.map((nota, index) => (
                                <tr key={index}>
                                    <td>{nota.title}</td>
                                    <td>{nota.content}</td>
                                    <td>{new Date(nota.createdAt).toLocaleString()}</td>
                                    
                                    <td>
                                        {nota.importante ? (
                                            <button onClick={() => toggleImportante(nota._id, nota.importante)} className='btn btn-warning mr-2' style={{ margin: '3px' }}disabled={!isLoggedIn}><i className="fas fa-star"></i> Quitar Importante</button>
                                        ) : (
                                            <button onClick={() => toggleImportante(nota._id, nota.importante)} className='btn btn-success mr-2' style={{ margin: '3px' }}disabled={!isLoggedIn}><i className="far fa-star mr-1"></i> Marcar Importante</button>
                                        )}
                                        <button onClick={() => toggleRetrasada(nota._id, nota.retrasada)} className='btn btn-info mr-2' style={{ margin: '3px' }}disabled={!isLoggedIn}>{nota.retrasada ? 'Desmarcar Retrasada' : 'Marcar Retrasada'}</button>
                                        <Link to={`/edit/${nota._id}`} className='btn btn-info mr-2' style={{ margin: '3px' }}><i className="fas fa-edit"></i></Link>
                                        <button onClick={() => archiveNota(nota._id)} className='btn btn-warning mr-2' style={{ margin: '3px' }}><i className="fas fa-archive"></i> Archivar</button>
                                        <button onClick={() => deleteNota(nota._id)} className='btn btn-danger' style={{ margin: '3px' }}><i className="fas fa-trash-alt"></i> Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );  
     
}

export default CompShowNotas;
