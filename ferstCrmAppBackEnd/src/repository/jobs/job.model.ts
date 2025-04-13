import mongoose from "mongoose";


export type AddressType = {
	houseStreet: string
	suitApt: string
	city: string
	state: string
	zip: string
}

export interface Ijob extends Document {
	id: string,
	jobNumber: string
	customerName: string
	customerEmail: string
	customerPhone: string
	jobDetails:{description:string, TypeEquipment:string}
	address: AddressType
}

// Определяем схему продукта
const jobSchema = new mongoose.Schema({
	id: {type: String, required: true, unique: true},
	jobNumber: {type: String},
	customerName: {type: String, required: true},
	customerEmail: {type: String, required: true},
	customerPhone: {type: String, required: true},
	jobDetails: {
	description:{type: String  },
	TypeEquipment:{type: String  },
    },
	address: {
		houseStreet: {type: String, required: true},
		suitApt: {type: String},
		city: {type: String, required: true},
		state: {type: String, required: true},
		zip: {type: String, required: true},
	}

});

// Middleware to auto-generate jobNumber before saving a new job
jobSchema.pre<Ijob>("save", async function (next) {
	if (!this.jobNumber) {
		const lastJob = await Job.findOne().sort({jobNumber: -1}).lean();
		const nextNumber = lastJob ? parseInt(lastJob.jobNumber, 10) + 1 : 1;
		this.jobNumber = nextNumber.toString().padStart(4, "0"); // Format as 4-digit number
	}
	next();
});
// Создаем модель
export const Job = mongoose.model<Ijob>("Job", jobSchema);
