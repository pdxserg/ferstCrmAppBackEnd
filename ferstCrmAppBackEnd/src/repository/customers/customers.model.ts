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
	customerNumber: number
	customerName: string
	customerEmail: string
	customerPhone: string

	address: AddressType
}

// Определяем схему продукта
const customerSchema = new mongoose.Schema({
	customerId: {type: String, required: true, unique: true},
	customerNumber:{type: Number},
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
// Middleware to auto-generate jobNumber before saving a new job
customerSchema.pre<ICustomer>("save", async function (next) {
	if (!this.customerNumber) {
		const lastCustomer = await Customer.findOne().sort({customerNumber: -1}).lean();
		const nextNumber = lastCustomer ? lastCustomer.customerNumber + 1 : 1;
		this.customerNumber = nextNumber; // Format as 1-digit number
	}
	next();
});

// Создаем модель
export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
