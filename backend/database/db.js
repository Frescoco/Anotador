import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/Nota'; // Cambio a IPv4
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('strictQuery', false); // Configuración de strictQuery

const db = mongoose.connection;

db.on('open', () => {
  console.log("¡Conectado a MongoDB!");
});

db.on('error', () => {
  console.log("¡Error al conectar a MongoDB!");
});

export default db;
