import { Request, Response } from "express";
import jwtDecoder from "../libs/JWT/jwtDecoder"


async function authenticator(req: Request, res: Response, next, necessaryRole: String) {
	try {
		const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']

		if (authToken) {
			const {permissionOf} = await jwtDecoder(authToken)

			switch (necessaryRole) {
				case "dont need permission":
					next()
					break;
				case permissionOf:
					next()
					break;
			
				default:
					res.status(403).send("Erro: Rota não permitida")
					break;
			}
		} else {
			res.status(401).send("Acesso somente para usuário logados!")
		}
	} catch (error) {
		res.status(400).send("Token inválido ou expirado!")
	}
}

export default authenticator