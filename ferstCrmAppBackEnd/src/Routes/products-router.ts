import {Request, Response, Router} from "express";
import {repositoryProducts} from "../products/repository-products";
import {basicAuthMiddleware} from "../middleware/authBasikMiddleware";




export const productsRouter = Router()

productsRouter.get('/', async (req:Request, res:Response) => {
	const foundProducts = await repositoryProducts.findProducts(req.query.title?.toString())
	res.send(foundProducts)
});
productsRouter.post('/', async (req: Request, res: Response) => {
	const title = req.body.title?.trim()
	const createdProduct = await repositoryProducts.createProduct(title)
	if (title) {
		res.send(createdProduct)
	} else {
		res.status(400).send({error: "Product not created!!!"});
	}
});





// productsRouter.get('/:id', (req:Request, res:Response) => {
// const product  = repositoryProducts.getProductById(req.params.id)
// 	if (product){
// 			res.send(product);
// 		} else {
// 			res.status(404).send({error: "Not found!!!"})
// 		}
// });
// productsRouter.put('/:id', (req:Request, res:Response) => {
// const newTitle=req.body.title.trim()
// 	const isUpdated  =repositoryProducts.updateProductById( req.params.id, newTitle)
// 	if(isUpdated){
// 		const product  = repositoryProducts.getProductById(req.params.id)
// 		res.send({ message: "Product updated successfully" ,product});
// 	} else {
// 		res.status(404).send({ error: "Product not found!!!" });
// 	}
// });
// productsRouter.delete('/:id', basicAuthMiddleware, (req: Request, res: Response) => {
// 	const productId = req.params.id;
// 	const isDeleted = repositoryProducts.deleteProductById(productId)
// 	if (isDeleted) {
// 		res.status(204).json({ message: "Product deleted successfully" });
// 	} else {
// 		res.status(404).send({ error: "Product not found!!!" });
// 	}
// });