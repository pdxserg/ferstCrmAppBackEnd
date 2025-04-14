"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./routes/products-router");
const db_1 = require("./db");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const jobs_router_1 = require("./routes/jobs-router");
const customers_router_1 = require("./routes/customers-router");
const port = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
//MiddleWare
// const authGuardMidlWare=(req:Request, res:Response,next:NextFunction)=>{
//     if(req.query.token ==="123") next()
//     else   res.sent(404)
// }
// app.use(authGuardMidlWare)
app.use((0, cors_1.default)({
    origin: [
        'https://first-crm-app-front-end.vercel.app', // Указываем URL фронтенда на Vercel
        'http://localhost:5173', // для локальной разработки (Vite)
    ],
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
    apis: [path_1.default.join(__dirname, "../src/routes/*.ts")]
};
// Initialize Swagger Docs
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use('/api/products', products_router_1.productsRouter);
app.use('/api/jobs', jobs_router_1.jobsRouter);
app.use('/api/customers', customers_router_1.customersRouter);
// app.use('/adresses', adressesRouter)
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)(); // Дожидаемся подключения к MongoDB
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        process.exit(1); // Завершаем процесс при ошибке
    }
});
// Запускаем сервер
void startApp();
// debugger
//todo https://www.youtube.com/watch?v=vWMjPRiEhbA    7:54
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
