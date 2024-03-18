import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import notaRoutes from './routes/notaRoutes.js'; // Importa el enrutador de notas
import userRoutes from './routes/userRoutes.js'; // Importa el enrutador de usuarios

const app = express();

app.use(cors());
app.use(express.json()); // Agrega este middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true }));

app.use('/notas', notaRoutes);
app.use('/users', userRoutes); // Utiliza el enrutador de usuarios con el prefijo '/users'

app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
