import {Request, Response, Router} from "express";
import {repositoryJobs} from "../repository/jobs/repository-jobs";
import {ICustomer} from "../repository/customers/customers.model";




export const jobsRouter = Router()
/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: number
 *                   example: "34"
 *                 resultCode:
 *                   type: number
 *                   example: "0"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1234kn234"
 *                       title:
 *                         type: string
 *                         example: "string"
 *                       createdAt:
 *                         type: string
 *                         example: "2025-03-11T14:00:27.238Z"
 */
jobsRouter.get('/', async (req: Request, res: Response) => {
	debugger
	const { searchTerm } = req.query;
	const {jobs: items, total} = await repositoryJobs.findJobs(searchTerm?.toString());
	res.send({totalCount: total, resultCode: 0, items})
});

// /**
//  *  @openapi
//  * /products/{id}:
//  *   get:
//  *     tags:
//  *       - Products
//  *     description: Retrieve a single product by its unique ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the product
//  *     responses:
//  *       200:
//  *         description: Success
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                   example: "1234kn234"
//  *                 title:
//  *                   type: string
//  *                   example: "string"
//  *                 createdAt:
//  *                   type: string
//  *                   example: "2025-03-11T14:00:27.238Z"
//  *       404:
//  *         description: Product not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Product not found!!!"
//  */
// jobsRouter.get('/:id', async (req: Request, res: Response) => {
// 	const product = await repositoryJobs.getProductById(req.params.id)
// 	if (product) {
// 		res.send(product);
// 	} else {
// 		res.status(404).send({error: "Not found!!!"})
// 	}
// });
jobsRouter.get('/:id', async (req: Request, res: Response) => {
	const job = await repositoryJobs.getJobById(req.params.id);

	if (job) {
		res.json({ message: "Job found!", job: job });
	// } else if (result.jobs && result.total !== undefined) {
	// 	res.json({
	// 		message: "Jobs found!",
	// 		totalCount: result.total,
	// 		resultCode: 0,
	// 		items: result.jobs
	// 	});
	} else {
		res.status(404).send({ error: "Job not found!!!" });
	}
});





/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Products
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1234kn234"
 *                 title:
 *                   type: string
 *                   example: "string"
 *                 createdAt:
 *                   type: string
 *                   example: "2025-03-11T14:00:27.238Z"
 *       400:
 *         description: Title is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Title is required!!!"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error!!!"
 */
jobsRouter.post('/',

	async (req: Request, res: Response) => {

	const {customer, jobDetails} = req.body;

	if (!customer) {
		res.status(400).send({error: "customer is required!"});
	}

	try {
		const createdJob = await repositoryJobs.createJob({
			customer,jobDetails
		});
		res.status(201).send(createdJob);
	} catch (error) {
		debugger
		console.error("Error creating job:", error); // Log the actual error
		res.status(500).send({error: "Internal Server Error"})
	}
});



//
// /**
//  * @openapi
//  * /api/products/{id}:
//  *   put:
//  *     tags:
//  *       - Products
//  *     summary: Update a product by ID
//  *     description: Update a product from the database.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the product
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - title
//  *             properties:
//  *               title:
//  *                 type: string
//  *     responses:
//  *      200:
//  *        description: Product Update successfully
//  *        content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                   example: "1234kn234"
//  *                 title:
//  *                   type: string
//  *                   example: "string"
//  *                 createdAt:
//  *                   type: string
//  *                   example: "2025-03-11T14:00:27.238Z"
//  *      404:
//  *         description: Product not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: "Product not found!!!"
//  */
// productsRouter.put('/:id', async (req: Request, res: Response) => {
// 	//
// 	// const newTitle = req.body.title?.trim(); // Безопасная проверка
// 	// if (!newTitle) {
// 	// 	 res.status(400).send({ error: "Title is required!" });
// 	// }
// 	//
// 	// try {
// 	// 	const updatedProduct = await repositoryProducts.updateProductById(req.params.id, newTitle);
// 	//
// 	// 	if (updatedProduct) {
// 	// 		 res.send({ message: "Product updated successfully", product: updatedProduct });
// 	// 	} else {
// 	// 		 res.status(404).send({ error: "Product not found!!!" });
// 	// 	}
// 	// } catch (error) {
// 	// 	console.error("Update error:", error);
// 	// 	res.status(500).send({ error: "Internal Server Error11111" });
// 	// }
// 	//
//
//
// 	const newTitle = req.body.title.trim();
// 	const isUpdated: boolean = await repositoryProducts.updateProductById(req.params.id, newTitle);
//
// 	if (isUpdated) {
// 		const product = await repositoryProducts.getProductById(req.params.id);
// 		res.send({message: "Product updated successfully", product});
// 	} else {
// 		res.status(404).send({error: "Product not found!!!"});
// 	}
// });

jobsRouter.put('/:id', async (req: Request, res: Response) => {
	try {
		const updateData = {
			'jobDetails.description': req.body.jobDetails?.description,
			customerName: req.body.customerName,
			customerPhone: req.body.customerPhone,
			customerEmail: req.body.customerEmail,
		};

		const isUpdated = await repositoryJobs.updateJobById(req.params.id, updateData);

		if (isUpdated) {
			const job = await repositoryJobs.getJobById(req.params.id);
			res.send({ message: "Job updated successfully", job });
		} else {
			res.status(404).send({ error: "Job not found!" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: "Something went wrong." });
	}
});
// jobsRouter.put('/:id', async (req: Request, res: Response) => {
//
// 	const newDescription = req.body.jobDetails;
// 	const newName = req.body.customerName;
// 	const newPhone = req.body.customerPhone;
// 	const newEmail = req.body.customerEmail;
// 	const updateData={
// 		'jobDetails.description':req.body.jobDetails.description,
// 		customerName:req.body.customerName,
// 		customerPhone:req.body.customerPhone,
// 		customerEmail:req.body.customerEmail
// 	}
//
// 	const isUpdated: boolean = await repositoryJobs.updateJobById(req.params.id, newDescription, newName, newPhone, newEmail);
//
// 	if (isUpdated) {
// 		const job = await repositoryJobs.getJobById(req.params.id);
// 		res.send({message: "Job updated successfully", job});
// 	} else {
// 		res.status(404).send({error: "Job not found!!!"});
// 	}
// });



/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found!!!"
 */
jobsRouter.delete('/:id',
	// basicAuthMiddleware,
	async (req: Request, res: Response) => {
		const isDeleted = await repositoryJobs.deleteJobById(req.params.id)
		if (isDeleted) {
			res.json({message: "Job deleted successfully"});
		} else {
			res.status(404).send({error: "Job not found!!!"});
		}
	});