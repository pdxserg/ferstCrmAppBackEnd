import mongoose from "mongoose";

export interface IProduct extends Document {
	id: string;
	title: string;
	createdAt: Date;
}

// Определяем схему продукта
const productSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },

});

// Создаем модель
export const Product = mongoose.model<IProduct>("Product", productSchema);
