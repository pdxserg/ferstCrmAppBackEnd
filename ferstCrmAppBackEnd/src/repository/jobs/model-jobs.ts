import mongoose from "mongoose";

export interface Ijob extends Document {
	id: string,
	jobNumber: number
	customerName: string
	customerEmail: string
	customerPhone: number
	jobDetails: string
	createdAt: Date;
}

// Определяем схему продукта
const jobSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	jobNumber: { type: Number, required: true },
	customerName: { type: String, required: true },
	customerEmail: { type: String, required: true },
	customerPhone: { type: Number, required: true },
	jobDetails: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },

});

// Создаем модель
export const Job = mongoose.model<Ijob>("Job", jobSchema);
