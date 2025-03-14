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
		jobNumber: number;
		customerName: string;
		customerEmail: string;
		customerPhone: number;
		jobDetails: string;
	}):Promise<Ijob> {
		const generateId = () => Math.random().toString(36).slice(2, 9);
		const newJob =new Job ({
			id: generateId(),
			jobNumber: args.jobNumber,
			customerName: args.customerName,
			customerEmail: args.customerEmail,
			customerPhone: args.customerPhone,
			jobDetails: args.jobDetails,
			createdAt: new Date(), // Добавляем текущую дату
		})
		await newJob.save();
		return newJob;
	},

	//
	// // В репозитории
	// async updateProductById(productId: string, newTitle: string): Promise<boolean> {
	// 	const updatedProduct = await Product.findOneAndUpdate(
	// 		{ id: productId },
	// 		{ title: newTitle },
	// 		{ new: true, runValidators: true }
	// 	);
	// 	return updatedProduct ? true : false;
	// 	// return updatedProduct || false;
	// },
	//
	//
	// async deleteProductById(id: string):Promise<boolean> {
	// 	const deletedProduct = await Product.findOneAndDelete({id});
	// 	return deletedProduct ? true : false;
	// }


}

// old code, local storage in file

// const products = [{id: "1", title: "tomato"}, {id: "2", title: "orange"},]
// export const repositoryProducts = {
// 	findProducts(title: string | null | undefined) {
// 		if (title) {
// 			const searchProducts = products.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
// 			return searchProducts
// 		} else {
// 			return products
// 		}
// 	},
// 	getProductById(productId: string) {
// 		const product = products.find(el => el.id === productId)
// 		return product
// 	},
// 	createProduct(title: string) {
// 		const generateId = () => Math.random().toString(36).slice(2, 9);
// 		const newProduct = {id: generateId(), title: title}
// 		products.unshift(newProduct)
// 		return newProduct
//
// 	},
// 	updateProductById(productId: string, newTitle: string) {
// 		const product = products.find(el => el.id === productId)
// 		if (product) {
// 			product.title = newTitle
// 			return true
// 		}else {
// 			return false
// 		}
// 	},
// 	deleteProductById(productId: string) {
// 		const index = products.findIndex(el => el.id === productId);
// 		if (index !== -1) {
// 			products.splice(index, 1);
// 			return true
// 		} else {
// 			return false
// 		}
// 	},
//
// }