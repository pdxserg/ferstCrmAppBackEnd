import mongoose from "mongoose";


export type AddressType = {
	houseStreet: string
	suitApt: string
	city: string
	state: string
	zip: string
}

export interface ICustomer extends Document {
	customerId: string,
	customerName: string
	customerEmail: string
	customerPhone: string
	address: AddressType
}

// Определяем схему продукта
const customerSchema = new mongoose.Schema({
	customerId: {type: String, required: true, unique: true},
	customerName: {type: String, required: true},
	customerEmail: {type: String},
	customerPhone: {type: String, required: true},
	address: {
		houseStreet: {type: String},
		suitApt: {type: String},
		city: {type: String},
		state: {type: String},
		zip: {type: String},
	}

});


// Создаем модель
export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
