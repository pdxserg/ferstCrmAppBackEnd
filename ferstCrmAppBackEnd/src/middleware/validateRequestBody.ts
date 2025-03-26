import { Request, Response, NextFunction } from 'express';

export const validateRequestBody= (allowedKeys: string[])=> {
	return (req: Request, res: Response, next: NextFunction) => {
		const requestKeys = Object.keys(req.body);

		for (const key of requestKeys) {
			if (!allowedKeys.includes(key)) {
				res.status(400).send({ error: `Argument "${key}" not permitted.` });
				return
			}
		}

		next(); // Proceed to the next middleware or route handler
	};
}