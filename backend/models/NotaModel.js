import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notaSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }, // Agregar el campo createdAt con valor predeterminado Date.now
    archived: { type: Boolean, default: false }, // Agregar el campo archived con valor predeterminado false
    importante: { type: Boolean, default: false } // Agregar el campo importante con valor predeterminado false
  },
  { collection: "notas" }
);

export default mongoose.model("NotaModel", notaSchema);
