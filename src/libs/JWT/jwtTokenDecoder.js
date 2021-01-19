import jwt from "jsonwebtoken"


async function tokenDecoder(token) {
     try {
          const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
          return decodedToken
     } catch (error) {
          throw "Token inválido ou expirado"
     }
}

export default tokenDecoder