import express, { Request, Response, NextFunction } from "express";


// "База данных" пользователей (в реальном проекте хранятся в БД)
const USERS: Record<string, string> = {
	admin: "1234",
	user: "password",
};

// Функция для проверки Basic Auth
export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Basic ")) {
		  res.status(401).json({ error: "Unauthorized: No credentials provided" });
		  return
	}

	// Декодируем Base64 (Basic <base64-encoded "username:password">)
	const base64Credentials = authHeader.split(" ")[1];
	const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
	const [username, password] = credentials.split(":");

	if (!username || !password || USERS[username] !== password) {
		res.status(403).json({ error: "Forbidden" });
		return; // Добавил return, чтобы не выполнялся next()
	}

	// (req as any).user = { username }; // Сохраняем пользователя в запросе
	next(); // Только если всё ок, идём дальше
};

 // i9q4o1JriJvAgnNM pdxserg