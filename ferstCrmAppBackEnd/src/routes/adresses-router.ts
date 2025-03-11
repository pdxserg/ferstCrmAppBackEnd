import {Request, Response, Router} from "express";

const adresses = [{id:"1",street: "Utkin"}, {id:"2",street: "Baranov"}]

export const adressesRouter = Router()


adressesRouter.get('/', (req:Request, res:Response) => {
	if(req.query.street){
		const searchString = req.query.street.toString()
		res.send(adresses.filter(el => el.street.toLowerCase().includes(searchString.toLowerCase())))

	}else {
		res.send(adresses);
	}

});
adressesRouter.get('/', (req:Request, res:Response) => {
	res.send(adresses);
});
