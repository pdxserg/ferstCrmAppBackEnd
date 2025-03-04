import {Request, Response, Router} from "express";
import {repositoryProducts} from "../repository-products";


export const productsRouter = Router()

productsRouter.get('/', (req:Request, res:Response) => {
	const foundProducts =repositoryProducts.findProducts(req.query.title?.toString())
	res.send(foundProducts)
});
productsRouter.get('/:id', (req:Request, res:Response) => {
const product  = repositoryProducts.getProductById(req.params.id)
	if (product){
			res.send(product);
		} else {
			res.status(404).send({error: "Not found!!!"})
		}
});
productsRouter.post('/', (req:Request, res:Response) => {
	const title = req.body.title?.trim()

	const createProduct =repositoryProducts.createProduct(title)
	if (title){
		res.send(createProduct)
	}else {
			res.status(400).send({ error: "Product not created!!!" });
		}
});
productsRouter.put('/:id', (req:Request, res:Response) => {
const newTitle=req.body.title.trim()
	const isUpdated  =repositoryProducts.updateProductById( req.params.id, newTitle)
	if(isUpdated){
		const product  = repositoryProducts.getProductById(req.params.id)
		res.send({ message: "Product updated successfully" ,product});
	} else {
		res.status(404).send({ error: "Product not found!!!" });
	}
});
productsRouter.delete('/:id', (req: Request, res: Response) => {
	const productId = req.params.id;
	const isDeleted = repositoryProducts.deleteProductById(productId)
	if (isDeleted) {
		res.status(204).send({ message: "Product deleted successfully" });
	} else {
		res.status(404).send({ error: "Product not found!!!" });
	}
});