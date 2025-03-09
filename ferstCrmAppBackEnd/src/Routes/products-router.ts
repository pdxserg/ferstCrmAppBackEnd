import {NextFunction, Request, Response, Router} from "express";
import {repositoryProducts} from "../products/repository-products";
import {basicAuthMiddleware} from "../middleware/authBasikMiddleware";




export const productsRouter = Router()

productsRouter.get('/', async (req:Request, res:Response) => {
	const foundProducts = await repositoryProducts.findProducts(req.query.title?.toString())
	res.send(foundProducts)
});
productsRouter.get('/:id', async (req:Request, res:Response) => {
	const product  =await repositoryProducts.getProductById(req.params.id)
	if (product){
		res.send(product);
	} else {
		res.status(404).send({error: "Not found!!!"})
	}
});
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


// productsRouter.put('/:id', async (req: Request, res: Response) => {
// 	const newTitle = req.body.title?.trim(); // Безопасная проверка
// 	if (!newTitle) {
// 		return res.status(400).send({ error: "Title is required!" });
// 	}
//
// 	try {
// 		const updatedProduct = await repositoryProducts.updateProductById(req.params.id, newTitle);
//
// 		if (updatedProduct) {
// 			return res.send({ message: "Product updated successfully", product: updatedProduct });
// 		} else {
// 			return res.status(404).send({ error: "Product not found!!!" });
// 		}
// 	} catch (error) {
// 		console.error("Update error:", error);
// 		res.status(500).send({ error: "Internal Server Error" });
// 	}
// });

productsRouter.put('/:id', async (req: Request, res: Response) => {
	//
	// const newTitle = req.body.title?.trim(); // Безопасная проверка
	// if (!newTitle) {
	// 	 res.status(400).send({ error: "Title is required!" });
	// }
	//
	// try {
	// 	const updatedProduct = await repositoryProducts.updateProductById(req.params.id, newTitle);
	//
	// 	if (updatedProduct) {
	// 		 res.send({ message: "Product updated successfully", product: updatedProduct });
	// 	} else {
	// 		 res.status(404).send({ error: "Product not found!!!" });
	// 	}
	// } catch (error) {
	// 	console.error("Update error:", error);
	// 	res.status(500).send({ error: "Internal Server Error11111" });
	// }
	//


	const newTitle = req.body.title.trim();
	const isUpdated:boolean= await repositoryProducts.updateProductById(req.params.id, newTitle);

	if (isUpdated) {
		// Fetch updated product details
		const product = await repositoryProducts.getProductById(req.params.id);
		res.send({ message: "Product updated successfully", product });
	} else {
		res.status(404).send({ error: "Product not found!!!" });
	}
});

productsRouter.delete('/:id',
	  // basicAuthMiddleware,
	async (req: Request, res: Response) => {
	const isDeleted = await repositoryProducts.deleteProductById(req.params.id)
	if (isDeleted) {
		res.status(204).send({message: "Product deleted successfully"});
	} else {
		res.status(404).send({error: "Product not found!!!"});
	}
});