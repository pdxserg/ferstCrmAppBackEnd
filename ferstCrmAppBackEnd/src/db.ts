import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Загружаем перемен ные окружения из .env

 const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI,
		// 	{
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
		// } as mongoose.ConnectOptions
		);
		console.log("✅ Connected to MongoDB Atlas");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1); // Остановит сервер, если не удалось подключиться
	}
};
