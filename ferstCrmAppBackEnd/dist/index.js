"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
const products = [{ title: "tomato" }, { title: "orange" },];
const adresses = [{ street: "Utkin" }, { street: "Baranov" }];
app.get('/products', (req, res) => {
    res.send(products);
});
app.get('/products/:productTitle', (req, res) => {
    const params = req.params.productTitle;
    let product = products.find(el => el.title === params);
    res.send(product);
});
// app.post('/products', (req:Request, res:Response) => {
// const {title} = req.body
//     if(!title){
//         return res.status(400).send({error: "Title is requered"})
//     } else {
//        products.push({title})
//         res.send(products)
//     }
//     res.send(products);
// });
app.get('/adresses', (req, res) => {
    res.send(adresses);
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
