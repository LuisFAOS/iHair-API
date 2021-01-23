import {deleteNormalUserFromDB} from "../../models/normalUser.models.js"

async function deleteNormalUser(req, res) {
     const authToken = req.headers['authorization'] ||
          req.headers['x-access-token'] || req.headers['token']

     const {
          client
     } = await tokenDecoder(authToken)

     await deleteNormalUserFromDB(client.id)
}

export default deleteNormalUser