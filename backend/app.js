import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import notaRoutes from './routes/notaRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/notas', notaRoutes);
app.use('/users', userRoutes); 

app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
