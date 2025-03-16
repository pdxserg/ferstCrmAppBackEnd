import express from "express";
import {productsRouter} from "./routes/products-router";
import {connectDB} from "./db";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import path from "path";
import cors from "cors";
import {jobsRouter} from "./routes/jobs-router";

const port = 5000
const app = express()
app.use(express.json());

//MiddleWare
// const authGuardMidlWare=(req:Request, res:Response,next:NextFunction)=>{
//     if(req.query.token ==="123") next()
//     else   res.sent(404)
// }
// app.use(authGuardMidlWare)
app.use(cors({
    origin: 'https://first-crm-app-front-end.vercel.app/',  // Указываем URL фронтенда на Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));




// Swagger Options
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product API",
            version: "1.0.0",
            description: "API for managing products, ferstcrmapp",
        },
    },
    apis: [path.join(__dirname, "../src/routes/*.ts")]

};

// Initialize Swagger Docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/products',  productsRouter)
app.use('/api/jobs',  jobsRouter)
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
