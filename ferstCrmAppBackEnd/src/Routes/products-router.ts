import {NextFunction, Request, Response, Router} from "express";
import {repositoryProducts} from "../products/repository-products";
import {basicAuthMiddleware} from "../middleware/authBasikMiddleware";




export const productsRouter = Router()

productsRouter.get('/', async (req:Request, res:Response) => {
	const foundProducts = await repositoryProducts.findProducts(req.query.title?.toString())
	res.send(foundProducts)
});
// productsRouter.post('/', async (req: Request, res: Response) => {
// 	const title = req.body.title?.trim()
// 	const createdProduct = await repositoryProducts.createProduct(title)
// 	if (createdProduct) {
// 		res.send(createdProduct)
// 	} else {
// 		res.status(400).send({error: "Product not created!!!"});
// 	}
// });

productsRouter.post('/',  async (req: Request, res: Response) => {
	const title = req.body.title?.trim();
	// if (!title) {
	// 	return res.status(400).send({ error: "Title is required!" });
	// }
	// try {
	// 	const createdProduct =  repositoryProducts.createProduct(title);
	// 	res.status(201).send(createdProduct);
	// } catch (error) {
	// 	res.status(500).send({ error: "Internal Server Error" });
	// }
	const createProduct = await repositoryProducts.createProduct(title)
	if (title) {
		res.send(createProduct)
	} else {
		res.status(400).send({error: "Product not created!!!"});
	}

});




productsRouter.get('/:id', async (req:Request, res:Response) => {
const product  =await repositoryProducts.getProductById(req.params.id)
	if (product){
			res.send(product);
		} else {
			res.status(404).send({error: "Not found!!!"})
		}
});
productsRouter.put('/:id', async (req: Request, res: Response) => {
	const newTitle = req.body.title.trim()
	const isUpdated = await repositoryProducts.updateProductById(req.params.id, newTitle)
	if (isUpdated) {
		const product = repositoryProducts.getProductById(req.params.id)
		res.send({message: "Product updated successfully", product});
	} else {
		res.status(404).send({error: "Product not found!!!"});
	}
});
// productsRouter.delete('/:id',
// 	// basicAuthMiddleware,
// 	async (req: Request, res: Response) => {
// 	const productId = req.params.id;
// 	const isDeleted = await repositoryProducts.deleteProductById(productId)
// 	if (isDeleted) {
// 		res.status(204).json({message: "Product deleted successfully"});
// 	} else {
// 		res.status(404).send({error: "Product not found!!!"});
// 	}
// });