import express from 'express';
import { getAllNotas, getNota, createNota, updateNota, deleteNota, archiveNota, unarchiveNota, getNotasArchivadas } from '../controllers/NotaController.js';

const router = express.Router();

router.get('/', getAllNotas);
router.get('/:id', getNota);
router.post('/', createNota);
router.put('/:id', updateNota);
router.delete('/:id', deleteNota);
router.put('/archive/:id', archiveNota);
router.put('/unarchive/:id', unarchiveNota);
router.get('/archivadas', getNotasArchivadas);

export default router; // Asegúrate de exportar el enrutador como valor predeterminado
