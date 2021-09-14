import jwt from "jsonwebtoken"

async function tokenGenerator(client, role) {
	return jwt.sign({
		id: client.id,
		name: client.name,
		permissionOf: role
	}, process.env.JWT_SECRET_KEY, {
		expiresIn: '3d'
	})
}


export default tokenGenerator