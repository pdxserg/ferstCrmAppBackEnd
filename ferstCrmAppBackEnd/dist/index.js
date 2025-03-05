"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./Routes/products-router");
const adresses_router_1 = require("./Routes/adresses-router");
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDB)(); // Подключаемся к MongoDB
//MiddleWare
// const authGuardMidlWare=(req:Request, res:Response,next:NextFunction)=>{
//     if(req.query.token ==="123") next()
//     else   res.sent(404)
// }
// app.use(authGuardMidlWare)
const port = 5000;
app.use('/products', products_router_1.productsRouter),
    app.use('/adresses', adresses_router_1.adressesRouter);
app.use('/ad', (req, res) => {
    res.send({ "AA": "hey" });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
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
