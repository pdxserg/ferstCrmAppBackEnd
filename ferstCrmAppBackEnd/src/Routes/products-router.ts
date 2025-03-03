import {Request, Response, Router} from "express";

const products = [{id:"1",title: "tomato"}, {id:"2",title: "orange"},]
export const productsRouter = Router()

productsRouter.get('/', (req:Request, res:Response) => {
	if(req.query.title){
		const searchString = req.query.title.toString()
		res.send(products.filter(el => el.title.toLowerCase().includes(searchString.toLowerCase())))

	}else {
		res.send(products);
	}

});
productsRouter.get('/:productTitle', (req:Request, res:Response) => {
	const params = req.params.productTitle
	let product = products.find(el => el.id === params)
	if (product){
		res.send(product);
	} else {
		res.status(404).send({error: "Not found!!!"})
	}

});
productsRouter.post('/', (req:Request, res:Response) => {
	const title = req.body.title?.trim()
	const generateId = () => Math.random().toString(36).slice(2, 9);
	if(title){
		const newProduct = {id: generateId(), title: title}
		products.unshift(newProduct)
		res.status(201).send({ message: "Product created successfully",newProduct });
	} else {
		res.status(400).send({ error: "Product not created!!!" });
	}

});
productsRouter.put('/:id', (req:Request, res:Response) => {
	const product  =products.find(el=>el.id === req.params.id)
	if(product){
		product.title=req.body.title?.trim()
		res.send({ message: "Product updated successfully" ,product});
	} else {
		res.status(404).send({ error: "Product not found!!!" });
	}
});
productsRouter.delete('/:id', (req: Request, res: Response) => {
	const productId = req.params.id;
	const index = products.findIndex(el => el.id === productId);
	if (index !== -1) {
		products.splice(index, 1);
		res.status(204).send({ message: "Product deleted successfully" });
	} else {
		res.status(404).send({ error: "Product not found!!!" });
	}
});