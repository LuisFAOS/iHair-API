import tokenDecoder from "../libs/JWT/jwtTokenDecoder.js"


async function authenticator(req, res, next, necessaryRole) {
	try {
		const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']

		if (authToken) {
			const decodedToken = await tokenDecoder(authToken)
			if (necessaryRole === "dont need permission") {
				next()
			} else if (decodedToken.permissionOf === necessaryRole) {
				next()
			} else {
				res.status(403).send("Você não tem permissão para acessar essa rota!")
			}
		} else {
			res.status(401).send("Acesso somente para usuário logados!")
		}
	} catch (error) {
		res.status(400).send("token inválido ou expirado!")
	}
}

export default authenticator