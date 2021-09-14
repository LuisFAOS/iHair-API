import jwt from "jsonwebtoken"

type Token = {
     id: string,
     name: string,
     permissionOf: string
}

async function tokenDecoder(token) {
     try {
          const decodedToken:Token = await jwt.verify(token, process.env.JWT_SECRET_KEY)
          return decodedToken
     } catch (error) {
          throw "Token inválido ou expirado!"
     }
}

export default tokenDecoder