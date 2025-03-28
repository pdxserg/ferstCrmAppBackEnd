import mongoose from "mongoose";


export type AddressType={
	houseStreet:string
	suitApt:string
	city:string
	state:string
	zip:string
}
export interface ICustomer extends Document {
	id: string,
	customerName: string
	customerEmail: string
	customerPhone: string
	address:AddressType
}

// Определяем схему продукта
const customerSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	customerName: { type: String, required: true },
	customerEmail: { type: String, required: true },
	customerPhone: { type: String, required: true },
	address:{
		houseStreet:{type: String, required: true},
		suitApt:{type: String },
		city:{type: String, required: true},
		state:{type: String, required: true},
		zip:{type: String, required: true},
	}

});


// Создаем модель
export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
