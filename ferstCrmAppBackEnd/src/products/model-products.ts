import mongoose from "mongoose";



// Определяем схему продукта
const productSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	title: { type: String, required: true },

});

// Создаем модель
export const Product = mongoose.model("Product", productSchema);
