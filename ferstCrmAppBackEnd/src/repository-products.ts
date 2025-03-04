
const products = [{id:"1",title: "tomato"}, {id:"2",title: "orange"},]

export  const repositoryProducts = {
	findProducts(title: string | null | undefined) {
		if (title) {
			const searchProducts = products.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
			return searchProducts
		} else {
			return products
		}
	},
	createProduct(title: string) {
			const generateId = () => Math.random().toString(36).slice(2, 9);
			const newProduct = {id: generateId(), title: title}
			products.unshift(newProduct)
			return newProduct

	},
	getProductById(productId:string){
		const product = products.find(el=>el.id === productId)
		return product
	},
	updateProductById(productId:string,newTitle:string){
		const product = products.find(el=>el.id === productId)
		if (product){
			product.title=newTitle
		}
		return product
	},

}