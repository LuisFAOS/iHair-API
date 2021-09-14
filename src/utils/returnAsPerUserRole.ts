import Salon from "../models/salon.models"

async function returnAsPerUserRole(permissionOf: string, client: {id: string, name: string}){
    
    if (permissionOf === "normalUser") {
        return {
            _normal_user_id: client.id
        }
    } else {
        const {id: _salon_id} = await Salon.getFromDB({
            _salon_owner_id: client.id
        })

        return {
            _salon_id
        }
    }
}

export default returnAsPerUserRole