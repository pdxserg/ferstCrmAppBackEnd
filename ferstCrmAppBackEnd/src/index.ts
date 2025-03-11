// import express, { Request, Response } from "express";
// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import path from "path";
//
// const app = express();
// app.use(express.json());
//
// const port = 5000;
//
// // 🔥 Swagger Options (ПРАВИЛЬНЫЙ ПУТЬ)
// const swaggerOptions = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Test API",
//             version: "1.0.0",
//             description: "API for testing Swagger",
//         },
//     },
//     apis: [path.join(__dirname, "../src/index.ts")]};
//
// // 🔥 Инициализируем Swagger
// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//
// /**
//  * @openapi
//  * /products/{id}:
//  *   get:
//  *     summary: Get a product by ID
//  *     description: Retrieve a single product by its unique ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the product to retrieve.
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Product found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Product with ID: 123"
//  *       404:
//  *         description: Product not found
//  */
// app.get('/products/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     res.json({ message: `Product with ID: ${id}` });
// });
//
// app.listen(port, () => {
//     console.log(`🚀 Server running on http://localhost:${port}`);
// });



import express, {NextFunction, Request, Response} from "express";
import {productsRouter} from "./routes/products-router";
import {adressesRouter} from "./routes/adresses-router";
import {connectDB} from "./db";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import path from "path";
import {repositoryProducts} from "./products/repository-products";




const app = express()
app.use(express.json());

//MiddleWare
// const authGuardMidlWare=(req:Request, res:Response,next:NextFunction)=>{
//     if(req.query.token ==="123") next()
//     else   res.sent(404)
// }
// app.use(authGuardMidlWare)



const port = 5000

// Swagger Options
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",  // ✅ Добавили версию OpenAPI
        info: {
            title: "Product API",
            version: "1.0.0",
            description: "API for managing products, ferstcrmapp",
        },
    },
    apis: [path.join(__dirname, "../src/routes/products-router.ts")]

};

// Initialize Swagger Docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/products',  productsRouter)

//
// /**
//  *  @openapi
//  * /products/{id}:
//  *   get:
//  *     description: Retrieve a single product by its unique ID.
//  *     responses:
//  *       200:
//  *         description: Product found
//  *       404:
//  *         description: Product not found
//  */
// Routes

// app.get('/products/:id', async (req: Request, res: Response) => {
//     const product = await repositoryProducts.getProductById(req.params.id)
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({error: "Not found!!!"})
//     }
// });
// app.use('/adresses', adressesRouter)

const startApp = async () => {
    try {
        await connectDB(); // Дожидаемся подключения к MongoDB
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        process.exit(1); // Завершаем процесс при ошибке
    }
};

// Запускаем сервер
void startApp();







// debugger
// https://www.youtube.com/watch?v=vWMjPRiEhbA    7:54
///example GPT
// import express from "express";✅
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
//
// dotenv.config();
//
// const app = express();✅
// const PORT = process.env.PORT || 5000;✅
// const MONGO_URI = process.env.MONGO_URI as string;
//
// // Middlewares
// app.use(cors());
// app.use(express.json()); // Позволяет парсить JSON
//
// // Тестовый роут
// app.get("/", (req, res) => {
//     res.send("Hello, backend is working!");
// });
//
// // Подключение к MongoDB и запуск сервера
// const startServer = async () => {
//     try {
//         await mongoose.connect(MONGO_URI);
//         console.log("Connected to MongoDB");
//
//        ✅ app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     } catch (error) {
//         console.error("Error starting server:", error);
//     }
// };
//
// startServer();
