import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notaSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }, 
    archived: { type: Boolean, default: false },
    importante: { type: Boolean, default: false }, 
    retrasada: { type: Boolean, default: false } 
  },

  { collection: "notas" }
);

export default mongoose.model("NotaModel", notaSchema);
