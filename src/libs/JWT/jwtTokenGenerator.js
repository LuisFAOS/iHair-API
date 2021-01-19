import jwt from "jsonwebtoken"


async function tokenGenerator(userDatas, role) {
	return jwt.sign({
		client: {
			id: userDatas.id,
			name: userDatas.name
		},
		permissionOf: role
	}, process.env.JWT_SECRET_KEY, {
		expiresIn: '3d'
	})
}


export default tokenGenerator