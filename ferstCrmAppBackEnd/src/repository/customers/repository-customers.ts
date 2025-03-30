import {AddressType, Customer, ICustomer,} from "./customers.model";


export const repositoryCustomers = {
	async findCustomers(searchTerm: string | null | undefined): Promise<{ customers: ICustomer[], total: number }> {
		let query: any = {};

		if (searchTerm) {
			const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex

			query = {
				$or: [ // Use $or to search in either jobNumber or customerName
					{ customerName: regex },
					{ customerPhone: regex },
				],
			};
		}

		// const query = jobNumber ? {jobNumber: new RegExp(jobNumber, "i")} : {}; // Условие поиска

		const customers = await Customer.find(query); // Ищем продукты по названию (если есть)
		const total = await Customer.countDocuments(query); // Подсчитываем количество
		return {customers, total};
	},


	async getCustomersById(id: string): Promise<ICustomer | null> {
		let customer = await Customer.findOne({id: id})
		if (customer) {
			return customer
		} else {
			return null
		}
	},

	async createCustomer(args: {
		customerName: string;
		customerEmail: string;
		customerPhone: string;
		address:AddressType
	}): Promise<ICustomer> {
		const generateId = () => Math.random().toString(36).slice(2, 9);
		const newJob = new Customer({
			id: generateId(),
			customerName: args.customerName,
			customerEmail: args.customerEmail,
			customerPhone: args.customerPhone,
			address: {
				houseStreet: args.address.houseStreet,
				suitApt: args.address.suitApt,
				city: args.address.city,
				state:args.address.state,
				zip: args.address.zip
			}
		})
		const savedCustomer = await newJob.save();
		// Return the saved job with the jobNumber
		return savedCustomer;
	},


	// В репозитории
	// async updateJobById(jobId: string, newDescription?: string,
	//                     newName?: string,
	//                     newPhone?: string,
	//                     newEmail?: string
	// ): Promise<boolean> {
	// 	const updateFields: any = {};
	//
	// 	if (newDescription !== undefined) {
	// 		updateFields.jobDetails = newDescription;
	// 	}
	//
	// 	if (newName !== undefined) {
	// 		updateFields.customerName = newName;
	// 	}
	// 	if (newPhone !== undefined) {
	// 		updateFields.customerPhone = newPhone;
	// 	}
	// 	if (newEmail !== undefined) {
	// 		updateFields.customerEmail = newEmail;
	// 	}
	//
	// 	const updatedJob = await Job.findOneAndUpdate(
	// 		{id: jobId},
	// 		updateFields,
	// 		{new: true, runValidators: true}
	// 	);
	// 	return !!updatedJob;
	// 	// return updatedJob ? true : false;
	//
	// },


	async deleteCustomerById(id: string): Promise<boolean> {
		const deletedCustomer = await Customer.findOneAndDelete({id});
		return !!deletedCustomer; //it same (deletedJob ? true : false)

	}


}
