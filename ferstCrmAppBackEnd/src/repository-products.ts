
const products = [{id:"1",title: "tomato"}, {id:"2",title: "orange"},]

export  const repositoryProducts ={
findProducts(title: string|null|undefined){
	if(title){
	const searchProducts =	products.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
	return searchProducts
}else {
	return products
}
}}