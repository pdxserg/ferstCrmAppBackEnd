import mongoose from "mongoose";


export type AddressType = {
	houseStreet: string
	suitApt: string
	city: string
	state: string
	zip: string
}

export interface Ijob extends Document {
	jobId: string,
	jobNumber: string
	customerName: string
	customerEmail: string
	customerPhone: string
	jobDetails:{description:string, typeEquipment:string}
	address: AddressType

	customerId: string
	timeAppointment:string
	timeCreated:string
	equipmentType:string
	descriptionJob:string

}

const jobSchema = new mongoose.Schema({
	jobId: {type: String, required: true, unique: true},
	jobNumber: {type: String},
	customerName: {type: String, required: true},
	customerEmail: {type: String},
	customerPhone: {type: String},
	jobDetails: {
	description:{type: String  },
	typeEquipment:{type: String  },
    },
	address: {
		houseStreet: {type: String, required: true},
		suitApt: {type: String},
		city: {type: String},
		state: {type: String},
		zip: {type: String},
	},
	customerId: {type: String, required: true},
	timeAppointment:{type: String},
	timeCreated:{type: String},
	equipmentType:{type: String},
	descriptionJob:{type: String},
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
