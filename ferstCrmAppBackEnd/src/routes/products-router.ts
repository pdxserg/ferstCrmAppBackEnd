
/**
 *  @openapi
 * /products/{id}:
 *   get:
 *     description: Retrieve a single product by its unique ID.
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */

import {Request, Response, Router} from "express";
import {repositoryProducts} from "../products/repository-products";
import {basicAuthMiddleware} from "../middleware/authBasikMiddleware";


export const productsRouter = Router()
/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter products by title
 *     responses:
 *       200:
 *         description: A list of products
 */
productsRouter.get('/', async (req: Request, res: Response) => {
	const {products, total } = await repositoryProducts.findProducts(req.query.title?.toString())
	res.send({totalCount: total,resultCode:0, products})
});



productsRouter.get('/:id', async (req: Request, res: Response) => {
	const product = await repositoryProducts.getProductById(req.params.id)
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({error: "Not found!!!"})
	}
});


/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Product"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Title is required
 *       500:
 *         description: Internal Server Error
 */
productsRouter.post('/', async (req: Request, res: Response) => {
	const title = req.body.title?.trim();
	if (!title) {
		 res.status(400).send({ error: "Title is required!" });
	}
	try {
		const createdProduct = await repositoryProducts.createProduct(title);
		 res.status(201).send(createdProduct);
	} catch (error) {
		res.status(500).send({ error: "Internal Server Error" });
	}
});


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
	const isUpdated: boolean = await repositoryProducts.updateProductById(req.params.id, newTitle);

	if (isUpdated) {
		const product = await repositoryProducts.getProductById(req.params.id);
		res.send({message: "Product updated successfully", product});
	} else {
		res.status(404).send({error: "Product not found!!!"});
	}
});



/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Remove a product from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productsRouter.delete('/:id',
	  basicAuthMiddleware,
	async (req: Request, res: Response) => {
		const isDeleted = await repositoryProducts.deleteProductById(req.params.id)
		if (isDeleted) {
			res.json({message: "Product deleted successfully"});
		} else {
			res.status(404).send({error: "Product not found!!!"});
		}
	});