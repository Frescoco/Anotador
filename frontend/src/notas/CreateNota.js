import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URI = 'http://localhost:8000/notas/'

const CompCreateNota = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [importante, setImportante] = useState(false) // Nuevo estado para la casilla de verificación
    const navigate = useNavigate()    
    
    // Procedimiento para guardar la nota
    const store = async (e) => {
        e.preventDefault()
        const nuevaNota = {
            title: title,
            content: content,
            importante: importante,
            createdAt: new Date().toISOString() // Obtener la fecha y hora actual en formato ISO
        };
        await axios.post(URI, nuevaNota); // Envía la nota con la fecha de creación al backend
        navigate('/')
    }   

    return (
        <div>
           <h3>Create POST</h3>
           <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        value={title}
                        onChange={ (e)=> setTitle(e.target.value)} 
                        type="text"
                        className='form-control'
                    />
                 </div>   
                 <div className='mb-3'>
                     <label className='form-label'>Content</label>
                    <textarea
                        value={content}
                        onChange={ (e)=> setContent(e.target.value)} 
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
                    />
                    <label className='form-check-label' htmlFor='importanteCheckbox'>
                        Importante
                    </label>
                 </div>
                 <button type='submit' className='btn btn-primary'>Store</button>                  
           </form>
        </div>
    )
}

export default CompCreateNota
