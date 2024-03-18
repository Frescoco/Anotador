// Importamos el Modelo
import NotaModel from "../models/NotaModel.js";

// Métodos para el CRUD

// Mostrar todas las notas
export const getAllNotas = async (req, res) => {
    try {
        const notas = await NotaModel.find();
        res.status(200).json(notas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar una nota
export const getNota = async (req, res) => {
    try {
        const id = req.params.id;
        const nota = await NotaModel.findById(id);
        if (!nota) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        res.status(200).json(nota);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nota
export const createNota = async (req, res) => {
    try {
        await NotaModel.create(req.body);
        res.status(201).json({ message: "Nota creada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una nota
export const updateNota = async (req, res) => {
    try {
        const id = req.params.id;
        await NotaModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Nota actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Archivar una nota
export const archiveNota = async (req, res) => {
    try {
        const id = req.params.id;
        await NotaModel.findByIdAndUpdate(id, { archived: true });
        res.status(200).json({ message: "Nota archivada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Desarchivar una nota
export const unarchiveNota = async (req, res) => {
    try {
        const id = req.params.id;
        await NotaModel.findByIdAndUpdate(id, { archived: false });
        res.status(200).json({ message: "Nota desarchivada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una nota
export const deleteNota = async (req, res) => {
    try {
        const id = req.params.id;
        await NotaModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Nota eliminada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getNotasArchivadas = async (req, res) => {
    try {
        const notasArchivadas = await NotaModel.find({ archived: true });
        res.status(200).json(notasArchivadas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}