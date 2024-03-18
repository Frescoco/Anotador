import express from 'express';
import { registerUser, loginUser } from '../controllers/UserController.js'; // Importa loginUser desde UserController

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Nueva ruta para iniciar sesión
router.post('/login', loginUser);

// Otras rutas para actualizar, eliminar usuarios, etc.

export default router;
