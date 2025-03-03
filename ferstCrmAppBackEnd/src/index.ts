import express,{Request, Response} from "express";



const app = express()
const port = 5000

const products = [{id:"1",title: "tomato"}, {id:"2",title: "orange"},]
const adresses = [{id:"1",street: "Utkin"}, {id:"2",street: "Baranov"}]

app.get('/products', (req:Request, res:Response) => {
    if(req.query.title){
        const searchString = req.query.title.toString()
        res.send(products.filter(el => el.title.toLowerCase().includes(searchString.toLowerCase())))

    }else {
        res.send(products);
    }

});
app.get('/products/:productTitle', (req:Request, res:Response) => {
    const params = req.params.productTitle
    let product = products.find(el => el.id === params)
    if (product){
        res.send(product);
    } else {
         res.status(404).send({error: "Not found!!!"})
    }

});
app.delete('/products/:id', (req:Request, res:Response) => {
    const params = req.params.id
    let product = products.filter(el => el.title !== params)
    if (product){
        res.send(product);
    } else {
         res.status(404).send({error: "Not found!!!"})
    }

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


app.get('/adresses', (req:Request, res:Response) => {
    res.send(adresses);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
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
