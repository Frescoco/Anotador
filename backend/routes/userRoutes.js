import express from 'express';
import { registerUser } from '../controllers/UserController.js'; // Añade la extensión .js al final de UserController

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para obtener el perfil de usuario

// Otras rutas para actualizar, eliminar usuarios, etc.

export default router;
