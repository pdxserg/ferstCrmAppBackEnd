import {Ijob, Job} from "./job.model";


export const repositoryJobs = {
	async findJobs(jobNumber: string | null | undefined):Promise<{ jobs:Ijob[], total:number }> {
		const query = jobNumber ? { jobNumber: new RegExp(jobNumber, "i") } : {}; // Условие поиска

		const jobs = await Job.find(query); // Ищем продукты по названию (если есть)
		const total = await Job.countDocuments(query); // Подсчитываем количество

		return { jobs, total };
	},


	// async getProductById(id: string):Promise<IProduct | null> {
	// 	let product =await Product.findOne({id:id})
	// 	if(product){
	// 		return product
	// 	}else {
	// 		return null
	// 	}
	// },

	async createJob(args: {
		// jobNumber: string;
		customerName: string;
		customerEmail: string;
		customerPhone: string;
		jobDetails: string;
	}):Promise<Ijob> {
		const generateId = () => Math.random().toString(36).slice(2, 9);
		const newJob =new Job ({
			id: generateId(),
			// jobNumber: "2324",
			customerName: args.customerName,
			customerEmail: args.customerEmail,
			customerPhone: args.customerPhone,
			jobDetails:args.jobDetails
		})
		const savedJob = await newJob.save();
		// Return the saved job with the jobNumber
		return savedJob;
	},


	// В репозитории
	async updateJobById(jobId: string, newDescription: string): Promise<boolean> {
		const updatedJob = await Job.findOneAndUpdate(
			{ id: jobId },
			{ jobDetails: newDescription },
			{ new: true, runValidators: true }
		);
		return updatedJob ? true : false;
		// return updatedProduct || false;
	},


	async deleteJobById(id: string):Promise<boolean> {
		const deletedJob = await Job.findOneAndDelete({id});
		return !!deletedJob; //it same (deletedJob ? true : false)

	}


}
