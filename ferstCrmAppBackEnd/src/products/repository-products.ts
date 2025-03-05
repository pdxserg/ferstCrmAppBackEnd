import {Product} from "./model-products";

export const repositoryProducts = {
	async findProducts(title: string | null | undefined) {
		if (title) {
			const searchProducts = await Product.find({title: new RegExp(title, "i")}); // Поиск по названию
			return searchProducts
		} else {
			return await Product.find();
		}
	},
	async createProduct(title: string) {
		const generateId = () => Math.random().toString(36).slice(2, 9);
		const newProduct = new Product({ title,id: generateId()});
		await newProduct.save();
		return newProduct;
	},

	// const generateId = () => Math.random().toString(36).slice(2, 9);
// 		const newProduct = {id: generateId(), title: title}
// 		products.unshift(newProduct)
// 		return newProduct

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