import { Ijob, Job} from "./job.model";
import {ICustomer} from "../customers/customers.model";
import ShortUniqueId from 'short-uuid'




export const repositoryJobs = {
	async findJobs(searchTerm: string | null | undefined): Promise<{ jobs: Ijob[], total: number }> {
		let query: any = {};

		if (searchTerm) {
			const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex

			query = {
				$or: [ // Use $or to search in either jobNumber or customerName
					{ jobNumber: regex },
					{ customerName: regex },
					{ customerPhone: regex },
				],
			};
		}

		// const query = jobNumber ? {jobNumber: new RegExp(jobNumber, "i")} : {}; // Условие поиска

		const jobs = await Job.find(query); // Ищем продукты по названию (если есть)
		const total = await Job.countDocuments(query); // Подсчитываем количество
		return {jobs, total};
	},


	async getJobById(jobId: string): Promise<Ijob | null> {
		let job = await Job.findOne({jobId: jobId})
		if (job) {
			return job
		} else {
			return null
		}
	},

	async createJob(args: { customer:ICustomer, jobDetails:{description:string, typeEquipment:string} }): Promise<Ijob> {
		const shortUUID = ShortUniqueId();

		const newJob =new Job({
			jobId: shortUUID.new(),
			customerId: args.customer.customerId,
			customerName: args.customer.customerName,
			customerEmail: args.customer.customerEmail,
			customerPhone: args.customer.customerPhone,
			jobDetails: {
				description:args.jobDetails.description,
				typeEquipment:args.jobDetails.typeEquipment
			},
			address: {
				houseStreet: args.customer.address.houseStreet,
				suitApt: args.customer.address.suitApt,
				city: args.customer.address.city,
				state:args.customer.address.state,
				zip: args.customer.address.zip
			}
		})

		const savedJob = await newJob.save();
		// Return the saved job with the jobNumber
		return savedJob;
	},


	// В репозитории
	async updateJobById(jobId: string, newDescription?: string,
	                    newName?: string,
	                    newPhone?: string,
	                    newEmail?: string
	): Promise<boolean> {
		const updateFields: any = {};

		if (newDescription !== undefined) {
			updateFields.jobDetails = newDescription;
		}

		if (newName !== undefined) {
			updateFields.customerName = newName;
		}
		if (newPhone !== undefined) {
			updateFields.customerPhone = newPhone;
		}
		if (newEmail !== undefined) {
			updateFields.customerEmail = newEmail;
		}

		const updatedJob = await Job.findOneAndUpdate(
			{jobId: jobId},
			updateFields,
			{new: true, runValidators: true}
		);
		return !!updatedJob;
		// return updatedJob ? true : false;

	},


	async deleteJobById(jobId: string): Promise<boolean> {
		const deletedJob = await Job.findOneAndDelete({jobId});
		return !!deletedJob; //it same (deletedJob ? true : false)

	}


}
