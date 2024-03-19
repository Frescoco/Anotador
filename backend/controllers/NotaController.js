import NotaModel from "../models/NotaModel.js";

export const getAllNotas = async (req, res) => {
    try {
        const notas = await NotaModel.find();
        res.status(200).json(notas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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


export const createNota = async (req, res) => {
    try {
        const nuevaNotaData = {
            ...req.body,
            createdAt: new Date() 
        };
        await NotaModel.create(nuevaNotaData);
        res.status(201).json({ message: "Nota creada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateNota = async (req, res) => {
    try {
        const id = req.params.id;
        await NotaModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Nota actualizada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const archiveNota = async (req, res) => {
    try {
        const id = req.params.id;
        await NotaModel.findByIdAndUpdate(id, { archived: true });
        res.status(200).json({ message: "Nota archivada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const unarchiveNota = async (req, res) => {
    try {
        const id = req.params.id;
        await NotaModel.findByIdAndUpdate(id, { archived: false });
        res.status(200).json({ message: "Nota desarchivada correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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

export const getNotasRetrasadas = async (req, res) => {
    try {
        const notasRetrasadas = await NotaModel.find({ retrasada: true });
        res.status(200).json(notasRetrasadas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setNotaRetrasada = async (req, res) => {
    try {
        const id = req.params.id;
        const { retrasada } = req.body; 
        await NotaModel.findByIdAndUpdate(id, { retrasada });
        res.status(200).json({ message: "Estado de retraso de la nota actualizado correctamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

