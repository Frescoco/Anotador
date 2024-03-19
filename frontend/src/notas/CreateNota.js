import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/notas/';

const CompCreateNota = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [importante, setImportante] = useState(false);
    const [retrasada, setRetrasada] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const email = localStorage.getItem('loggedInEmail');
        if (email) {
            setIsLoggedIn(true);
        }
    }, []); 
    const store = async (e) => {
        e.preventDefault();
        const nuevaNota = {
            title: title,
            content: content,
            importante: importante,
            retrasada: retrasada, 
            createdAt: new Date().toISOString()
        };
        await axios.post(URI, nuevaNota);
        navigate('/');
    }

    return (
        <div>
            <h3>Crear Notas</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3 form-check'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        checked={importante}
                        onChange={(e) => setImportante(e.target.checked)}
                        id='importanteCheckbox'
                        disabled={!isLoggedIn} 
                    />
                    <label className='form-check-label' htmlFor='importanteCheckbox'>
                        Importante
                    </label>
                </div>
                <div className='mb-3 form-check'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        checked={retrasada}
                        onChange={(e) => setRetrasada(e.target.checked)}
                        id='retrasadaCheckbox'
                        disabled={!isLoggedIn} 
                    />
                    <label className='form-check-label' htmlFor='retrasadaCheckbox'>
                        Retrasada
                    </label>
                </div>
                <button type='submit' className='btn btn-primary'>Store</button>
            </form>
        </div>
    );
};



export default CompCreateNota;